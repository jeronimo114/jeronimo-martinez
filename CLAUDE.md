# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Redesign of ESIC Business & Marketing School Medellín website. Static HTML pages with inline CSS/JS, built for copy-pasting into WordPress Elementor HTML widgets. **ESIC is a Business School, NOT a university** — only mention "Universidad" when referring to CEIPA as "Universidad aliada."

## Key Workflow

1. **One file per page**: For every new page create exactly ONE HTML file — the elementor file (e.g. `alianzas/alianzas-elementor.html`). No separate `index.html` for preview, no duplicates. All work — design, preview, production — happens in the single `*-elementor.html` file.
2. **Elementor output**: After editing any HTML file destined for Elementor, run `cat <file> | pbcopy` so it's ready to paste into WordPress.
3. **No external CSS/JS**: Elementor widgets cannot load external stylesheets or scripts. Everything must be inlined (`<style>`, `<script>`) within the same file. No `<nav>` or `<footer>` — those are global Elementor theme elements.
4. **Frequent commits**: Commit after every change, no matter how small.

## Repository Structure

- `index.html` — Homepage (main reference for design patterns)
- `pregrado-definitiva/index.html` — **Official** pregrado general page (NOT `pregrado/index.html`)
- `master-definitiva/index.html` — Official master general page
- `*-elementor.html` files — Production versions for pasting into WordPress Elementor
- `formularios/` — Contact and Zoho form templates
- `recovered/` — Backups, do not modify
- `references/`, `tools/` — Brochures, SEO tools, sitemap

### Elementor-active files (production)

`level-up/level-up-elementor.html`, `pregrado/becas-elementor.html`, `pregrado/digital-business-elementor.html`, `pregrado/marketing-global-elementor.html`, `institucional/quienes-somos-elementor.html`, `master/digital-business-elementor.html`, `master/customer-experience-elementor.html`

## Design System

### Typography
- Display: `Sofia Sans Extra Condensed` (weight 800)
- Body: `DM Sans`

### Colors
```css
--brand-blue: #0047E9;
--brand-blue-dark: #00133F;
--brand-teal: #0AE4C3;      /* Also #09CF90 for Master */
--brand-orange: #FF9600;     /* Pregrado highlight: #FF8701 */
--bg: #F8F6F2;               /* Cream/beige background */
```

Program-specific: Pregrado = orange, Master = teal/green, Executive = blue.

### Visual Rules (non-negotiable)
- **Section overlap**: Every section uses `margin-top: -50px; border-radius: 50px 50px 0 0` with incrementing `z-index`
- **Image overlays**: All images (hero, cards, banners, video posters) must have a black overlay for contrast
- **No emojis anywhere**: Use only inline SVGs (stroke-based, linear style) or formal illustrations
- **One highlight section per page**: Solid background using area's highlight color, max 2 CTAs
- **Max 2 CTAs per block**
- **Hover on `<a>` buttons (anti-shrink + color override)**: Elementor injects styles on `:hover` that shrink the button (reduced `padding`, `font-size`, `line-height`, or a transform `scale`) and override hover colors. Para evitarlo:
  - Declarar `padding`, `font-size`, `line-height`, `border-width`, `border-style`, `box-sizing`, `display: inline-flex` y el `transform` con `!important` en **todos** los estados (`:link, :visited, :hover, :focus, :active`) — agrupados en un mismo bloque para que el tamaño sea idéntico siempre.
  - Hover effect permitido y recomendado: `transform: translateY(-2px) !important` con `transform-origin: center center`. **Nunca** usar `scale()` en hover (Elementor lo combina con el suyo y produce shrink visual).
  - Ejemplo de referencia: ver el bloque `.esud-btn` en `start-up-day/start-up-day-elementor.html`.

### Cards
- Use photographic style from `index.html` (`.eh-programa-card`) with WordPress background images
- 2 columns: `aspect-ratio: 16/9` | 3 columns: `aspect-ratio: 4/3`
- SVG flags must be wrapped in a `<span>` with `border-radius` + `overflow: hidden`

## Forms & Zoho Integration

- Privacy/terms URL: **always** `https://esic.co/politicas-de-privacidad/` with `target="_blank"` — never `href="#"` or the old `/politica-privacidad/` URL
- Do NOT use `onsubmit="zf_ValidateAndSubmit()"` — use HTML5 `required` attributes instead

### Formulario general del footer (`footer-global.html`)

El popup del footer usa `SolicitarInformacinFormulariogeneral110226`. Campos y opciones vigentes (automatización actualizada 14/07/2026 por Alejandra Quintero):

- `Dropdown` (Tipo de programa): `Pregrado`, `Máster`, `Programa Ejecutivo`, `Formaciones empresariales`, `Level Up`, `Open Day`
- `Dropdown2` (Programa de interés — **campo único** para todos los tipos; ya NO existe `Dropdown4`). El formulario muestra sub-selects condicionales según Tipo de programa, todos con `name="Dropdown2"` (los inactivos se `disabled` para que no se envíen):
  - Pregrado: `Dirección de Marketing Global`, `Digital Business`
  - Máster: `Máster Digital Marketing`, `Máster Digital Business`, `Máster Customer Experience Management`
  - Programa Ejecutivo: `Programa ejecutivo en Digital Transformation`
  - Formaciones empresariales: `Formaciones empresariales`, `IA Creatividad`, `IA Marketing Digital`, `IA Inteligencia Artificial Nivel 1/2/3`
- `Dropdown3` (Medio de contacto): `WhatsApp`, `Correo`, `Llamada`
- UTM ocultos autollenados desde la URL: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_adset_name`, `utm_ad_name`

> Nota: Este formulario usa `Máster` como valor en Dropdown (no `Corporate`). El mapeo `Corporate` aplica solo a formularios específicos de páginas de master donde se indicó explícitamente.

## Deployment

Preview via Vercel: sync to `/tmp/jeronimo-martinez/ESIC/` with rsync, then push the personal repo. Production pages are pasted into WordPress Elementor.
