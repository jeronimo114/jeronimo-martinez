# Módulo 1: LLM por Dentro

## Duración: 55 minutos

## Objetivos
- Entender qué es un LLM y cómo funciona a alto nivel
- Comprender el concepto de tokens
- Conocer la ventana de contexto
- Aprender sobre el stack de mensajes
- Practicar la precisión en el lenguaje

---

## Slide S1-00: Título del Módulo

**Layout:** Divider
**Número:** 01
**Título:** LLM por Dentro
**Subtítulo:** Cómo funcionan los modelos de lenguaje

---

## Slide S1-01: ¿Qué vamos a aprender?

**Layout:** 3 Líneas
**Contenido:**
1. Cómo "piensa" un modelo de lenguaje
2. Qué son los tokens y por qué importan
3. Cómo darle instrucciones efectivas

---

## Slide S1-02: El mito de la IA

**Layout:** Big Statement
**H1:** "La IA no entiende"
**Support:** Solo predice patrones muy, muy bien

**Nota instructor:** Romper la idea de que hay "magia" o conciencia

---

## Slide S1-03: ¿Qué es un LLM?

**Layout:** Big Statement + Visual
**H1:** "Modelo de lenguaje"
**Support:** Predice el siguiente token basándose en los anteriores

**Visual:** Diagrama de secuencia: [Hola] → [mundo] → [!]

### Poll Interactivo
**Pregunta:** ¿Qué crees que hace GPT cuando le preguntas algo?

**Opciones:**
- A) Entiende el significado de las palabras
- B) Busca respuestas en una base de datos
- C) Predice la siguiente palabra más probable ✓
- D) Ejecuta reglas programadas tipo if/else

**Momento:** Antes de explicar, para generar curiosidad
**Duración:** 2 minutos

---

## Slide S1-04: La máquina de predicción

**Layout:** 2 Columnas
**Columna izquierda:**
```
Input: "El cielo es..."
Predicción: "azul" (78%)
            "hermoso" (12%)
            "infinito" (5%)
```

**Columna derecha:**
- No hay "pensamiento"
- Solo estadística avanzada
- Entrenado con billones de textos

---

## Slide S1-05: Tokens

**Layout:** Big Statement + Visual
**H1:** "Tokens"
**Support:** La unidad mínima que procesa el modelo

**Visual:** Palabra "automatización" dividida en bloques de colores:
`[auto] [mat] [ización]`

### Demo en Vivo: OpenAI Tokenizer
**URL:** https://platform.openai.com/tokenizer

**Pasos:**
1. Mostrar "Hola mundo" → 2 tokens
2. Mostrar "Hello world" → 2 tokens (menos caracteres)
3. Mostrar "automatización" → 4-5 tokens
4. Mostrar emoji 🤖 → múltiples tokens
5. Mostrar número "2024" → 1-2 tokens

**Punto clave:** Español usa más tokens que inglés para lo mismo

---

## Slide S1-06: ¿Por qué importan los tokens?

**Layout:** 3 Líneas
**Contenido:**
1. **Costo:** Pagas por token (input y output)
2. **Límite:** Hay un máximo de tokens por conversación
3. **Velocidad:** Más tokens = más tiempo de respuesta

---

## Slide S1-07: Ventana de Contexto

**Layout:** Visual Full
**Visual:** Barra horizontal representando la ventana

```
[Sistema] [Historial...] [Tu mensaje] [Respuesta]
|←————————— 128,000 tokens ——————————→|
```

**Support:** Todo lo que el modelo puede "ver" a la vez

### Mini Ejercicio Mental
**Pregunta:** Si 1 token ≈ 0.75 palabras, ¿cuántas páginas de Word caben en 128k tokens?

**Cálculo:**
- 128,000 tokens × 0.75 = 96,000 palabras
- 1 página ≈ 500 palabras
- 96,000 ÷ 500 = ~190 páginas

---

## Slide S1-08: El Problema del Contexto

**Layout:** 2 Columnas
**Columna izquierda - "Lost in the middle":**
- El modelo "olvida" información del medio
- Principio y final son más importantes
- Información crítica → al inicio o al final

**Columna derecha - Visual:**
Gráfico de atención en forma de U

---

## Slide S1-09: Stack de Mensajes

**Layout:** Visual Full
**Visual:** Stack vertical de mensajes

```
┌─────────────────────────────────┐
│ SISTEMA                         │
│ "Eres un asistente de ventas"   │
├─────────────────────────────────┤
│ USUARIO                         │
│ "¿Cuánto cuesta el plan pro?"   │
├─────────────────────────────────┤
│ ASISTENTE                       │
│ "El plan pro cuesta $99/mes..." │
├─────────────────────────────────┤
│ USUARIO                         │
│ "¿Incluye soporte?"             │
└─────────────────────────────────┘
```

**Nota:** Cada mensaje tiene un rol específico

---

## Slide S1-10: Roles de Mensajes

**Layout:** 3 Líneas

1. **Sistema:** Define personalidad y reglas (invisible para el usuario)
2. **Usuario:** Lo que escribe la persona (tú)
3. **Asistente:** Lo que responde el modelo (IA)

---

## Slide S1-11: Precisión del Lenguaje

**Layout:** 2 Columnas Comparación
**Título:** La diferencia está en el detalle

**Columna izquierda - "Vago":**
```
Escríbeme algo sobre
automatización
```
❌ Sin contexto
❌ Sin formato
❌ Sin audiencia

**Columna derecha - "Preciso":**
```
Escribe 3 beneficios de
automatizar emails de bienvenida
para ecommerce, en bullets de
1 línea, con tono profesional.
```
✓ Cantidad específica
✓ Tema concreto
✓ Formato definido
✓ Tono indicado

### Demo en Vivo: Comparación de Prompts
**Herramienta:** ChatGPT

**Pasos:**
1. Abrir ChatGPT en nueva conversación
2. Ejecutar prompt vago
3. Mostrar resultado genérico
4. Nueva conversación
5. Ejecutar prompt preciso
6. Comparar calidad y utilidad

**Duración demo:** 3 minutos

### Ejercicio: Reescribir Prompt
**Archivo:** `ejercicios/ejercicio-02-prompts.md`
**Duración:** 8 minutos

---

## Resumen del Módulo

**Layout:** 3 Líneas con iconos

1. 🔮 LLM = Predictor de texto (no pensador)
2. 📦 Tokens = Unidad de procesamiento y costo
3. 🎯 Precisión = Mejores resultados

---

## Transición

**Frase de cierre:**
> "Ahora que sabemos cómo 'piensan' los modelos, veamos cómo ponerlos a trabajar."

**Siguiente:** Módulo 2 - Automatizaciones

---

## Notas del Instructor

### Timing
- Intro y poll: 10 min
- Tokens + demo: 15 min
- Contexto: 10 min
- Stack mensajes: 10 min
- Precisión + demo + ejercicio: 15 min
- **Total:** 55 min (dejando 5 min de buffer)

### Tips
- El poll inicial es crucial para engagement
- El demo del tokenizer es visual y memorable
- Dejar que experimenten con el tokenizer durante el break

### Errores Comunes
- Asumir que saben qué es un token
- No dar suficiente tiempo para el ejercicio
- Olvidar mencionar el costo por token
