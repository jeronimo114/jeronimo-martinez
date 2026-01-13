#!/usr/bin/env python3
import argparse
import json
import re
from io import BytesIO
from pathlib import Path
from statistics import median

from PIL import Image
from PyPDF2 import PdfReader


def normalize_text(text: str) -> str:
    text = text.replace("\u2028", " ").replace("\u2029", " ")
    text = re.sub(r"\s+", " ", text).strip()
    text = re.sub(r"\s+([,.;:!?])", r"\1", text)
    return text


def clean_line(text: str) -> str:
    text = normalize_text(text)
    return text


def effective_font_size(font_size: float | None, tm: list[float] | None) -> float | None:
    if font_size is None:
        return None
    if tm and len(tm) >= 4 and tm[0]:
        return abs(font_size * tm[0])
    return abs(font_size)


def extract_page_lines(page) -> list[dict]:
    items = []
    size_map: dict[str, float] = {}

    def visitor_text(text, cm, tm, font_dict, font_size):
        if not text or not text.strip():
            return
        if tm[4] == 0 and tm[5] == 0 and len(text) > 200:
            return
        parts = re.split(r"[\r\n\u2028]+", text)
        for part in parts:
            part = part.strip()
            if not part:
                continue
            size = effective_font_size(font_size, tm)
            cleaned = clean_line(part)
            if not cleaned:
                continue
            if size:
                size_map[cleaned] = max(size_map.get(cleaned, 0), size)
            items.append(
                {
                    "text": cleaned,
                    "x": tm[4],
                    "y": tm[5],
                    "size": size,
                }
            )

    raw_text = page.extract_text(visitor_text=visitor_text) or ""
    lines = []
    for line in raw_text.splitlines():
        cleaned = clean_line(line)
        if not cleaned:
            continue
        size = size_map.get(cleaned)
        lines.append({"text": cleaned, "size": size})

    if lines:
        return lines

    if not items:
        return []

    items.sort(key=lambda item: (-item["y"], item["x"]))
    extracted_lines = []
    for item in items:
        if extracted_lines and extracted_lines[-1]["text"] == item["text"]:
            continue
        extracted_lines.append({"text": item["text"], "size": item["size"]})
    return extracted_lines


def classify_heading(text: str, size: float | None, base_size: float | None) -> str:
    if base_size and size:
        if size >= base_size * 1.8:
            return "h1"
        if size >= base_size * 1.4:
            return "h2"
        if size >= base_size * 1.2:
            return "h3"
        return "p"

    letters = [ch for ch in text if ch.isalpha()]
    if not letters:
        return "p"
    upper_ratio = sum(1 for ch in letters if ch.isupper()) / len(letters)
    if upper_ratio >= 0.6 and len(text) <= 40:
        return "h2"
    if upper_ratio >= 0.4 and len(text) <= 60:
        return "h3"
    return "p"


def detect_list_item(text: str) -> tuple[str | None, str]:
    bullet_match = re.match(r"^([*-])\\s+(.*)$", text)
    if bullet_match:
        return "ul", bullet_match.group(2).strip()
    ordered_match = re.match(r"^(\\d+)[.)]\\s+(.*)$", text)
    if ordered_match:
        return "ol", ordered_match.group(2).strip()
    return None, text


def build_html(pages: list[dict]) -> str:
    blocks = ['<div class="pdf-content">']
    for page_index, page in enumerate(pages):
        current_list_type = None
        for line in page["lines"]:
            if not line["text"]:
                continue
            list_type, list_text = detect_list_item(line["text"])
            if list_type:
                if current_list_type and current_list_type != list_type:
                    blocks.append(f"</{current_list_type}>")
                    current_list_type = None
                if not current_list_type:
                    blocks.append(f"<{list_type}>")
                    current_list_type = list_type
                blocks.append(f"<li>{list_text}</li>")
                continue
            if current_list_type:
                blocks.append(f"</{current_list_type}>")
                current_list_type = None

            tag = classify_heading(line["text"], line["size"], page["base_size"])
            blocks.append(f"<{tag}>{line['text']}</{tag}>")

        if current_list_type:
            blocks.append(f"</{current_list_type}>")

        for image_path in page["images"]:
            blocks.append(f'<img src="{image_path}" alt="" style="max-width: 100%;" />')

        if page_index < len(pages) - 1:
            blocks.append("<hr />")
    blocks.append("</div>")
    return "\n".join(blocks)


