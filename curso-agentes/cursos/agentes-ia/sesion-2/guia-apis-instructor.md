# Guia APIs - Instructor (Sesion 2)

Documento interno con el paso a paso de cada API para la seccion de Herramientas.
Orden: de mas simple a mas compleja.

---

## API 1: Cat Facts

**URL:** `https://catfact.ninja/fact`
**Metodo:** GET
**Headers:** Ninguno
**Auth:** No requiere

### Respuesta JSON de ejemplo

```json
{
  "fact": "An adult lion's roar can be heard up to five miles (eight kilometers) away.",
  "length": 75
}
```

### Configuracion en n8n (HTTP Request Tool)

| Campo | Valor |
|-------|-------|
| URL | `https://catfact.ninja/fact` |
| Method | GET |
| Headers | (ninguno) |
| Description | `Gets a random cat fact` |

### Prueba

- **Pregunta:** "Dime un dato curioso de gatos"
- **Resultado esperado:** El agente llama la API y responde con un dato diferente cada vez
- **Verificar:** En los logs de ejecucion aparece la llamada HTTP con status 200

### Problemas comunes

- **No aparece el dato:** Verificar que la URL no tiene espacios extra
- **El agente no llama la API:** Revisar que la Description del tool mencione "cat" o "fact"

---

## API 2: Chuck Norris

**URL:** `https://api.chucknorris.io/jokes/random`
**Metodo:** GET
**Headers:** Ninguno
**Auth:** No requiere

### Respuesta JSON de ejemplo

```json
{
  "categories": [],
  "created_at": "2020-01-05 13:42:24.142371",
  "icon_url": "https://api.chucknorris.io/img/avatar/chuck-norris.png",
  "id": "c9Je5kHyQpWJSDF01Ss2DQ",
  "updated_at": "2020-01-05 13:42:24.142371",
  "url": "https://api.chucknorris.io/jokes/c9Je5kHyQpWJSDF01Ss2DQ",
  "value": "Chuck Norris once had an interim job at Denny's. Not because he couldn't get a better job, because of his ability to unscramble an egg."
}
```

### Configuracion en n8n (HTTP Request Tool)

| Campo | Valor |
|-------|-------|
| URL | `https://api.chucknorris.io/jokes/random` |
| Method | GET |
| Headers | (ninguno) |
| Description | `Gets a random Chuck Norris joke` |

### Prueba

- **Pregunta:** "Cuentame un chiste de Chuck Norris"
- **Resultado esperado:** El agente extrae el campo `value` y responde con el chiste
- **Verificar:** Cada ejecucion devuelve un chiste diferente

### Problemas comunes

- **El agente responde con todo el JSON:** Agregar al System Prompt "Cuando uses herramientas, extrae solo la informacion relevante"
- **Respuesta muy larga:** El JSON tiene muchos campos; el agente deberia ignorar los que no son `value`

---

## API 3: Dog Photos

**URL:** `https://dog.ceo/api/breeds/image/random`
**Metodo:** GET
**Headers:** Ninguno
**Auth:** No requiere

### Respuesta JSON de ejemplo

```json
{
  "message": "https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg",
  "status": "success"
}
```

### Configuracion en n8n (HTTP Request Tool)

| Campo | Valor |
|-------|-------|
| URL | `https://dog.ceo/api/breeds/image/random` |
| Method | GET |
| Headers | (ninguno) |
| Description | `Gets a random dog photo URL` |

### Prueba

- **Pregunta:** "Mandame una foto de un perro"
- **Resultado esperado:** El agente devuelve la URL de la imagen del campo `message`
- **Verificar:** La URL abre una imagen real de un perro en el navegador

### Problemas comunes

- **La imagen no se muestra en el chat:** Normal en el chat de n8n, solo se ve como URL. En Telegram si se mostraria como imagen
- **El agente no la usa:** Verificar que la Description mencione "dog" o "photo"

---

## API 4: Useless Facts

**URL:** `https://uselessfacts.jsph.pl/api/v2/facts/random`
**Metodo:** GET
**Headers:** Ninguno
**Auth:** No requiere

