# Cómo hacer presentaciones con IA que no sean tan malas como las de Gamma

> Guía práctica paso a paso para crear presentaciones reales usando IA como herramienta de pensamiento, no de generación automática.

---

## 1. Introducción

Las presentaciones generadas automáticamente con herramientas como Gamma tienen un problema fundamental: **la IA genera el contenido y el diseño al mismo tiempo**, sin que tú definas primero qué historia quieres contar.

El resultado: slides genéricas, llenas de bullets, sin narrativa, sin demos, sin personalidad.

La solución no es dejar de usar IA. Es **usarla en el orden correcto**.

En esta clase aprenderás a:
- Usar IA para estructurar ideas, no para reemplazar el diseño
- Generar un archivo Markdown como base de cualquier presentación
- Convertir ese markdown en slides, videos y demos
- Crear una web personal de portafolio con ChatGPT Codex
- Conectar tu proyecto a GitHub y desplegarlo en Vercel

---

## 2. El problema con las presentaciones de IA

### Los errores más comunes

**Demasiado texto en cada slide**
Gamma llena cada slide con párrafos. Una buena presentación tiene una idea por slide, máximo una oración de soporte.

**Falta de narrativa**
Las slides generadas automáticamente son listas. Las buenas presentaciones son historias con principio, conflicto y resolución.

**Diseño genérico**
El diseño de Gamma parece el mismo en todas las presentaciones. No comunica tu personalidad ni tu marca.

**Sin demos en vivo**
Una demo vale más que veinte slides. Las presentaciones generadas con IA nunca incluyen demos reales.

**Sin visual storytelling**
No hay videos, no hay animaciones, no hay comparaciones visuales que hagan memorable el contenido.

### Comparación directa

| Auto-generado (Gamma) | Diseñado con IA |
|---|---|
| • Introducción al tema | 🎯 Hook: la pregunta que nadie hace |
| • Punto 1 | 💡 El problema real con datos concretos |
| • Punto 2 | 🔄 El workflow que cambia todo |
| • Punto 3 | 🎬 Demo animada en video |
| • Conclusión | 🚀 CTA: haz esto hoy |

La diferencia no está en la herramienta. Está en quién controla la estructura.

---

## 3. El workflow correcto

```
💡 Idea → ✍️ Prompt → 📄 Markdown → 📖 Story → 🎨 Slides → 🎬 Videos → 🚀 Demo
```

### Por qué este orden importa

1. **Idea primero**: antes de abrir cualquier herramienta, define qué cambio de mentalidad quieres producir en tu audiencia.

2. **Prompt**: describe ese objetivo a la IA con contexto claro (audiencia, duración, tono).

3. **Markdown**: la IA genera un outline estructurado. Markdown es el formato perfecto porque es legible para humanos y para máquinas.

4. **Story**: revisas el outline y ajustas el arco narrativo. Aquí es donde tú piensas, no la IA.

5. **Slides**: con el markdown listo, diseñas slides slide por slide. Cada una tiene una sola idea.

6. **Videos**: algunos conceptos se explican mejor en movimiento. Remotion permite crear videos animados con React.

7. **Demo**: el cierre con prueba real. El público lo vio funcionar, no solo lo escuchó.

### Por qué Markdown es el formato clave

- Es texto plano: la IA lo procesa perfectamente
- Tiene jerarquía natural (`#`, `##`, `###`)
- Se convierte fácilmente en HTML, PDF, slides, Word
- Puedes hacer commit en GitHub y compartirlo
- Es el formato perfecto para documentación técnica

---

## 4. Generar un outline de presentación con IA

### El prompt reutilizable

Copia este prompt y ajusta los campos entre corchetes:

```
Eres un experto en presentaciones técnicas y storytelling.

Crea un outline detallado en Markdown para una presentación sobre [tu tema].

Contexto:
- Audiencia: [descripción de tu audiencia]
- Duración: [X] minutos
- Objetivo: que al final el público pueda [acción concreta]
- Tono: [profesional / casual / técnico / inspiracional]

El outline debe incluir:
1. Un hook poderoso de apertura (no empieces con "hola, soy...")
2. El problema o tensión que la presentación resuelve
3. Los 3-5 bloques principales de contenido
4. Una demo o ejercicio práctico por bloque
5. Un cierre con llamada a la acción clara

Para cada slide incluye:
- Título corto (máximo 6 palabras)
- Idea principal (1 oración)
- Sugerencia visual (imagen, diagrama, video, código)
- Si aplica: notas del presentador

No generes el contenido final todavía. Solo el outline con estructura y narrativa.
```

