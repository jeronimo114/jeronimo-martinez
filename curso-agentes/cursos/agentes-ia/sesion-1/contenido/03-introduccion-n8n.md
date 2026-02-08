# Módulo 3: Introducción a n8n

## Duración: 50 minutos

## Objetivos
- Conocer qué es n8n y por qué lo usamos
- Navegar la interfaz del canvas
- Entender nodos, conexiones y datos
- Crear un primer workflow básico

---

## Slide S1-20: Título del Módulo

**Layout:** Divider
**Número:** 03
**Título:** n8n
**Subtítulo:** Tu plataforma de automatización

---

## Slide S1-20b: Poll de Entrada

### Poll Interactivo
**Pregunta:** ¿Qué tan cómodo te sientes con n8n?

**Opciones (escala 1-5):**
- 1: Primera vez que lo veo
- 2: He oído hablar de él
- 3: Lo he visto pero no usado
- 4: He hecho algún workflow
- 5: Lo uso regularmente

**Momento:** Antes de empezar, para calibrar velocidad
**Duración:** 1 minuto

---

## Slide S1-21: ¿Qué es n8n?

**Layout:** 2 Columnas

**Columna izquierda - "n8n es...":**
- Plataforma de automatización visual
- Open-source (código abierto)
- 400+ integraciones incluidas
- Self-hosted o cloud

**Columna derecha - "Por qué n8n:":**
- ✓ Tier gratuito generoso (2,500 ejecuciones/mes)
- ✓ Nodos nativos de IA
- ✓ Más flexible que Zapier
- ✓ Comunidad activa

---

## Slide S1-22: El Canvas

**Layout:** Visual Full + Anotaciones
**Visual:** Screenshot del canvas vacío con anotaciones

```
┌─────────────────────────────────────────────────────────┐
│ [Nombre workflow]                    [Test] [Save] [▶] │ ← Controles
├─────────────────────────────────────────────────────────┤
│                                                         │
│     ┌────────┐         ┌────────┐                      │
│     │  Nodo  │────────→│  Nodo  │                      │ ← Nodos
│     └────────┘         └────────┘                      │
│           ↑                                             │
│       Conexión                                          │
│                                                         │
│                          [+] ← Agregar nodo             │
└─────────────────────────────────────────────────────────┘
```

**Conceptos clave:**
- **Canvas:** El área de trabajo visual
- **Nodos:** Cada paso del workflow
- **Conexiones:** Las líneas entre nodos (flujo de datos)

---

## Slide S1-23: Tipos de Nodos

**Layout:** Grid 2x2

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **Trigger** | Inicia el workflow | Gmail Trigger, Webhook |
| **Acción** | Hace algo | Enviar email, Crear fila |
| **Lógica** | Decide camino | If, Switch, Merge |
| **Transformación** | Modifica datos | Set, Code, Date |

**Nota:** Todo workflow empieza con un Trigger

---

## Slide S1-24: Datos en JSON

**Layout:** Visual + Código

**H1:** Los datos fluyen como JSON

```json
{
  "email": "cliente@ejemplo.com",
  "asunto": "Nuevo lead",
  "fecha": "2024-01-15",
  "nombre": "María García"
}
```

**Support:** Cada campo es accesible en los siguientes nodos

**Analogía:**
> "Piensa en JSON como una ficha de contacto digital estructurada"

---

## Slide S1-25: Items

**Layout:** Visual + Tabla

**H1:** Un item = una "fila" de datos

**Visual:** Tabla mostrando items

| Item | email | nombre |
|------|-------|--------|
| 1 | ana@mail.com | Ana |
| 2 | luis@mail.com | Luis |
| 3 | pedro@mail.com | Pedro |

**Support:** n8n procesa items uno por uno (o en lote)

**Clave:**
- Si recibes 10 emails, tienes 10 items
- Cada item pasa por todo el workflow
- Puedes filtrar, transformar o combinar items