### Respuesta JSON de ejemplo

```json
{
  "id": "c01bf758ee8d660eb67700619a057a5c",
  "text": "Every acre of American crops harvested contains 100 pounds of insects.",
  "source": "djtech.net",
  "source_url": "http://www.djtech.net/humor/useless_facts.htm",
  "language": "en",
  "permalink": "https://uselessfacts.jsph.pl/api/v2/facts/c01bf758ee8d660eb67700619a057a5c"
}
```

### Configuracion en n8n (HTTP Request Tool)

| Campo | Valor |
|-------|-------|
| URL | `https://uselessfacts.jsph.pl/api/v2/facts/random` |
| Method | GET |
| Headers | (ninguno) |
| Description | `Gets a random useless fun fact` |

### Prueba

- **Pregunta:** "Dime un dato curioso"
- **Resultado esperado:** El agente extrae el campo `text` y responde con el dato
- **Verificar:** El dato viene en ingles; el agente deberia traducirlo si el System Prompt dice "responde en espanol"

### Problemas comunes

- **Dato en ingles:** El agente lo traduce automaticamente si el System Prompt indica responder en espanol
- **URL larga confunde:** Copiar la URL exacta sin espacios

---

## API 5: Bored API

**URL:** `https://bored-api.appbrewery.com/random`
**Metodo:** GET
**Headers:** Ninguno
**Auth:** No requiere

### Respuesta JSON de ejemplo

```json
{
  "activity": "Listen to a new music genre",
  "availability": 0,
  "type": "music",
  "participants": 1,
  "price": 0,
  "accessibility": "Few to no challenges",
  "duration": "minutes",
  "kidFriendly": true,
  "link": "",
  "key": "4708863"
}
```

### Configuracion en n8n (HTTP Request Tool)

| Campo | Valor |
|-------|-------|
| URL | `https://bored-api.appbrewery.com/random` |
| Method | GET |
| Headers | (ninguno) |
| Description | `Suggests a random activity when bored` |

### Prueba

- **Pregunta:** "Estoy aburrido, que puedo hacer?"
- **Resultado esperado:** El agente responde con la actividad del campo `activity`, opcionalmente mencionando tipo y participantes
- **Verificar:** El agente elige esta herramienta cuando el usuario dice "aburrido" o pide sugerencias

### Problemas comunes

- **El agente no la elige:** La Description debe incluir "bored" o "activity" para que el agente la asocie con el tema
- **Mucha metadata:** El agente deberia extraer solo `activity`, `type` y `participants`

---

## API 6: Dad Jokes (icanhazdadjoke)

**URL:** `https://icanhazdadjoke.com/`
**Metodo:** GET
**Headers:** `Accept: application/json` (REQUERIDO)
**Auth:** No requiere

### Respuesta JSON de ejemplo

```json
{
  "id": "ucxPZDAlGlb",
  "joke": "If two vegans are having an argument, is it still considered beef?",
  "status": 200
}
```

### Configuracion en n8n (HTTP Request Tool)

| Campo | Valor |
|-------|-------|
| URL | `https://icanhazdadjoke.com/` |
| Method | GET |
| Headers | Name: `Accept`, Value: `application/json` |
| Description | `Gets a random dad joke` |

**Como agregar el header en n8n:**
1. Abrir el nodo HTTP Request Tool
2. Ir a la seccion **Options** (abajo del todo)
3. Click en **Add Option** → **Headers**
4. Name: `Accept`
5. Value: `application/json`

### Prueba

- **Pregunta:** "Cuentame un chiste"
- **Resultado esperado:** El agente extrae el campo `joke` y responde con el chiste
- **Verificar:** Si no se agrega el header, la API devuelve texto plano en vez de JSON

### Problemas comunes

- **Respuesta en texto plano (no JSON):** Falta el header `Accept: application/json`. Es el error mas comun
- **"Cannot parse JSON":** Mismo problema, falta el header
- **Donde estan los headers?** Options → Add Option → Headers (no confundir con Body)

---