### Ejemplo de resultado

```markdown
# Cómo aprender cualquier habilidad en la mitad del tiempo

## HOOK (Slide 1)
**Título:** ¿Y si te dijeron que lo hacías mal?
**Idea:** La forma tradicional de aprender es la menos eficiente.
**Visual:** Comparación: método tradicional vs método correcto (dos columnas)

## EL PROBLEMA (Slides 2-3)
**Título:** El mito del esfuerzo puro
**Idea:** Más horas no significan más aprendizaje.
**Visual:** Gráfica: tiempo invertido vs retención real
**Demo:** Pedir al público que recuerde algo que estudió hace 1 semana

## LA SOLUCIÓN (Slides 4-7)
...

## DEMO EN VIVO (Slide 8)
**Título:** Pruébalo ahora
**Idea:** En 10 minutos vas a aprender X mejor que en 2 horas de clase.
**Demo:** Ejercicio guiado con el público

## CIERRE (Slide 9)
**Título:** Tu primera acción hoy
**CTA:** Descarga la guía → ponla en práctica esta semana → comparte el resultado
```

---

## 5. Demo: crear videos con Remotion

### Qué es Remotion

Remotion es una librería de React que permite crear **videos programáticos**. En lugar de editar video con software de edición, escribes código React que describe lo que el video debe mostrar en cada frame.

```bash
# Instalar Remotion en un proyecto nuevo
npm create video@latest
```

### Por qué Remotion es perfecto para presentaciones técnicas

- **Demos animadas**: muestra un proceso paso a paso, frame por frame
- **Workflows visuales**: anima diagramas, flujos, comparaciones
- **Código que aparece**: simula una terminal con typewriter effect
- **Datos que se mueven**: gráficas, contadores, porcentajes animados
- **Marca consistente**: mismos colores y tipografía que tus slides

### Videos que puedes crear para esta clase

| Video | Qué muestra | Duración |
|---|---|---|
| `GammaVsIA` | Comparación visual entre presentaciones | 30s |
| `WorkflowCorrecto` | El flujo Idea → Markdown → Demo | 30s |
| `GenerarMarkdown` | Cómo tipear el prompt y ver el resultado | 38s |
| `UsarCodex` | Qué hace Codex y cómo pedirle un proyecto | 30s |
| `CrearPortafolio` | Las secciones del portafolio y el prompt | 38s |
| `GitHubDeploy` | Comandos git + dashboard de Vercel | 38s |

### Cómo se ve un video de Remotion

```tsx
// Ejemplo: texto que aparece palabra por palabra
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ["El", "prompt", "correcto", "lo", "cambia", "todo."];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {words.map((word, i) => {
          const progress = spring({
            frame: frame - i * 8,
            fps,
            config: { damping: 200 },
          });
          return (
            <span
              key={i}
              style={{
                opacity: interpolate(progress, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px)`,
                fontSize: 72,
                fontWeight: "900",
                color: i === 2 ? "#007AFF" : "#fff",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
```

---

## 6. Usar Codex de ChatGPT

### Qué es Codex

ChatGPT Codex es el agente de coding de OpenAI. A diferencia de un chat normal, Codex:

- Corre en su propia **sandbox (máquina virtual)**
- Puede **instalar dependencias** reales
- Puede **hacer commits** y crear archivos
- Trabaja de forma **autónoma** mientras tú haces otra cosa
- Puede generar **proyectos completos** desde un solo prompt

### Cómo acceder

1. Ir a [chatgpt.com](https://chatgpt.com) (requiere cuenta, actualmente en planes de pago)
2. En el menú lateral: **Codex** o **Agent**
3. Crear una nueva tarea
4. Escribir tu prompt y esperar

### Prompt de ejemplo para Codex

```
Crea una web de portafolio personal con las siguientes especificaciones:

Stack: Next.js 14 con App Router y Tailwind CSS
Diseño: dark mode, minimalista, con micro-animaciones
Tipografía: Inter (Google Fonts)
Paleta: fondo #0a0a0a, acento azul #007AFF, verde éxito #30D158

Secciones requeridas:
1. Hero: nombre, rol, descripción breve (2 líneas), botones CTA
2. About: foto placeholder, párrafo de presentación, habilidades como badges
3. Proyectos: grid de 3 tarjetas con título, descripción, stack y links
4. Contacto: formulario simple + links a redes sociales

