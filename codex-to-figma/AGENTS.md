# AGENTS.md

## Learnings
- Use `PyPDF2` to extract text from single-page PDFs when poppler tools are unavailable; clean spaced-out lettering manually.
- Elementor clipboard JSON should be a single `section` object with a 100% `column` and widgets in reading order.
- Use `text-editor` widgets with HTML (`<p>`, `<ul><li>`) for paragraphs and lists; use `image` widgets with placeholder URLs.
- Reference global typography via `__globals__` (for example, `globals/typography?id=primary` for headings and `globals/typography?id=text` for body copy).
