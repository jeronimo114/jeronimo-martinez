# ESIC - Guía de Navegación y Estructura

> **Archivo de referencia obligatorio** - Revisar antes de cualquier modificación al sitio

---

## ⚠️ NOTA CRÍTICA: NAV Y FOOTER SON GLOBALES

**NO** incluir nav ni footer en el código de las páginas individuales. Estos elementos se gestionan como **Templates Globales** en Elementor Theme Builder.

### Estructura en Elementor:
```
[Header Global - Nav]      ← Template único en Theme Builder
  ↓
[Contenido de la página]   ← Lo que se pega de los archivos HTML
  ↓
[Footer Global]            ← Template único en Theme Builder
```

### Archivos globales (no tocar para páginas individuales):
- `nav-global.html` - Header completo con menú
- `footer-global.html` - Footer completo con CTAs

---

## 🧭 ESTRUCTURA DEL MENÚ (Referencia)

El menú está definido en el **Header Global** de Elementor. No modificar en páginas individuales.

### Items del Menú:
| # | Item | URL | Notas |
|---|------|-----|-------|
| 1 | **INICIO** | `/` | — |
| 2 | **PROGRAMAS** | `/programas/` | CTA Principal (azul) |
| 3 | **NOSOTROS** | — | Dropdown: Quiénes Somos, Equipo |
| 4 | **LEVEL UP** | `/level-up/` | — |
| 5 | **ESTUDIANTES** | — | Dropdown: Zona de Pagos, Ubflex |

---

## 🗂️ MAPA COMPLETO DE URLs

### 📄 Páginas Principales

| URL | Nombre | Tipo |
|-----|--------|------|
| `/` | Home | Landing |
| `/programas/` | Programas General | Archivo |
| `/contacto/` | Contacto | Página |

### 🎓 Pregrado (`/pregrado/`)

| URL | Programa |
|-----|----------|
| `/pregrado/` | Archivo Pregrado |
| `/pregrado/marketing-global/` | Dirección de Marketing Global |
| `/pregrado/digital-business/` | Digital Business |
| `/pregrado/becas/` | Becas Pregrado (NO hay becas máster) |

### 🎓 Máster (`/master/`)

| URL | Programa |
|-----|----------|
| `/master/` | Archivo Máster |
| `/master/digital-marketing/` | Máster en Digital Marketing |
| `/master/digital-business/` | Máster en Digital Business |
| `/master/customer-experience/` | Máster en Customer Experience |

### 🏢 Executive Programs

| URL | Programa | Nota |
|-----|----------|------|
| `/programas/digital-business-transformation/` | Digital Business Transformation | **Acceso directo**, sin página intermedia |

### 🚀 Level Up (`/level-up/`)

| URL | Curso |
|-----|-------|
| `/level-up/` | Landing Level Up |
| `/level-up/ia/` | IA Aplicada |
| `/level-up/marketing-digital/` | Marketing Digital |
| `/level-up/automatizaciones/` | Automatizaciones AI |
| `/level-up/mente-2-0/` | Mente 2.0 |
| `/level-up/creatividad-ia/` | Creatividad con IA |

### 🏛️ Institucional (`/institucional/`)

| URL | Página | En Menú |
|-----|--------|---------|
| `/institucional/quienes-somos/` | Quiénes Somos | ✅ |
| `/institucional/equipo/` | Equipo | ✅ |
| `/institucional/cifras/` | Cifras ESIC | Futuro |
| `/institucional/metodologia/` | Metodología | Futuro |
| `/institucional/campus-medellin/` | Campus | Futuro |
| `/institucional/prensa/` | Prensa | Footer |
| `/institucional/aliados/` | Aliados | Footer |
| `/institucional/experiencia/` | Experiencia ESIC | Footer |

### 👥 Estudiantes (Enlaces Externos)

| URL | Nombre | Target |
|-----|--------|--------|
| `https://esic.moonflow.ai/` | Zona de Pagos | `_blank` |
| `https://ceipaeduco.sharepoint.com/sites/ubflex-esic` | Ubflex | `_blank` |

### 📚 Contenido

| URL | Nombre | Ubicación |
|-----|--------|-----------|
| `/rethink/` | Blog Rethink | Footer |
| `/podcast/` | Podcast | Footer |

### 🔒 Interno (No público)

| URL | Nombre |
|-----|--------|
| `/interno/induccion/` | Inducción |
| `/interno/periodos/` | Periodos Académicos |
| `/interno/herramientas/` | Herramientas |
| `/interno/wifi/` | WiFi |

### ⚖️ Legal

| URL | Nombre |
|-----|--------|
| `https://esic.co/politicas-de-privacidad/` | Políticas de Privacidad |
| `https://esic.co/tratamiento-de-datos-personales/` | Tratamiento de Datos |

---

## 📋 LISTADO ALFABÉTICO URLs INTERNAS

```
/
/contacto/
/executive-programs/ → (redirecciona a /programas/digital-business-transformation/)
/institucional/aliados/
/institucional/campus-medellin/
/institucional/cifras/
/institucional/equipo/
/institucional/experiencia/
/institucional/metodologia/
/institucional/prensa/
/institucional/quienes-somos/
/interno/herramientas/
/interno/induccion/
/interno/periodos/
/interno/wifi/
/level-up/
/level-up/automatizaciones/
/level-up/creatividad-ia/
/level-up/ia/
/level-up/marketing-digital/
/level-up/mente-2-0/
/master/
/master/customer-experience/
/master/digital-business/
/master/digital-marketing/
/podcast/
/pregrado/
/pregrado/becas/
/pregrado/digital-business/
/pregrado/marketing-global/
/programas/
/programas/digital-business-transformation/
/rethink/
```

---

## ⚠️ REGLAS CRÍTICAS

### Al crear/editar páginas:
1. **NO incluir `<nav>`** - Viene del Header Global
2. **NO incluir `<footer>`** - Viene del Footer Global
3. **Empezar con `<style>` o directamente con el contenido**

### Links externos:
- Siempre usar `target="_blank" rel="noopener"`
- Zona de Pagos: `https://esic.moonflow.ai/`
- Ubflex: `https://ceipaeduco.sharepoint.com/sites/ubflex-esic`

---

## ✅ CHECKLIST PRE-ELEMENTOR

Antes de pegar cualquier código en Elementor:

- [ ] **NO hay etiquetas `<nav>`** en el código
- [ ] **NO hay etiquetas `<footer>`** en el código
- [ ] El código **empieza con `<style>`** o el contenido principal
- [ ] Todos los links internos usan el formato `/ruta/` (sin `.html`)
- [ ] Links externos tienen `target="_blank" rel="noopener"`
- [ ] No hay becas de máster en ningún lado
- [ ] Executive Programs apunta a `/programas/digital-business-transformation/`
- [ ] Las imágenes usan URLs de `https://esic.co/wp-content/uploads/`

---

## 🚀 FLUJO DE TRABAJO CON ELEMENTOR

### Para actualizar una página existente:
1. Editar el archivo HTML local (ej: `index.html`, `programas.html`)
2. Copiar el código Pbcopy (sin nav ni footer)
3. Pegar en Elementor como **HTML Widget**
5. Publicar

### Para crear una página nueva:
1. Crear archivo HTML local
2. Incluir solo el contenido (sin nav/footer)
3. Seguir el checklist arriba
4. Copiar a Elementor

---

**Última actualización:** 2026-02-28  
**Responsable:** Sistema de navegación ESIC
