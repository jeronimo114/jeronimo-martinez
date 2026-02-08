# Módulo 2: Automatizaciones

## Duración: 35 minutos

## Objetivos
- Entender qué es una automatización
- Conocer la estructura Trigger → Acción
- Ver ejemplos reales de automatizaciones
- Diferenciar automatización, IA y agentes

---

## Slide S1-12: Título del Módulo

**Layout:** Divider
**Número:** 02
**Título:** Automatizaciones
**Subtítulo:** Haciendo que las máquinas trabajen por ti

---

## Slide S1-13: ¿Qué es una automatización?

**Layout:** Big Statement
**H1:** "Si esto, entonces aquello"
**Support:** Una regla que se ejecuta sin intervención humana

**Acento:** "esto" y "aquello" en azul

---

## Slide S1-14: Anatomía de una Automatización

**Layout:** Visual Full
**Visual:** Diagrama de flujo horizontal

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   TRIGGER    │ ──→ │    LÓGICA    │ ──→ │   ACCIÓN     │
│  (Disparo)   │     │  (Opcional)  │     │  (Resultado) │
└──────────────┘     └──────────────┘     └──────────────┘
     ↓                     ↓                    ↓
"Llega un email"    "Si es de ventas"    "Crear tarea"
```

**Nota:** Toda automatización tiene al menos un trigger y una acción

---

## Slide S1-15: Ejemplos del Mundo Real

**Layout:** Grid 2x2

| Trigger | Acción |
|---------|--------|
| Nuevo lead en formulario | Agregar a CRM + enviar email |
| Factura recibida | Extraer datos + crear registro |
| Mensaje de soporte | Clasificar + crear ticket |
| Nuevo empleado en HR | Crear cuentas + enviar onboarding |

### Poll Interactivo
**Pregunta:** ¿Cuál de estas tareas te gustaría automatizar?

**Opciones:**
- A) Responder emails repetitivos
- B) Actualizar reportes y hojas de cálculo
- C) Enviar recordatorios y seguimientos
- D) Clasificar y organizar documentos
- E) Otra (escribir)

**Momento:** Conectar con el icebreaker inicial
**Duración:** 2 minutos

---

## Slide S1-16: Actividad: Tus Tareas Repetitivas

**Layout:** Big Statement
**H1:** "¿Qué haces una y otra vez?"
**Support:** Piensa en una tarea que repites al menos 1 vez por semana

### Actividad Grupal (5 minutos)
**Instrucciones:**
1. Cada persona piensa en UNA tarea repetitiva
2. La describe en una frase corta
3. Compartir en parejas (2 min)
4. Voluntarios comparten con el grupo

**Ejemplos para iniciar:**
- "Cada lunes paso datos de un Excel a otro"
- "Reenvío emails de clientes a mi equipo"
- "Actualizo el reporte de ventas manualmente"

**Nota instructor:** Anotar en pantalla para referenciar después

---

## Slide S1-17: El Costo de lo Manual

**Layout:** 2 Columnas con números

**Columna izquierda - "La cuenta":**
- 15 min/día en tarea repetitiva
- × 5 días = 1.25 horas/semana
- × 50 semanas = 62.5 horas/año
- = **8 días laborales perdidos**

**Columna derecha - "El ROI":**
- Setup automatización: 2-4 horas
- Ahorro año 1: 58+ horas
- **Retorno: 15x - 30x**

---

## Slide S1-18: Herramientas de Automatización

**Layout:** Grid horizontal

| Herramienta | Tipo | Precio |
|-------------|------|--------|
| Zapier | No-code | $$ |
| Make (Integromat) | No-code | $$ |
| **n8n** | Low-code | **Gratis/Open** |
| Power Automate | Enterprise | $$$ |

**Destacado:** n8n (lo que usaremos)

---

## Slide S1-19: El Espectro de la Automatización

**Layout:** Visual Full
**Visual:** Espectro horizontal con gradiente

```
REGLAS          →          IA          →          AGENTES
  ↓                        ↓                        ↓
"Si X, hacer Y"      "Analizar y          "Decidir y actuar
                      recomendar"          de forma autónoma"

Zapier básico        GPT clasificando     Agente que gestiona
                     emails               tu calendario
```

**H1:** "Del if/else a la autonomía"
**Support:** Hoy empezamos a la izquierda, terminamos a la derecha

---

## Slide S1-19b: ¿Dónde estamos hoy?

**Layout:** Big Statement
**H1:** Sesión 1
**Support:** Automatización con reglas

**Visual:** Punto resaltado en el extremo izquierdo del espectro

**Preview:**
- Sesión 2: Agregamos IA a los workflows
- Sesión 3: Construimos agentes básicos
- Sesión 4: Agentes autónomos avanzados

---

## Resumen del Módulo

**Layout:** 3 Líneas con iconos

1. ⚡ Automatización = Trigger + Acción sin intervención
2. 💰 El costo de lo manual es mayor de lo que parece
3. 📈 El espectro va de reglas simples a agentes autónomos

---

## Transición

**Frase de cierre:**
> "Suficiente teoría. Es hora de ensuciarnos las manos."

**Siguiente:** Break 1 (15 minutos) → Módulo 3 - Introducción a n8n

---

## Notas del Instructor

### Timing
- Intro y anatomía: 8 min
- Ejemplos + poll: 7 min
- Actividad grupal: 8 min
- Costo y herramientas: 7 min
- Espectro: 5 min
- **Total:** 35 min

### Tips
- La actividad grupal es clave para engagement
- Anotar las tareas mencionadas para referenciar en sesiones posteriores
- El cálculo de ROI es muy persuasivo

### Conexión con Icebreaker
- Referenciar tareas mencionadas al inicio
- "¿Recuerdan que [nombre] mencionó [tarea]? Eso es exactamente esto"

### Preparación para el Break
- Antes del break, mencionar:
  - "Después del break, abrimos n8n"
  - "Si no tienen cuenta, créenla ahora: app.n8n.cloud"
  - "Tengan su cuenta de Google lista"
