# ESIC Medellín
## Sistema Global de Reglas, Lineamientos y Decisiones de Diseño

Este documento consolida **todas las reglas, lineamientos, criterios, decisiones visuales y editoriales** definidos a lo largo del rediseño de páginas de **Pregrado, Máster y Quiénes Somos**.

Debe tomarse como **fuente única de verdad** para diseño, contenido y maquetación.

---

## 1. Principios generales

- Todo diseño debe sentirse **nativo del ecosistema ESIC**.
- No se crean páginas aisladas. Siempre se amplía un sistema existente.
- La coherencia visual es prioritaria frente a la creatividad individual.
- Si existe duda entre inventar algo nuevo o reutilizar algo existente, **siempre se reutiliza lo existente**.

---

## 2. Reglas visuales globales (no negociables)

### 2.1 Overlap entre secciones

- Todas las secciones principales deben solaparse verticalmente.
- Medida obligatoria: **50px de overlap**.
- Cada sección debe tener:
  - **Border-radius de 50px** en la esquina superior izquierda.
  - **Border-radius de 50px** en la esquina superior derecha.
- El overlap debe ser consistente en toda la página.
- El objetivo es generar profundidad, continuidad y ritmo visual.

---

### 2.2 Imágenes y overlays

- **Todas las imágenes** deben llevar **overlay negro**.
- Aplica a:
  - Hero con imagen
  - Cards con imagen
  - Banners
  - Posters de video
  - Fondos fotográficos
- El overlay no es decorativo.
- Su función es:
  - Controlar contraste
  - Garantizar legibilidad
  - Unificar el lenguaje visual

---

### 2.3 Prohibición absoluta de emojis

- **Jamás se usan emojis** en ninguna parte del sitio: ni en iconos, ni en títulos, ni en descripciones, ni en tarjetas, ni en ningún componente visual.
- No se permite el uso de caracteres Unicode de emojis como sustituto de iconografía (ej: no usar "🌐", "💡", "⚖️", "📊").
- Se permiten **exclusivamente**:
  - **SVGs inline** dibujados con trazos limpios (`stroke-based`), sin relleno sólido, estilo lineal.
  - **Ilustraciones formales de alta calidad**, con apariencia profesional y coherente con el sistema visual.
- Toda iconografía debe verse **institucional, sobria y premium**.
- El estándar visual debe igualar el nivel de las páginas de **Máster**.
- Está prohibida la iconografía genérica, de baja calidad, o con apariencia informal/cartoon.

---

## 3. Colores highlight por área

### 3.1 Pregrado

- Color highlight principal: **#FF8701**
- Reglas:
  - Solo puede existir **una sección highlight** por página.
  - No se usa como fondo general.
  - Se reserva para conversión o énfasis narrativo.

---

### 3.2 Máster

- Color highlight principal: **#09CF90**
- Reglas:
  - Una sola sección highlight por página.
  - Uso estratégico, nunca dominante.

---

### 3.3 Quiénes Somos

- El scroll break highlight debe usar **azul oscuro**.
- Debe romper el ritmo visual sin competir con highlights académicos.

---

## 4. Hero sections

- El hero siempre es un **banner limpio**.
- Prohibido:
  - Cards dentro del hero
  - Exceso de iconos
  - Elementos decorativos innecesarios

### Contenido permitido
- Título fuerte
- Subtítulo breve (1–2 líneas)
- **Máximo 1 o 2 CTAs**

---

## 5. CTAs

- Nunca más de 2 CTAs visibles por bloque.
- Deben ser claros, directos y accionables.
- No se repiten CTAs sin justificación narrativa.

---

## 6. Cards (estándar premium)

### 6.1 Forma

- Rectángulos horizontales
- Esquinas muy redondeadas
- Sin bordes visibles

### 6.2 Color

- Uso de **degradados suaves premium**
- Prohibidos colores planos en cards principales

### 6.3 Elementos internos

- Blob o forma abstracta en esquina superior derecha
- Baja opacidad
- Función volumétrica, no decorativa

### 6.4 Iconografía

- Íconos SVG
- Contenedor cuadrado con esquinas redondeadas
- Apariencia translúcida

---

## 7. Sección de beneficios (nuevo estándar)

- Reemplaza filas de íconos simples.
- Layout:
  - Desktop: grilla **2x2**
  - Mobile: una columna

### Cards obligatorias

1. 4 Años – DURACIÓN
2. Medellín – COLOMBIA
3. Doble Titulación – ESIC + UNIVERSIDAD ALIADA
4. Inmersión internacional – EXPERIENCIA INTERNACIONAL

### Paleta sugerida

- Naranja
- Azul
- Verde
- Morado

---

## 8. Secciones highlight

- Una sola por página.
- Fondo sólido con color highlight del área.
- Copy breve y directo.
- Máximo 2 CTAs.
- Puede incluir ilustración SVG high-end.

---

## 9. Scroll break

- Sección intermedia para romper ritmo.
- Fondo oscuro o azul profundo.
- Copy institucional fuerte.
- Máximo 1 CTA.

---

## 10. Formularios

- Nunca se rediseñan.
- Se reutilizan tal cual existen.
- Mismos campos, copys y validaciones.

---

## 11. Archivos y nomenclatura

- Pregrado general: `pregrado-general.html`
- Pregrado específico: `pregrado-especifico.html`
- Máster general: `master-general.html`

Cada página se crea **desde cero**, sin modificar archivos existentes.

---

## 12. Regla final absoluta

Si debes elegir entre:

- Crear algo nuevo
- Reutilizar algo existente

**Siempre reutiliza lo existente.**

Este documento debe acompañar cualquier prompt, entrega o implementación futura.

