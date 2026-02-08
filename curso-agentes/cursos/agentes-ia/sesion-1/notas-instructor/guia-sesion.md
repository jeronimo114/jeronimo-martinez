# Guía del Instructor - Sesión 1

## Resumen Ejecutivo

| Aspecto | Detalle |
|---------|---------|
| **Duración total** | 4.5 horas |
| **Slides** | 40+ |
| **Demos en vivo** | 4 |
| **Ejercicios** | 4 |
| **Polls** | 5 |
| **Proyecto final** | Gmail → Google Sheets |

---

## Checklist Pre-Sesión

### 1 Día Antes
- [ ] Probar presentación HTML en el equipo que usarás
- [ ] Verificar credenciales n8n (Gmail, Sheets)
- [ ] Crear Google Sheet de prueba con encabezados
- [ ] Configurar polls en Mentimeter/Slido
- [ ] Enviar recordatorio a estudiantes (cuenta Google, n8n)

### 30 Minutos Antes
- [ ] Abrir todas las pestañas necesarias:
  - Presentación HTML
  - n8n Cloud (logueado, workflow vacío)
  - OpenAI Tokenizer
  - ChatGPT
  - Google Sheets de prueba
  - Mentimeter dashboard
- [ ] Verificar WiFi y compartir password
- [ ] Probar proyector/pantalla
- [ ] Tener celular listo para emails de prueba

### Al Inicio
- [ ] Dar bienvenida mientras llegan
- [ ] Verificar que todos tienen:
  - Laptop funcionando
  - Cuenta Google accesible
  - Cuenta n8n (crear si no tienen)

---

## Timeline Detallado

### APERTURA (0:00 - 0:20)

| Tiempo | Slide | Actividad |
|--------|-------|-----------|
| 0:00-0:03 | S0-01 | Portada + bienvenida |
| 0:03-0:05 | S0-02 | Presentación instructor |
| 0:05-0:08 | S0-03 | Agenda del día |
| 0:08-0:10 | S0-04 | Estructura del curso |
| 0:10-0:12 | S0-05 | Metodología |
| 0:12-0:20 | S0-06 | **Icebreaker:** "Tu tarea más repetitiva" |

**Tips para el icebreaker:**
- Empezar tú con un ejemplo propio
- Anotar las respuestas (referenciarlas luego)
- Máximo 2 minutos por persona si el grupo es pequeño
- Si el grupo es grande (>15), hacer en parejas

---

### MÓDULO 1: LLM POR DENTRO (0:20 - 1:15)

| Tiempo | Slide | Actividad |
|--------|-------|-----------|
| 0:20-0:22 | S1-00 | Título del módulo |
| 0:22-0:25 | S1-01 | Qué vamos a aprender |
| 0:25-0:28 | S1-02 | "La IA no entiende" |
| 0:28-0:35 | S1-03 | Qué es un LLM + **Poll 1** |
| 0:35-0:38 | S1-04 | La máquina de predicción |
| 0:38-0:50 | S1-05 | Tokens + **Demo Tokenizer** |
| 0:50-0:55 | S1-06 | Por qué importan los tokens |
| 0:55-1:00 | S1-07 | Ventana de contexto |
| 1:00-1:03 | S1-08 | Problema del contexto |
| 1:03-1:08 | S1-09-10 | Stack de mensajes |
| 1:08-1:15 | S1-11 | Precisión + **Demo Prompts** |

**Momentos clave:**
- **Poll 1 (S1-03):** Lanzar ANTES de explicar. La sorpresa de que "no entiende" es poderosa.
- **Demo Tokenizer:** Ir despacio. Dejar que procesen cada ejemplo.
- **Demo Prompts:** El contraste debe ser dramático. Exagerar reacciones.

---

### EJERCICIO 1: TOKENS (1:15 - 1:20)

**Antes de soltar:**
> "Tienen 5 minutos para experimentar con el tokenizer. Quiero que prueben su nombre completo y al menos 3 textos diferentes."

**Durante:**
- Circular por el salón
- Responder preguntas individuales
- Identificar descubrimientos interesantes para compartir

**Cierre:**
> "¿Alguien descubrió algo sorprendente?"

---

### BREAK 1 (1:20 - 1:35)

**Antes del break:**
> "Tienen 15 minutos. Después veremos automatizaciones. Si no tienen cuenta de n8n, créenla ahora: app.n8n.cloud"

**Durante el break:**
- Dejar tokenizer abierto para los curiosos
- Ayudar con cuentas n8n si es necesario

---

### MÓDULO 2: AUTOMATIZACIONES (1:35 - 2:10)

