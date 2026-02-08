# Ejercicio 1: Contando Tokens

## Información General

| Aspecto | Detalle |
|---------|---------|
| **Duración** | 5 minutos |
| **Módulo** | 1 - Fundamentos LLM |
| **Slide** | S1-05 |
| **Herramienta** | OpenAI Tokenizer |

## Objetivo

Entender cómo el modelo "ve" el texto y por qué los tokens importan.

---

## Instrucciones para Estudiantes

### Paso 1: Abrir el Tokenizer
1. Ir a: **https://platform.openai.com/tokenizer**
2. Seleccionar modelo: **GPT-4** (o el más reciente)

### Paso 2: Experimentar con Textos

Escribe cada uno de estos textos y anota cuántos tokens tiene:

| Texto | Tokens (anota aquí) |
|-------|---------------------|
| `Hola mundo` | ___ |
| `Hello world` | ___ |
| Tu nombre completo | ___ |
| `automatización` | ___ |
| `automation` | ___ |
| Un emoji (ej: 🤖) | ___ |
| `12345` | ___ |

### Paso 3: Descubrimientos

Responde mentalmente:
1. ¿Por qué "Hola mundo" y "Hello world" tienen diferente cantidad de tokens?
2. ¿Por qué un emoji usa varios tokens?
3. ¿Qué pasa con los números?

---

## Soluciones Esperadas

| Texto | Tokens Aproximados | Explicación |
|-------|-------------------|-------------|
| `Hola mundo` | 2-3 | Español usa más tokens |
| `Hello world` | 2 | Inglés más eficiente |
| Nombre típico | 3-6 | Depende del nombre |
| `automatización` | 4-5 | Palabra larga, acentos |
| `automation` | 2-3 | Inglés más compacto |
| 🤖 | 2-3 | Emojis son varios tokens |
| `12345` | 1-2 | Números son eficientes |

---

## Puntos de Discusión

### Para compartir con el grupo:

1. **¿Por qué español usa más tokens?**
   - El tokenizer está optimizado para inglés
   - Palabras más largas en español
   - Acentos y caracteres especiales

2. **Implicaciones prácticas:**
   - Costo: Pagas por token (input + output)
   - Límites: Contexto tiene máximo de tokens
   - Velocidad: Más tokens = más tiempo

3. **Tip profesional:**
   - Si el costo importa, prompts en inglés son más económicos
   - Pero la calidad puede ser mejor en el idioma del contexto

---

## Extensión (Opcional)

Para los que terminen antes:

1. **Prueba una oración completa:**
   ```
   "La automatización de procesos mejora la eficiencia empresarial."
   ```
   vs
   ```
   "Process automation improves business efficiency."
   ```

2. **Prueba código:**
   ```python
   def hello():
       return "Hello"
   ```

3. **Prueba JSON:**
   ```json
   {"name": "Juan", "age": 30}
   ```

---

## Checkpoint

**¿Cómo sé que completé el ejercicio?**
- [ ] Abrí el tokenizer
- [ ] Probé al menos 5 textos diferentes
- [ ] Entiendo por qué español usa más tokens
- [ ] Sé dónde buscar cuántos tokens usa mi texto

---

## Notas para el Instructor

### Timing
- Instrucción: 1 min
- Experimentación: 3 min
- Discusión: 1 min

### Posibles Problemas
- El tokenizer puede tardar en cargar
- Algunos navegadores bloquean cookies (necesarias para OpenAI)

### Preguntas Frecuentes
- **"¿Por qué mi nombre tiene tantos tokens?"** - Nombres no están en el vocabulario base
- **"¿Los tokens son iguales en todos los modelos?"** - No, cada modelo tiene su tokenizer