## API 7: ZenQuotes

**URL:** `https://zenquotes.io/api/random`
**Metodo:** GET
**Headers:** Ninguno
**Auth:** No requiere

### Respuesta JSON de ejemplo

```json
[
  {
    "q": "Love is the expression of one's values.",
    "a": "Ayn Rand",
    "h": "<blockquote>...</blockquote>"
  }
]
```

### Configuracion en n8n (HTTP Request Tool)

| Campo | Valor |
|-------|-------|
| URL | `https://zenquotes.io/api/random` |
| Method | GET |
| Headers | (ninguno) |
| Description | `Gets a random inspirational quote` |

### Prueba

- **Pregunta:** "Dame una frase motivacional"
- **Resultado esperado:** El agente extrae `q` (frase) y `a` (autor), y responde tipo: "La frase..." - Autor
- **Verificar:** La respuesta es un array `[{...}]`, no un objeto directo

### Problemas comunes

- **El agente muestra el HTML (`h`):** Normal, agregar al System Prompt "ignora campos HTML"
- **Respuesta rara con brackets:** La respuesta es un array. El agente maneja esto bien, pero si hay problemas, indicar en la Description: "Returns an array with one quote object containing q (quote) and a (author)"

---

## API 8: Open-Meteo (Clima)

**URL:** `https://api.open-meteo.com/v1/forecast?latitude=40.45&longitude=-3.7&current_weather=true`
**Metodo:** GET
**Headers:** Ninguno
**Auth:** No requiere
**Coordenadas default:** Madrid (ESIC)

### Respuesta JSON de ejemplo

```json
{
  "latitude": 40.4375,
  "longitude": -3.6875,
  "current_weather_units": {
    "temperature": "°C",
    "windspeed": "km/h"
  },
  "current_weather": {
    "time": "2026-02-18T13:45",
    "temperature": 10.7,
    "windspeed": 20.2,
    "winddirection": 231,
    "is_day": 1,
    "weathercode": 3
  }
}
```

### Configuracion en n8n (HTTP Request Tool)

| Campo | Valor |
|-------|-------|
| URL | `https://api.open-meteo.com/v1/forecast?latitude=40.45&longitude=-3.7&current_weather=true` |
| Method | GET |
| Headers | (ninguno) |
| Description | `Gets current weather for Madrid. Returns temperature in Celsius and wind speed in km/h` |

### Prueba

- **Pregunta:** "Como esta el clima en Madrid?"
- **Resultado esperado:** El agente extrae `current_weather.temperature` y `current_weather.windspeed` y responde algo como "En Madrid hace 10.7°C con viento de 20 km/h"
- **Verificar:** Los datos son en tiempo real, asi que la temperatura deberia ser razonable para la fecha

### Coordenadas de ciudades utiles

| Ciudad | Latitude | Longitude |
|--------|----------|-----------|
| Madrid | 40.45 | -3.7 |
| Barcelona | 41.39 | 2.17 |
| Bogota | 4.71 | -74.07 |
| Medellin | 6.25 | -75.56 |
| CDMX | 19.43 | -99.13 |
| Buenos Aires | -34.61 | -58.38 |

### Problemas comunes

- **JSON muy largo:** La respuesta completa incluye timezone, elevation, etc. El agente deberia extraer solo `current_weather`
- **Weathercode confuso:** Es un codigo WMO numerico (0=despejado, 1-3=nublado, etc.). El agente puede interpretarlo si se le indica en la Description
- **Query params se pierden:** Asegurarse de copiar la URL completa incluyendo `?latitude=...&longitude=...&current_weather=true`
- **No funciona para otra ciudad:** Hay que cambiar las coordenadas en la URL. Opcion avanzada: dejar la URL sin coordenadas y que el agente las construya

---

## Resumen rapido