| Tiempo | Slide | Actividad |
|--------|-------|-----------|
| 1:35-1:37 | S1-12 | Título del módulo |
| 1:37-1:40 | S1-13 | "Si esto, entonces aquello" |
| 1:40-1:45 | S1-14 | Anatomía de automatización |
| 1:45-1:52 | S1-15 | Ejemplos reales + **Poll 3** |
| 1:52-2:00 | S1-16 | **Actividad grupal:** tareas repetitivas |
| 2:00-2:05 | S1-17-18 | Costo de lo manual + herramientas |
| 2:05-2:10 | S1-19 | Espectro: Reglas → IA → Agentes |

**Actividad grupal (S1-16):**
1. 1 min: Pensar individualmente
2. 2 min: Compartir en parejas
3. 2 min: Voluntarios comparten con el grupo

**Conexión con icebreaker:**
> "¿Recuerdan que [nombre] mencionó al inicio [tarea]? Eso es exactamente lo que vamos a poder automatizar."

---

### MÓDULO 3: n8n (2:10 - 3:00)

| Tiempo | Slide | Actividad |
|--------|-------|-----------|
| 2:10-2:12 | S1-20 | Título + **Poll 4** |
| 2:12-2:17 | S1-21 | Qué es n8n |
| 2:17-2:25 | S1-22-23 | Canvas y tipos de nodos |
| 2:25-2:35 | S1-24-25 | Datos JSON e Items |
| 2:35-2:45 | S1-26 | **Demo:** Primer workflow |
| 2:45-3:00 | S1-27 | **Ejercicio 3:** Workflow básico |

**Demo n8n (S1-26):**
- Ir MUY despacio
- Narrar cada click
- Pausar: "¿Todos ven esto?"
- Mostrar dónde hacer click antes de hacerlo

---

### BREAK 2 (3:00 - 3:15)

**Antes del break:**
> "Después del break conectamos herramientas reales. Tengan sus credenciales de Google a mano."

---

### PROYECTO: GMAIL → SHEETS (3:15 - 4:15)

| Tiempo | Slide | Actividad |
|--------|-------|-----------|
| 3:15-3:17 | S1-28 | Título del proyecto |
| 3:17-3:20 | S1-29 | Qué vamos a construir |
| 3:20-3:25 | S1-30 | Crear hoja de prueba |
| 3:25-3:35 | S1-31 | **Demo:** Conectar Gmail |
| 3:35-3:40 | S1-32 | **Demo:** Conectar Sheets |
| 3:40-3:55 | S1-33 | Gmail Trigger + prueba |
| 3:55-4:05 | S1-34 | Sheets node + mapeo |
| 4:05-4:10 | S1-35-36 | Probar y activar |
| 4:10-4:15 | S1-37 | Debugging |

**Modo de trabajo:**
- Primero demostrar cada paso
- Luego dar tiempo para que repliquen
- Circular ayudando

**Problemas comunes OAuth:**
- "Selecciona cuenta incorrecta" → Cerrar sesión, reintentar
- "Permisos no autorizados" → Verificar scopes
- "No aparece la hoja" → Refrescar lista

---

### CIERRE (4:15 - 4:30)

| Tiempo | Slide | Actividad |
|--------|-------|-----------|
| 4:15-4:20 | S1-38-39 | Extensiones opcionales |
| 4:20-4:22 | S1-40 | Checklist de logros |
| 4:22-4:25 | - | **Poll 5:** Completaste el proyecto? |
| 4:25-4:30 | - | Q&A + Preview Sesión 2 |

**Frase de cierre:**
> "Hoy construyeron algo real. Eso es más de lo que el 90% de la gente hará nunca. En la próxima sesión, agregamos IA a estos workflows."

---

## Manejo de Situaciones

### Si alguien va muy rápido
- Pedirle que ayude a un compañero
- Sugerirle las extensiones opcionales
- "¿Puedes agregar un campo más al Sheets?"

### Si alguien va muy lento
- Priorizar ayuda individual
- Que haga pair con alguien que terminó
- Si es muy tarde, dar el workflow pre-hecho

### Si algo técnico falla
- Tener backup de screenshots
- Usar la falla como oportunidad de enseñanza
- "Esto es exactamente lo que pasa en la vida real..."

### Si no hay preguntas
- Tener 2-3 preguntas preparadas
- "Algo que suelen preguntar es..."
- Hacer preguntas tú: "¿Qué les pareció más difícil?"

---

## Materiales de Backup

### Si n8n Cloud está lento/caído
- Self-hosted backup (si tienes)
- Screenshots del demo completo
- Video pre-grabado

### Si OAuth falla para todos
- Credenciales pre-configuradas de backup
- Workflow de ejemplo importable

### Si el WiFi falla
- Hotspot del celular
- Versión offline de la presentación

---

## Notas Post-Sesión

### Para anotar después de cada sesión:
- ¿Qué funcionó bien?
- ¿Qué tomó más tiempo de lo esperado?
- ¿Qué preguntas surgieron que no esperabas?
- ¿Qué ajustar para la próxima vez?

### Feedback a pedir:
- "¿Qué fue lo más útil?"
- "¿Qué fue lo más confuso?"
- "¿Qué agregarían o quitarían?"
