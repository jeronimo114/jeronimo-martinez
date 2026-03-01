# ESIC Redesign - Agent Notes

## Workflow Rules / Reglas de Trabajo

### Elementor HTML Documents
> **IMPORTANTE**: Después de realizar **cualquier cambio** en un documento HTML destinado para Elementor, **SIEMPRE** ejecutar `pbcopy` automáticamente para copiar el archivo completo al portapapeles.

```bash
# Comando obligatorio post-ediciones
cat /ruta/al/archivo.html | pbcopy
```

**Esta regla aplica para:**
- Páginas de pregrados
- Landing pages
- Componentes HTML personalizados
- Cualquier archivo `.html` que se vaya a pegar en Elementor

---

### Commits Frecuentes
> **IMPORTANTE**: Después de realizar **cualquier cambio** en el proyecto, por mínimo que sea, **SIEMPRE** hacer `git commit` inmediatamente.

```bash
# Flujo obligatorio post-cambios
git add -A
git commit -m "descripción detallada del cambio"
```

**Esta regla aplica para:**
- Modificaciones de una línea
- Cambios de color, texto o imagen
- Correcciones de bugs
- Nuevas funcionalidades
- Cualquier edición, sin importar el tamaño

**Beneficios:**
- Historial completo y granular del proyecto
- Posibilidad de revertir cambios específicos
- Trabajo en equipo más seguro
- Backup constante del progreso

---

## Reglas Técnicas Elementor — Lecciones Aprendidas

### 1. Sin nav ni footer en widgets HTML
Los widgets HTML de Elementor **nunca** deben incluir `<nav>` ni `<footer>`. Esos elementos son globales y los maneja el tema de Elementor. Incluirlos genera duplicados y conflictos visuales.

### 2. Sin CSS ni JS externos
Nunca usar `<link rel="stylesheet" href="...">` ni `<script src="...">` en archivos destinados a Elementor. Todo debe estar **inlineado** en `<style>` y `<script>` dentro del mismo archivo. Referencia de patrón: `pregrado-definitiva/index.html`.

### 3. Hover de botones `<a>` — siempre usar `!important`
Elementor sobreescribe el color de hover de todos los `<a>` con el color de tema (naranja por defecto). En cualquier botón estilizado como `<a>`, agregar `!important` en los estados hover/focus/visited:

```css
.mi-boton:hover,
.mi-boton:focus,
.mi-boton:visited {
  background: #color !important;
  color: #FFFFFF !important;
  text-decoration: none !important;
}
```

### 4. Banderas SVG — siempre envolver en `<span>`
`border-radius` + `overflow: hidden` sobre un `<svg>` es inconsistente entre navegadores y falla en Elementor. **Siempre** envolver la bandera en un `<span>` HTML:

```html
<span style="display:inline-flex;width:22px;height:15px;border-radius:2px;overflow:hidden;flex-shrink:0;">
  <svg viewBox="0 0 30 20" style="width:100%;height:100%;display:block;">...</svg>
</span>
```

### 5. Patrón de secciones apiladas — z-index y border-radius
El patrón `margin-top: -50px; border-radius: 50px 50px 0 0` crea el efecto de secciones apiladas. Reglas:

- **Esquinas solo superiores** (por defecto): `border-radius: 50px 50px 0 0`
- **Todas las esquinas redondeadas** (una sección aislada visualmente): `border-radius: 50px` + `z-index: 2` en esa sección + `z-index: 0` en la sección siguiente
- La sección posterior siempre tiene z-index menor para que las esquinas inferiores de la anterior sean visibles

```html
<!-- Sección con todas las esquinas redondeadas -->
<section class="section section-overlap section-overlap-white" style="border-radius: 50px; z-index: 2;">

<!-- Sección siguiente — z-index menor -->
<section class="section section-overlap section-overlap-highlight" style="z-index: 0;">
```

### 6. Cards en grids — aspect-ratio según columnas
- **2 columnas**: `aspect-ratio: 16/9`
- **3 columnas**: `aspect-ratio: 4/3` (más altas, evitan el efecto "cropped")
- `background-position: center center` para retratos de personas

### 7. Cards de programas — usar siempre el estilo del home
Las cards de programas (pregrado y máster) deben usar el estilo fotográfico de `index.html` (`.eh-programa-card`) con imágenes de fondo de WordPress. **No** usar cards de color sólido. Imágenes disponibles:

```
master_dm.webp / mobile_master_dm.webp
master_db.webp / mobile_master_db.webp
master_cx.webp / mobile_master_cx.webp
pregrado_mkt_global_.webp / mobile_pregrado_mkt_global_.webp
pregrado_digital_business.webp / mobile_pregrado_digital_business.webp
```
Base URL: `https://esic.co/wp-content/uploads/2026/02/`

---

## ⭐ Página Oficial de Pregrado General

> **`pregrado-definitiva/index.html`** es la página oficial y definitiva de pregrados generales.
> Usar SIEMPRE esta versión. El archivo `pregrado/index.html` es una versión anterior — no actualizar.

---

## Pregrado Definitiva Page (`pregrado-definitiva/index.html`)

### Hero Section
- **Status**: Reemplazado con banner de pregrados general
- **Fecha**: 2026-03-01
- **Cambio**: El hero section anterior con fondo de imagen y texto fue reemplazado por un banner responsive con las imágenes optimizadas