Extras:
- Animaciones de entrada con Framer Motion
- Responsive (mobile-first)
- Metadata SEO en layout.tsx
- README con instrucciones de deploy

Al terminar, muéstrame la estructura de archivos y cómo correrlo localmente.
```

### Lo que Codex va a generar

```
portafolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   └── Contact.tsx
├── public/
│   └── foto-placeholder.jpg
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## 7. Proyecto práctico: web de portafolio personal

### Qué debe incluir tu portafolio

**Hero Section**
- Tu nombre completo
- Tu rol o especialidad (ej: "Desarrollador Web" / "Diseñador UX" / "Agente Builder")
- Una descripción de 2 líneas que cuente qué haces y para quién
- Dos botones: "Ver proyectos" y "Contactar"

**About**
- Foto o avatar
- Párrafo corto: quién eres, qué te apasiona, qué diferencia tienes
- Lista de habilidades o tecnologías como badges visuales

**Proyectos**
- Mínimo 3 proyectos
- Cada uno con: título, descripción (2-3 líneas), stack usado, link al proyecto y link al código
- Si no tienes proyectos reales todavía: pon proyectos en progreso o proyectos de clase

**Contacto**
- Email (o formulario)
- LinkedIn
- GitHub
- Opcionalmente: Twitter/X, CV descargable

### El prompt completo para tu portafolio

```
Crea una web de portafolio personal con las siguientes especificaciones:

## Stack
- Framework: Next.js 14 con App Router
- Estilos: Tailwind CSS v3
- Animaciones: Framer Motion
- Fuente: Inter de Google Fonts
- Deploy target: Vercel

## Diseño
- Modo: dark mode exclusivo
- Fondo: #0a0a0a
- Texto: #ffffff (principal), #a0a0a0 (secundario)
- Acento principal: #007AFF (azul)
- Acento secundario: #30D158 (verde)
- Border radius: 12-16px en tarjetas
- Espaciado generoso entre secciones

## Secciones

### 1. Hero
- Nombre grande con gradiente de texto
- Rol como tag animado
- Descripción de 2 líneas
- CTA: botón "Ver proyectos" (scroll) + botón "Descargar CV" (link)
- Fondo con gradiente sutil o partículas

### 2. About
- Foto circular (placeholder de 200x200px)
- Párrafo corto con texto de placeholder
- Grid de habilidades: badges con colores por categoría
  (Frontend: azul, Backend: verde, Tools: amarillo)

### 3. Proyectos
- Grid responsive de 3 tarjetas
- Cada tarjeta: imagen placeholder, título, descripción, tags de stack
- Hover effect: slight scale + border glow
- Botones: "Ver demo" y "Ver código"

### 4. Contacto
- Heading motivador
- Lista de links: Email, LinkedIn, GitHub, Twitter
- Cada link con ícono SVG y hover animation

## Calidad del código
- TypeScript estricto
- Componentes separados en /components
- Sin dependencias innecesarias
- README con instrucciones paso a paso

Genera el proyecto completo y lista para correr con `npm run dev`.
```

---

## 8. Conectar a GitHub

### Paso a paso desde cero

**1. Crear el repositorio en GitHub**

