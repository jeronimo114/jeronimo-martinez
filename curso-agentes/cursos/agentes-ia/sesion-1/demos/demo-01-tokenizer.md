# Demo 1: OpenAI Tokenizer

## Información General

| Aspecto | Detalle |
|---------|---------|
| **Duración** | 5 minutos |
| **Módulo** | 1 - Fundamentos LLM |
| **Slide** | S1-05 |
| **URL** | https://platform.openai.com/tokenizer |

## Objetivo del Demo

Mostrar visualmente cómo los LLMs "ven" el texto, demostrando que no procesan palabras completas sino fragmentos llamados tokens.

---

## Preparación Pre-Demo

### Checklist
- [ ] Abrir URL del tokenizer en pestaña
- [ ] Seleccionar modelo GPT-4 (o más reciente)
- [ ] Zoom del navegador al 125% para visibilidad
- [ ] Limpiar cualquier texto previo

### Tener listo para copiar:
```
Hola mundo
Hello world
automatización
automation
🤖🎉
La inteligencia artificial está transformando el mundo
```

---

## Script del Demo

### Introducción (30 segundos)
> "Antes de que les muestre esto, quiero que piensen: ¿cómo creen que un modelo de lenguaje lee un texto? ¿Palabra por palabra? ¿Letra por letra?"
>
> "La respuesta les va a sorprender."

### Paso 1: Texto Simple en Español (1 minuto)

1. Escribir: `Hola mundo`
2. Mostrar los colores que separan tokens
3. Señalar: **"2-3 tokens para dos palabras simples"**

> "Fíjense cómo 'Hola' y 'mundo' son tokens separados. El modelo no lee letras, lee estos fragmentos."

### Paso 2: Comparar con Inglés (1 minuto)

1. Borrar y escribir: `Hello world`
2. Mostrar que son 2 tokens

> "En inglés, las mismas dos palabras son exactamente 2 tokens. El tokenizer está optimizado para inglés porque fue entrenado mayormente con texto en inglés."

### Paso 3: Palabra Compleja (1 minuto)

1. Escribir: `automatización`
2. Mostrar cómo se divide: `[auto][mat][iz][ación]` (aprox.)

> "Miren esta palabra. Lo que para nosotros es UNA palabra, para el modelo son CUATRO o CINCO fragmentos. Esto significa más costo y más tiempo de procesamiento."

3. Comparar con: `automation`
4. Mostrar que usa menos tokens

### Paso 4: Emojis (30 segundos)

1. Escribir: `🤖🎉`
2. Mostrar que cada emoji son múltiples tokens

> "Los emojis son sorprendentemente caros en tokens. Cada uno puede ser 2-3 tokens. Algo a considerar si van a procesar muchos mensajes con emojis."

### Paso 5: Oración Completa (1 minuto)

1. Escribir: `La inteligencia artificial está transformando el mundo`
2. Contar tokens totales
3. Señalar: **"Una oración simple ya son X tokens"**

> "Imaginen un documento de 10 páginas. Estamos hablando de miles de tokens. Por eso es importante entender esto cuando hablamos de costos y límites."

---

## Puntos Clave a Enfatizar

### Durante el Demo

1. **Tokens ≠ Palabras**
   > "El modelo no piensa en palabras como nosotros"

2. **Español es menos eficiente**
   > "Esto tiene implicaciones de costo si procesan mucho texto en español"

3. **Todo cuenta**
   > "Espacios, puntuación, emojis... todo son tokens"

### Para Cerrar

> "¿Por qué importa esto? Por tres razones:
> 1. **Costo** - Pagas por cada token, entrada y salida
> 2. **Límites** - Hay un máximo de tokens por conversación
> 3. **Velocidad** - Más tokens significa respuestas más lentas"

---

## Transición al Ejercicio

> "Ahora les toca a ustedes. Tienen 5 minutos para experimentar con el tokenizer. Quiero que descubran cuántos tokens tiene su nombre, y prueben al menos 3 textos diferentes."

---

## Troubleshooting

### Si la página no carga
- Tener backup: screenshot de la herramienta
- Alternativa: usar tiktoken en Python si hay acceso

### Si el modelo no está disponible
- Usar GPT-3.5 como alternativa
- Explicar que los tokenizers varían por modelo

### Si hay preguntas técnicas profundas
> "Excelente pregunta. Los tokenizers usan algoritmos como BPE (Byte Pair Encoding). Si les interesa el detalle técnico, puedo compartir recursos después de la sesión."

---

## Datos de Referencia

### Tokens Aproximados por Idioma

| Texto | Español | Inglés |
|-------|---------|--------|
| "Hola" | 1-2 | N/A |
| "Hello" | N/A | 1 |
| "automatización" | 4-5 | N/A |
| "automation" | 2-3 | 2-3 |
| Párrafo de 100 palabras | ~150 tokens | ~120 tokens |

### Regla General
- 1 token ≈ 4 caracteres en inglés
- 1 token ≈ 3 caracteres en español
- 1 token ≈ 0.75 palabras

---

## Notas del Instructor

### Timing Detallado
- Intro: 0:30
- Texto simple: 1:00
- Comparación idiomas: 1:00
- Palabra compleja: 1:00
- Emojis: 0:30
- Oración + cierre: 1:00
- **Total: 5 minutos**

### Engagement
- Hacer preguntas retóricas
- Pedir que adivinen tokens antes de mostrar
- Reaccionar a los "¡wow!" del público

### Errores a Evitar
- No pasar demasiado rápido
- No asumir que entienden JSON
- No profundizar en BPE (fuera de scope)