#### URLs de Banners
- **Desktop WebP**: `https://esic.co/wp-content/uploads/2026/03/banner-general-pregrado-desktop.webp`
- **Desktop PNG**: `https://esic.co/wp-content/uploads/2026/03/banner-general-pregrado-desktop.png`
- **Mobile WebP**: `https://esic.co/wp-content/uploads/2026/03/banner-general-pregrado-mobile-2-scaled.webp`
- **Mobile PNG**: `https://esic.co/wp-content/uploads/2026/03/banner-general-pregrado-mobile-2.png`

#### Estructura del Banner
```html
<section class="hero-banner-pregrados">
  <a href="#programas" aria-label="Ver programas de pregrado">
    <picture>
      <!-- Mobile -->
      <source media="(max-width: 768px)" srcset="...webp" type="image/webp">
      <source media="(max-width: 768px)" srcset="...png" type="image/png">
      
      <!-- Desktop -->
      <source media="(min-width: 769px)" srcset="...webp" type="image/webp">
      <source media="(min-width: 769px)" srcset="...png" type="image/png">
      
      <!-- Fallback -->
      <img src="...png" alt="Programas de Pregrado ESIC" loading="eager">
    </picture>
  </a>
</section>
```

### Secciones de la Página
1. **Hero Banner** - Banner general pregrados (clickable, lleva a #programas)
2. **Selector de Pregrados** - Cards de Marketing Global y Digital Business
3. **Información Común** - Stats grid (4 años, Medellín, Doble título, Inmersión)
4. **Comparador Rápido** - Guía para elegir programa
5. **Highlight Section** - CTA "Tu carrera profesional comienza aquí"
6. **Cifras y Reconocimiento** - Variantes A/B/C test
7. **Formulario** - Contacto

### Tecnologías
- HTML5 semántico
- CSS Custom Properties (variables ESIC)
- Picture element para responsive images
- WebP con fallback PNG
- Sin dependencias de JavaScript (excepto toggle de variantes A/B/C)

### Estilos Destacados
```css
/* Breakpoint mobile */
@media (max-width: 768px) { ... }

/* Colores ESIC */
--brand-blue: #0047E9;
--brand-blue-dark: #00133F;
--brand-teal: #0AE4C3;
--brand-orange: #FF9600;
--pregrado-highlight: #FF9600;
```

---

## Home Page Banners - Desktop Carousel

**Ubicación**: `/Users/jero/Downloads/BANNER DESKTOP/optimized/`

### Banners Optimizados (6 slides)

| # | Nombre Archivo | Tamaño PNG | Tamaño WebP | Dimensión |
|---|----------------|------------|-------------|-----------|
| 1 | banner-home-desktop-01 | 890 KB | 195 KB | 2560×1168 |
| 2 | banner-home-desktop-02 | 992 KB | 284 KB | 2560×1168 |
| 3 | banner-home-desktop-03 | 1.1 MB | 276 KB | 2560×1168 |
| 4 | banner-home-desktop-04 | 932 KB | 144 KB | 2560×1168 |
| 5 | banner-home-desktop-05 | 1.0 MB | 248 KB | 2560×1168 |
| 6 | banner-home-desktop-06 | 970 KB | 211 KB | 2560×1168 |

### URLs WordPress (Estructura esperada)

```
https://esic.co/wp-content/uploads/2026/03/banner-home-desktop-01.webp
https://esic.co/wp-content/uploads/2026/03/banner-home-desktop-02.webp
https://esic.co/wp-content/uploads/2026/03/banner-home-desktop-03.webp
https://esic.co/wp-content/uploads/2026/03/banner-home-desktop-04.webp
https://esic.co/wp-content/uploads/2026/03/banner-home-desktop-05.webp
https://esic.co/wp-content/uploads/2026/03/banner-home-desktop-06.webp
```

**Nota**: Subir ambos formatos (PNG y WebP) a WordPress. Los archivos WebP son ~75% más pequeños.

---

## Home Page Banners - Mobile Carousel

**Ubicación**: `/Users/jero/Downloads/BANNER MOBILE/optimized/`

### Banners Optimizados (6 slides) - SOLO WebP

| # | Nombre Archivo | Tamaño Original | Tamaño WebP | Dimensión | Reducción |
|---|----------------|-----------------|-------------|-----------|-----------|
| 1 | banner-home-mobile-01 | 4.9 MB | **423 KB** | 2048×2900 | ~92% |
| 2 | banner-home-mobile-02 | 3.0 MB | **177 KB** | 2048×2900 | ~94% |
| 3 | banner-home-mobile-03 | 3.4 MB | **204 KB** | 2048×2900 | ~94% |
| 4 | banner-home-mobile-04 | 4.3 MB | **235 KB** | 2048×2900 | ~95% |
| 5 | banner-home-mobile-05 | 4.2 MB | **321 KB** | 2048×2900 | ~93% |
| 6 | banner-home-mobile-06 | 4.3 MB | **327 KB** | 2048×2900 | ~93% |

### URLs WordPress (Estructura esperada)

```
https://esic.co/wp-content/uploads/2026/03/banner-home-mobile-01.webp
https://esic.co/wp-content/uploads/2026/03/banner-home-mobile-02.webp
https://esic.co/wp-content/uploads/2026/03/banner-home-mobile-03.webp
https://esic.co/wp-content/uploads/2026/03/banner-home-mobile-04.webp
https://esic.co/wp-content/uploads/2026/03/banner-home-mobile-05.webp
https://esic.co/wp-content/uploads/2026/03/banner-home-mobile-06.webp
```

**Nota**: Solo se generaron archivos WebP para mobile (sin PNG). Subir directamente los .webp a WordPress.