| # | API | URL | Dificultad | Nota clave |
|---|-----|-----|-----------|------------|
| 1 | Cat Facts | `catfact.ninja/fact` | Facil | 2 campos |
| 2 | Chuck Norris | `api.chucknorris.io/jokes/random` | Facil | Campo `value` |
| 3 | Dog Photos | `dog.ceo/api/breeds/image/random` | Facil | Devuelve URL imagen |
| 4 | Useless Facts | `uselessfacts.jsph.pl/api/v2/facts/random` | Facil | Campo `text` |
| 5 | Bored API | `bored-api.appbrewery.com/random` | Facil | Campo `activity` + metadata |
| 6 | Dad Jokes | `icanhazdadjoke.com/` | Media | Requiere header Accept |
| 7 | ZenQuotes | `zenquotes.io/api/random` | Media | Respuesta es array |
| 8 | Open-Meteo | `api.open-meteo.com/v1/forecast?...` | Media | Query params, JSON anidado |

---

## Arquitectura del Chatbot Final

### Vision: "Tu chatbot personalizado"

Cada alumno elige su tema y conecta las APIs que quiera. El instructor construye uno en vivo como demo.

### Arquitectura (nodos n8n):

```
[Chat Trigger] --> [AI Agent (Tools Agent)] --> respuesta automatica
                         |         |         |
                   [OpenAI Chat  [Simple    [Tools...]
                    Model]       Memory]
```

### Nodos exactos

| Nodo | Tipo | Configuracion clave |
|------|------|---------------------|
| When chat message received | Trigger | Default, sin cambios |
| AI Agent | Root node (Tools Agent) | System prompt personalizado |
| OpenAI Chat Model | Sub-nodo modelo | gpt-4o-mini (barato y rapido) |
| Simple Memory | Sub-nodo memoria | Window size: 10 mensajes |
| Calculator | Sub-nodo tool | Sin config adicional |
| HTTP Request Tool | Sub-nodo tool (x2-3) | Una instancia por API |

### Construccion en vivo - orden de pasos

**Paso 1: Chat basico (3 nodos)**
- Chat Trigger → AI Agent → (respuesta)
- Conectar OpenAI Chat Model al Agent
- Probar: "Hola, como estas?"
- Resultado: El bot responde pero sin personalidad ni memoria

**Paso 2: System Prompt (personalidad)**
- Abrir AI Agent → escribir system prompt
- Ejemplo: "Eres un asistente amigable que habla espanol. Eres experto en [tema]. Respondes de forma concisa y con humor."
- Probar: misma pregunta → respuesta con personalidad
- Resultado: El bot tiene personalidad pero no recuerda

**Paso 3: Memoria**
- Agregar Simple Memory → conectar al puerto Memory del Agent
- Probar: "Me llamo Carlos" → luego "Como me llamo?"
- Resultado: El bot recuerda la conversacion

**Paso 4: Calculator**
- Agregar Calculator → conectar al puerto Tool
- Probar: "Cuanto es 1547 x 23 + 189?"
- Resultado: Respuesta exacta (35,770)

**Paso 5: Primera API (HTTP Request Tool)**
- Agregar HTTP Request Tool → conectar al puerto Tool
- Configurar con Cat Facts: URL, GET, description "Gets a random cat fact"
- Probar: "Dime un dato curioso de gatos"
- Resultado: El agente llama la API y responde con el dato

**Paso 6: Segunda API**
- Agregar otro HTTP Request Tool
- Configurar con Open-Meteo (clima Madrid)
- Probar: "Como esta el clima?"
- Resultado: El agente usa la API correcta segun la pregunta

**Paso 7: Test completo**
- Probar combinaciones: "Dime un dato de gatos y luego el clima"
- Verificar que el agente elige las tools correctas
- Verificar que la memoria funciona entre turnos

### Bonus: Telegram (si hay tiempo)

```
[Telegram Trigger] --> [AI Agent] --> [Telegram: Send Message]
                            |      |      |
                      [OpenAI]  [Memory]  [Tools...]
```

Cambios vs Chat Trigger:
- Reemplazar Chat Trigger por Telegram Trigger
- Agregar nodo Telegram "Send Message" al final
- En Memory: sessionId = `{{ $json.message.chat.id }}`
- Requiere: crear bot en BotFather, obtener token