Ve a [github.com](https://github.com) → botón **+** → **New repository**

- Nombre: `portafolio` (o tu nombre de dominio)
- Visibilidad: Public (necesario para deploy gratis en Vercel)
- NO inicialices con README (ya tienes código local)

**2. Inicializar git en tu proyecto**

```bash
# Dentro de la carpeta de tu proyecto
git init
git add .
git commit -m "feat: portafolio inicial generado con Codex"
```

**3. Conectar y subir**

```bash
# Reemplaza tu-usuario con tu usuario de GitHub
git remote add origin https://github.com/tu-usuario/portafolio.git
git branch -M main
git push -u origin main
```

**4. Verificar**

Recarga tu repositorio en GitHub. Deberías ver todos los archivos del proyecto.

### Comandos para el día a día

```bash
# Guardar cambios
git add .
git commit -m "descripción de lo que cambiaste"
git push

# Ver el estado de tus cambios
git status

# Ver el historial de commits
git log --oneline
```

---

## 9. Deploy en Vercel

### Conectar tu repositorio

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta (gratis con GitHub)
2. Clic en **Add New → Project**
3. Elige tu repositorio `portafolio` de la lista
4. Vercel detecta automáticamente que es Next.js
5. Clic en **Deploy**

### Lo que pasa automáticamente

- Vercel instala las dependencias (`npm install`)
- Construye el proyecto (`npm run build`)
- Despliega en su red global de CDN
- Te da una URL pública tipo `portafolio-tunombre.vercel.app`

### Deploy automático en cada push

Después del primer deploy, **cada vez que hagas `git push`**, Vercel hace un nuevo deploy automáticamente. No tienes que hacer nada más.

### Dominio personalizado (opcional)

1. Ve a tu proyecto en Vercel → **Settings → Domains**
2. Agrega tu dominio (ej: `tunombre.com`)
3. Configura los DNS con tu proveedor de dominio
4. Vercel gestiona el certificado HTTPS automáticamente

---

## 10. Materiales para estudiantes

### Prompts descargables

**Prompt 1: Generar outline de presentación**
```
[Ver Sección 4 — El prompt reutilizable]
```

**Prompt 2: Generar portafolio personal**
```
[Ver Sección 7 — El prompt completo para tu portafolio]
```

**Prompt 3: Prompt para Codex**
```
[Ver Sección 6 — Prompt de ejemplo para Codex]
```

### Checklist para una buena presentación

```
ANTES DE DISEÑAR
[ ] Definí qué cambio de mentalidad quiero producir
[ ] Tengo claro quién es mi audiencia y qué ya saben
[ ] Escribí el objetivo como "al final el público podrá..."
[ ] Generé el outline en Markdown primero

ESTRUCTURA
[ ] Cada slide tiene UNA sola idea
[ ] El hook de apertura es una pregunta o dato impactante
[ ] No empiezo con "hola, soy..."
[ ] Hay al menos una demo o ejercicio práctico
[ ] El cierre tiene una llamada a la acción específica

DISEÑO
[ ] Máximo 30 palabras por slide
[ ] Las imágenes refuerzan el mensaje, no lo repiten
[ ] Los colores son consistentes (máximo 3)
[ ] La tipografía es legible desde atrás de la sala

PRESENTAR
[ ] Practiqué al menos una vez en voz alta
[ ] Tengo el plan B si falla la demo
[ ] El tiempo estimado coincide con el real
```

### Template de Markdown para presentaciones

```markdown
# [Título de tu presentación]

**Objetivo:** Al final, el público podrá [acción concreta].
**Audiencia:** [descripción]
**Duración:** [X] minutos

---

## HOOK (Slides 1-2)

### Slide 1: [Título corto]
**Idea:** [Una oración]
**Visual:** [Descripción de qué mostrar]
**Notas:** [Lo que dices en voz alta]

### Slide 2: [Título corto]
...

---

## BLOQUE 1: [Nombre del bloque] (Slides 3-5)

### Slide 3: [Título]
...

---

## DEMO (Slide X)
**Qué muestro:** [descripción de la demo]
**Duración estimada:** [minutos]
**Plan B si falla:** [alternativa]

---

## CIERRE (Slide final)
**CTA:** [Acción específica que el público debe tomar hoy]
**Recurso:** [Link, descarga o siguiente paso]
```

---

## 11. Ejercicio para los estudiantes

### Tu misión de hoy

**Paso 1: Elige tu tema**

Elige uno de estos temas o propón el tuyo:
- Cómo funciona algo que te apasiona
- Un proceso de tu trabajo actual
- Una habilidad que quieres enseñar
- Un proyecto que estás construyendo

**Paso 2: Genera tu markdown de presentación**

Copia el prompt de la Sección 4, ajusta los campos y pégalo en Claude o ChatGPT. Guarda el resultado como `presentacion.md`.

**Paso 3: Genera tu web de portafolio**

Abre Codex en ChatGPT, pega el prompt de la Sección 7 y espera a que genere el proyecto completo.

**Paso 4: Sube tu portafolio a GitHub**

```bash
cd tu-portafolio
git init
git add .
git commit -m "feat: mi portafolio personal"
git remote add origin https://github.com/TU_USUARIO/portafolio.git
git push -u origin main
```

**Paso 5: Despliégalo en Vercel**

Conecta el repositorio en [vercel.com](https://vercel.com) y haz deploy.

**Entrega:**
- URL de tu portafolio en Vercel
- Link a tu repositorio de GitHub
- Tu archivo `presentacion.md`

Comparte los links en el canal del grupo.

---

## Referencias

- [Remotion — Videos con React](https://remotion.dev)
- [Next.js — App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel — Deploy](https://vercel.com/docs)
- [GitHub — Primeros pasos](https://docs.github.com/es/get-started)
