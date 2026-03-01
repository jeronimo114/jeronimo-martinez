# Archivos Recuperados del Historial de Git

> Fecha de recuperación: 2026-02-28
> Todos los archivos fueron eliminados en commits anteriores y han sido recuperados desde el historial de git.

---

## 📊 Resumen por Categoría

| Categoría | Cantidad | Descripción |
|-----------|----------|-------------|
| Imágenes | 10 | JPGs originales eliminados al convertir a WebP |
| Codex-to-Figma | 6 | Scripts y outputs de conversión PDF → Elementor |
| Elementor | 17 | Versión alternativa de páginas HTML |
| Páginas HTML | 3 | Páginas sueltas eliminadas |

---

## 📁 1. IMAGENES (recovered/imagenes/)

Archivos JPG originales de fotografía del campus. Fueron eliminados al optimizar y convertir a WebP.

- DSC02177_resultado.jpg
- DSC02190_resultado.jpg
- DSC02206_resultado.jpg
- DSC02220_resultado.jpg
- DSC02270_resultado.jpg
- DSC02274_resultado.jpg
- DSC02279_resultado.jpg
- DSC02284_resultado.jpg
- DSC02307_resultado.jpg
- DSC02331_resultado.jpg

**Nota:** En el sitio actual se usan versiones WebP de estas mismas imágenes.

---

## 📁 2. CODEX-TO-FIGMA (recovered/codex-to-figma/)

Scripts y herramientas para convertir diseños de Figma/PDF a código Elementor.

| Archivo | Descripción |
|---------|-------------|
| `pdf_to_elementor.py` | Script Python de conversión |
| `AGENTS.md` | Documentación del sistema |
| `output/elementor-paste.md` | Output en formato markdown |
| `output/elementor.html` | Output en HTML |
| `output/elementor.json` | Output en JSON |
| `output/report.json` | Reporte de conversión |

---

## 📁 3. ELEMENTOR (recovered/elementor/)

Versión alternativa de todas las páginas del sitio. Esta versión fue eliminada en favor de las versiones principales.

### Estructura:
```
elementor/
├── index.html                          # Home alternativo
├── executive-programs/
│   └── index.html                      # Executive Programs
├── formularios/
│   ├── contacto.html                   # Formulario de contacto
│   └── zoho.html                       # Integración Zoho
├── institucional/
│   └── quienes-somos.html              # Página institucional
├── level-up/
│   ├── index.html                      # Landing Level Up
│   └── ia.html                         # Curso de IA
├── master/
│   ├── index.html                      # Archivo general Máster
│   ├── v2.html                         # Versión alternativa
│   ├── becas.html                      # Becas Máster
│   ├── digital-business.html           # Programa específico
│   ├── digital-marketing.html          # Programa específico
│   └── customer-experience.html        # Programa específico
└── pregrado/
    ├── index.html                      # Archivo general Pregrado
    ├── especifico.html                 # Página específica
    ├── marketing-global.html           # Programa específico
    └── digital-business.html           # Programa específico
```

---

## 📁 4. PÁGINAS HTML ADICIONALES (recovered/paginas-html/)

Páginas sueltas que fueron eliminadas o reemplazadas.

| Archivo | Estado | Notas |
|---------|--------|-------|
| `quienes-somos.html` | ❌ Eliminada | Reemplazada por institucional/quienes-somos.html |
| `sobre-nosotros.html` | ❌ Eliminada | Versión antigua de quienes somos |
| `pregrado-especifico.html` | ❌ Eliminada | Versión específica de pregrado |

---

## ❌ Archivos NO Recuperados

Algunos archivos no pudieron ser recuperados (probablemente no estaban en el historial de git):

- Crops PNG (crop_cifras.png, crop_fundadores.png, etc.)
- Figma-exports PDFs

---

## 🔧 Cómo Usar los Archivos Recuperados

### Para recuperar un archivo específico del historial:

```bash
# Encontrar el commit donde fue eliminado
git log --diff-filter=D --summary --all -- "ruta/al/archivo"

# Recuperar del commit anterior
git show COMMIT~1:ruta/al/archivo > archivo_recuperado
```

### Para ver todos los archivos eliminados:

```bash
git log --diff-filter=D --summary --all | grep "delete mode"
```

---

## 📝 Notas de Recuperación

- **Fecha de eliminación mayoría de archivos:** Feb 15-24, 2026
- **Commits clave de eliminación:**
  - `9bec7b6` - Eliminar carpeta elementor/
  - `1270c6a` - Eliminar codex-to-figma/
  - `5298747` - Eliminar JPGs (reemplazados por WebP)
  - `155afe1` - Eliminar master/index.html

---

**Última actualización:** 2026-02-28
