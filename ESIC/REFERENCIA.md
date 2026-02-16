# ESIC Redesign - Documentación de Referencia

## Descripción del Proyecto

Rediseño completo del sitio web de ESIC Business & Marketing School Medellín. El proyecto incluye páginas para programas de pregrado, máster, executive programs e información institucional.

**IMPORTANTE:** ESIC es una Business School, NO una universidad. Solo se menciona "Universidad" cuando se refiere a CEIPA como "Universidad aliada".

---

## Estructura del Repositorio

```
esic-redesign/
├── index.html                    # Homepage principal
├── mapa.html                     # Mapa del sitio / SEO
├── esic-theme.css                # CSS global compartido
├── REFERENCIA.md                 # Este archivo
│
├── assets/
│   └── images/                   # Imágenes del sitio
│
├── pregrado/
│   ├── index.html                # Landing pregrado
│   ├── marketing-global.html     # Programa Marketing Global
│   └── digital-business.html     # Programa Digital Business
│
├── master/
│   ├── index.html                # Landing máster
│   ├── v2.html                   # Versión 2 del landing
│   ├── digital-business.html     # Máster Digital Business
│   ├── digital-marketing.html    # Máster Digital Marketing
│   ├── customer-experience.html  # Máster CX
│   └── becas.html                # Información de becas
│
├── executive-programs/
│   └── index.html                # Executive Programs (6 meses)
│
├── institucional/
│   └── quienes-somos.html        # Sobre ESIC (+60 años)
│
├── level-up/
│   ├── index.html                # Programas Level Up
│   └── ia.html                   # Programa IA
│
├── seo/
│   └── keywords.html             # Keywords SEO objetivo
│
├── docs/
│   └── design-requirements.html  # Requerimientos de diseño
│
└── referencias/
    └── brochures/                # PDFs de brochures
```

---

## Sistema de Diseño

### Colores Principales

```css
/* Brand Colors */
--brand-blue: #0047E9;        /* Azul principal */
--brand-blue-dark: #00133F;   /* Azul oscuro (textos) */
--brand-teal: #09CF90;        /* Verde/Teal (Master) */

/* Colores por Programa */
--pregrado-orange: #FE5000;   /* Naranja Pregrado */
--master-teal: #09CF90;       /* Verde Master */
--executive-blue: #0047E9;    /* Azul Executive */

/* Venn Diagram */
#5EEDC3                       /* Teal claro (círculo izquierdo) */
#2D5BFF                       /* Azul brillante (círculo derecho) */

/* Backgrounds */
--bg: #F8F6F2;                /* Crema/Beige */
--surface: #FFFFFF;           /* Blanco */
```

### Tipografías

```css
--display-font: 'Sofia Sans Extra Condensed', sans-serif;
--body-font: 'DM Sans', sans-serif;
--display-weight: 800;
```

### Border Radius y Overlap

Todas las secciones usan un patrón de overlap con esquinas redondeadas:

```css
.section-rounded {
  border-radius: 50px 50px 0 0;
  margin-top: -50px;
  position: relative;
}
```

---

## Patrones CSS Clave

### 1. Secciones con Overlap

```html
<section class="section section-rounded section-white">
  <div class="container">
    <!-- contenido -->
  </div>
</section>
```

Clases de fondo:
- `section-white` - Fondo blanco
- `section-cream` - Fondo crema (#F8F6F2)
- `section-blue` - Fondo azul

### 2. Venn Diagram (Cifras y Reconocimiento)

```html
<div class="venn-container">
  <div class="venn-circle teal">
    <div class="venn-content">
      <div class="venn-stat">
        <div class="number">+3000</div>
        <div class="label">ofertas de prácticas</div>
      </div>
    </div>
  </div>
  <div class="venn-circle blue">
    <!-- estadísticas de empleo -->
  </div>
</div>
```

### 3. Plan de Estudios (Pregrado)

Grid de 3 columnas con bullets color naranja:

```html
<div class="plan-item">
  <span class="bullet"></span>
  <strong>Título del Núcleo</strong>
  <span>Descripción del contenido</span>
</div>
```

```css
.plan-item .bullet {
  background: var(--pregrado-orange); /* o --master-teal para máster */
}
```

### 4. Botones con Flecha

```html
<a class="btn btn-primary btn-arrow" href="#formulario">
  SOLICITAR INFORMACIÓN
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 19V5M5 12l7-7 7 7"/>  <!-- Flecha hacia arriba -->
  </svg>
</a>
```

---

## Núcleos de Pregrado (Plan de Estudios)

Estructura oficial de los 6 núcleos por año:

1. **Aldea Global** - Pensamiento Empresarial
2. **Business Intelligence** - Análisis de datos
3. **Conciencia Organizacional y Liderazgo** - Soft skills
4. **Prospectiva** - Visión de futuro
5. **Laboratorio de Ideas de Negocios** - Emprendimiento
6. **Currículos de Profundización en Tecnología** - Tech skills

---

## Páginas y sus Características

### Homepage (index.html)
- Hero con video/imagen
- Cards de programas (Pregrado, Master, Executive)
- Sección "La Vida en ESIC"
- Cifras y Reconocimiento (Venn diagram)
- Historias de Éxito
- Miembros Fundadores
- Footer con contacto

### Pregrado
- SNIES y Resolución del programa
- Plan de estudios por años (4 años)
- Doble titulación con universidades aliadas
- Opción de año en Madrid

### Master
- Duración: 11 meses
- Modalidad: Híbrido
- Inmersión internacional en Madrid
- Título español

### Executive Programs
- Duración: 6 meses
- Partners: Prestigio, Accenture
- Para CEOs y directivos

---

## Deployment

El proyecto se despliega en Vercel a través de GitHub:

- **Repositorio:** `jeronimo114/jeronimo-martinez`
- **Branch:** `main`
- **URL:** https://jeroooo.com/ESIC/

### Para hacer push:

```bash
# Desde esic-redesign
git add -A
git commit -m "Descripción del cambio"

# Sincronizar con el repo personal
rsync -av --exclude='.git' ./ /tmp/jeronimo-martinez/ESIC/
cd /tmp/jeronimo-martinez
git add ESIC/
git commit -m "Update ESIC"
git push origin main
```

---

## Convenciones

1. **No usar "Universidad"** para ESIC (es Business School)
2. **ESIC tiene +60 años** de historia (no 50)
3. **Colores consistentes** por tipo de programa
4. **Flechas apuntan hacia arriba** en botones de "Solicitar Información"
5. **Bullets de un solo color** por página (naranja pregrado, teal master)
6. **Border-radius 50px** en todas las secciones
7. **Overlap -50px** entre secciones

---

## Archivos de Referencia

- `esic-theme.css` - Variables CSS globales
- `referencias/` - Brochures y PDFs originales
- `docs/design-requirements.html` - Especificaciones de diseño

---

## Contacto ESIC

- **Campus:** Calle 17 Sur 44 - 80, Medellín
- **Teléfono:** +57 604 312 6037
- **Email:** esicmedellin@esic.edu

---

*Última actualización: Febrero 2026*