---

## Slide S1-26: Demo - Primer Workflow

**Layout:** Big Statement
**H1:** Manos al código
**Support:** Creemos nuestro primer workflow juntos

### Demo en Vivo: Workflow Básico
**Archivo detallado:** `demos/demo-03-n8n-basico.md`

**Pasos resumidos:**
1. Abrir n8n → Nuevo workflow
2. Agregar nodo "Manual Trigger"
3. Agregar nodo "Set"
4. Conectar: Trigger → Set
5. Configurar Set: `saludo` = `Hola desde n8n!`
6. Ejecutar (botón Execute)
7. Click en nodo Set → ver output

**Duración:** 5 minutos

---

## Slide S1-27: Ejercicio - Tu Primer Workflow

**Layout:** Big Statement
**H1:** Tu turno
**Support:** Replica el workflow y personalízalo

### Ejercicio Hands-on
**Archivo detallado:** `ejercicios/ejercicio-03-workflow.md`

**Objetivo:** Familiarizarse con la interfaz de n8n

**Pasos:**
1. Crear nuevo workflow
2. Agregar Manual Trigger
3. Agregar nodo Set
4. Campo: `saludo` = `Hola desde n8n, soy [tu nombre]!`
5. Ejecutar y verificar output

**Duración:** 15 minutos

**Checkpoint:** Levantar mano cuando vean su mensaje en el output

---

## Slide S1-27b: Expresiones en n8n

**Layout:** 2 Columnas

**Columna izquierda - "Sintaxis":**
```
{{ $json.campo }}
```
- `$json` = datos del nodo anterior
- `.campo` = nombre del campo

**Columna derecha - "Ejemplos":**
```
{{ $json.email }}
→ "cliente@mail.com"

{{ $json.nombre }}
→ "María"

{{ $json.fecha }}
→ "2024-01-15"
```

---

## Slide S1-27c: El Panel de Ejecución

**Layout:** Visual + Anotaciones

**Visual:** Screenshot del panel de ejecución

**Elementos clave:**
- **Input:** Datos que entran al nodo
- **Output:** Datos que salen del nodo
- **Logs:** Mensajes de debug
- **Errores:** En rojo si algo falla

**Tip:** Click en cualquier nodo para ver sus datos

---

## Resumen del Módulo

**Layout:** 3 Líneas con iconos

1. 🎨 n8n = Canvas visual para automatizaciones
2. 📦 Datos fluyen como JSON entre nodos
3. 🔗 Trigger → Nodos → Output

---

## Transición

**Frase de cierre:**
> "Ya saben crear un workflow básico. Ahora vamos a conectar herramientas reales."

**Siguiente:** Break 2 (15 minutos) → Proyecto 1

---

## Notas del Instructor

### Timing
- Intro + poll: 5 min
- Qué es n8n: 5 min
- Canvas y nodos: 10 min
- Datos y JSON: 10 min
- Demo: 5 min
- Ejercicio: 15 min
- **Total:** 50 min

### Tips
- Ir despacio en el demo, muchos nunca han visto n8n
- Mostrar cada click claramente
- El ejercicio es para afianzar, no para avanzar

### Errores Comunes
- Olvidar ejecutar el workflow (solo guardar)
- No conectar los nodos
- Escribir mal el nombre del campo

### Checklist Pre-Demo
- [ ] n8n abierto en pestaña limpia
- [ ] Sin workflows previos visibles
- [ ] Zoom al 100% para que se vea bien

### Ayuda Durante Ejercicio
- Circular por el salón
- Identificar quiénes terminan rápido (pueden ayudar a otros)
- Tener versión terminada lista para mostrar

### Preparación para Break 2
- Antes del break, mencionar:
  - "Después del break, conectamos Gmail y Sheets"
  - "Tengan credenciales de Google a mano"
  - "Vamos a necesitar enviar emails de prueba"