def save_image_from_xobject(xobj, output_path: Path) -> bool:
    data = xobj.get_data()
    try:
        with Image.open(BytesIO(data)) as img:
            img.save(output_path, format="PNG")
            return True
    except Exception:
        pass

    width = xobj.get("/Width")
    height = xobj.get("/Height")
    if not width or not height:
        return False

    color_space = xobj.get("/ColorSpace", "/DeviceRGB")
    if isinstance(color_space, list):
        color_space = color_space[0]

    if color_space == "/DeviceRGB":
        mode = "RGB"
    elif color_space == "/DeviceGray":
        mode = "L"
    elif color_space == "/DeviceCMYK":
        mode = "CMYK"
    else:
        return False

    try:
        img = Image.frombytes(mode, (width, height), data)
        if mode == "CMYK":
            img = img.convert("RGB")
        img.save(output_path, format="PNG")
        return True
    except Exception:
        return False


def extract_images(reader: PdfReader, output_dir: Path, warnings: list[str]) -> list[list[str]]:
    output_dir.mkdir(parents=True, exist_ok=True)
    pages_images = []
    image_count = 0

    for page_index, page in enumerate(reader.pages, start=1):
        page_images = []
        resources = page.get("/Resources")
        if resources:
            resources = resources.get_object() if hasattr(resources, "get_object") else resources
        if resources and "/XObject" in resources:
            xobjects = resources["/XObject"].get_object()
            for _, xobj in xobjects.items():
                obj = xobj.get_object()
                if obj.get("/Subtype") != "/Image":
                    continue
                image_count += 1
                file_name = f"page-{page_index}-img-{len(page_images) + 1}.png"
                output_path = output_dir / file_name
                if save_image_from_xobject(obj, output_path):
                    page_images.append(f"assets/{file_name}")
                else:
                    warnings.append(f"Failed to extract image on page {page_index}.")
        pages_images.append(page_images)

    if image_count == 0:
        warnings.append("No images found in PDF.")
    return pages_images


def compute_base_size(lines: list[dict]) -> float | None:
    sizes = [line["size"] for line in lines if line.get("size")]
    if not sizes:
        return None
    filtered = [size for size in sizes if size <= 200]
    if not filtered:
        filtered = sizes
    return median(filtered)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Convert PDF to Elementor-friendly HTML.")
    parser.add_argument("--in", dest="input_file", required=True, help="Path to input PDF.")
    parser.add_argument("--out", dest="output_dir", required=True, help="Output directory.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    input_path = Path(args.input_file)
    output_dir = Path(args.output_dir)

    if not input_path.exists():
        raise SystemExit(f"Input file not found: {input_path}")

    output_dir.mkdir(parents=True, exist_ok=True)
    assets_dir = output_dir / "assets"

    reader = PdfReader(str(input_path))
    warnings: list[str] = []

    pages_images = extract_images(reader, assets_dir, warnings)
    pages = []
    for page_index, page in enumerate(reader.pages, start=1):
        lines = extract_page_lines(page)
        if not lines:
            warnings.append(f"No text extracted from page {page_index}.")
        base_size = compute_base_size(lines)
        pages.append({"lines": lines, "images": pages_images[page_index - 1], "base_size": base_size})

    html_output = build_html(pages)

    html_path = output_dir / "elementor.html"
    html_path.write_text(html_output, encoding="utf-8")

    paste_path = output_dir / "elementor-paste.md"
    paste_path.write_text(
        'Paste into Elementor Text Editor (Text tab).\n\n```html\n'
        + html_output
        + "\n```\n",
        encoding="utf-8",
    )

    report = {
        "page_count": len(reader.pages),
        "extracted_image_count": sum(len(images) for images in pages_images),
        "warnings": warnings,
        "source_file": str(input_path),
    }
    report_path = output_dir / "report.json"
    report_path.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
