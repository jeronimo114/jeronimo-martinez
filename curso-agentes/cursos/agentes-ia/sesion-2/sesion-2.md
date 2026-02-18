# Audiencia
Estudiantes de ESIC que voluntariamente quieren asistir al curso de Agentes de IA

# Objetivo
Comunicarle a los estudiantes qué cómo desarrollar un Chatbot completo con agentes
de Inteligencia Artificial

Cómo resultado de esta presentacion, los estudiantes de esic que
voluntariamente se inscribieron al curso de agentes puedan desarrollar su chatbot
completo

# Chatbot Final - Arquitectura

## Vision
"Tu chatbot personalizado" - cada alumno elige su tema y conecta las APIs que quiera.
El instructor construye uno en vivo como demo.

## Nodos n8n

```
[Chat Trigger] --> [AI Agent (Tools Agent)] --> respuesta automatica
                         |         |         |
                   [OpenAI Chat  [Simple    [Tools...]
                    Model]       Memory]
```

- **Chat Trigger:** Recibe mensajes del usuario
- **AI Agent (Tools Agent):** Cerebro del chatbot, con system prompt personalizado
- **OpenAI Chat Model:** gpt-4o-mini (barato y rapido)
- **Simple Memory:** Window size 10 mensajes, mantiene contexto
- **Calculator:** Matematicas exactas
- **HTTP Request Tool (x2-3):** Una instancia por API conectada

## Pasos de construccion en vivo

1. **Chat basico:** Chat Trigger + AI Agent + OpenAI Model → probar "Hola"
2. **System Prompt:** Escribir personalidad del agente → probar tono
3. **Memoria:** Agregar Simple Memory → probar "Me llamo X" / "Como me llamo?"
4. **Calculator:** Agregar Calculator → probar "1547 x 23 + 189?"
5. **Primera API:** HTTP Request Tool con Cat Facts → probar "Dato de gatos"
6. **Segunda API:** HTTP Request Tool con Open-Meteo → probar "Clima en Madrid?"
7. **Test completo:** Combinaciones de preguntas, verificar tool selection y memoria

## APIs disponibles (8 total)

1. Cat Facts - `catfact.ninja/fact`
2. Chuck Norris - `api.chucknorris.io/jokes/random`
3. Dog Photos - `dog.ceo/api/breeds/image/random`
4. Useless Facts - `uselessfacts.jsph.pl/api/v2/facts/random`
5. Bored API - `bored-api.appbrewery.com/random`
6. Dad Jokes - `icanhazdadjoke.com/` (requiere header Accept: application/json)
7. ZenQuotes - `zenquotes.io/api/random` (respuesta es array)
8. Open-Meteo - `api.open-meteo.com/v1/forecast?latitude=40.45&longitude=-3.7&current_weather=true`

## Bonus: Telegram

Si hay tiempo, reemplazar Chat Trigger por Telegram Trigger + nodo Send Message.
Requiere crear bot en BotFather y obtener token.
En Memory: sessionId = `{{ $json.message.chat.id }}`

---

## 4 Tipos de Chatbots - Guías y Videos

Cada estudiante puede elegir entre 4 tipos de chatbots, todos con la misma arquitectura base pero casos de negocio diferentes.

### Arquitectura Base (Común a todos)

```
[Telegram Trigger] → [AI Agent (Tools Agent)]
                    ↓
          [System Prompt personalizado]
                    ↓
          [Simple Memory] (window size 10)
                    ↓
    [Calculator Tool] + [HTTP Request Tool]
                    ↓
            [Respuesta por Telegram]
```

### 🍽️ 1. Bot de Reservas (Restaurantes/Eventos)

**Caso de negocio:** Reservas de mesas, citas y eventos en tiempo real.

**Herramientas:**
- Calculator: Calcular precio total de reserva (ej: 4 personas × $35)
- HTTP Request: API Open-Meteo para consultar clima antes de reservar

**Guía paso a paso:** `guia-bot-reservas.html`

**System Prompt:**
```
Eres ReservaBot, asistente de reservas de restaurantes y eventos.
- Idioma: español
- Tono: amable, profesional y servicial
- NUNCA reserves sin confirmar antes
```

---

### 🛒️ 2. Bot de E-commerce (Soporte al cliente)

**Caso de negocio:** Estado de pedidos, stock de productos, descuentos.

**Herramientas:**
- Calculator: Calcular precios con descuentos (ej: 15% para nuevos clientes)
- HTTP Request: Consultar stock de productos (JSON simulado)

**Guía paso a paso:** `guia-bot-ecommerce.html`

**System Prompt:**
```
Eres ECommerceBot, especialista en productos de nuestra tienda online.
- Idioma: español
- Tono: empático, paciente y resolutivo
- Aplica descuento del 15% para nuevos clientes
```

---

### 📚️ 3. Bot Educativo (Tutorías personalizadas)

**Caso de negocio:** Explicar conceptos, ejercicios, tracking de progreso.

**Herramientas:**
- Calculator: Calcular horas totales del curso (ej: 4 módulos × 3h = 12h)
- HTTP Request: Consultar temario y nivel de cursos (JSON)

**Guía paso a paso:** `guia-bot-educativo.html`

**System Prompt:**
```
Eres TutorBot, tutor personalizado de cursos de programación y tecnología.
- Idioma: español
- Tono: paciente, motivador, claro y pedagógico
- Ofrece ánimo y motivación constante
```

---

### 🎲️ 4. Bot de Entretenimiento (Diversión ligera)

**Caso de negocio:** Datos curiosos, chistes, gatitos, diversión.

**Herramientas:**
- Calculator: Calcular streak de días consecutivos
- HTTP Request: Cat Facts API (GRATUITA sin autenticación)

**Guía paso a paso:** `guia-bot-entretenimiento.html`

**System Prompt:**
```
Eres FunBot, bot de entretenimiento y curiosidades.
- Idioma: español
- Tono: divertido, casual, entusiasta
- Siempre usa emojis 🎉😂🤣😆
- Cambia de tema cada 3-4 mensajes
```

---

### Cómo elegir tu chatbot

1. **Bot de Reservas:** Si te interesa el sector restaurantero o eventos
2. **Bot de E-commerce:** Si te interesa retail y soporte al cliente
3. **Bot Educativo:** Si te interesa educación y formación
4. **Bot de Entretenimiento:** Si quieres crear algo divertido y casual

### Videos Showcase

Cada tipo de chatbot tiene un video showcase de 60 segundos que muestra:
- Arquitectura del chatbot
- System Prompt en acción
- Herramientas (Calculator + HTTP Request)
- Demo en vivo

**Enlaces a videos:**
- Bot de Reservas: [Ver video](#)
- Bot de E-commerce: [Ver video](#)
- Bot Educativo: [Ver video](#)
- Bot de Entretenimiento: [Ver video](#)

### Nodos n8n Nativos Utilizados

✅ Telegram Trigger (punto de entrada - dinamismo en clase)
✅ Chat/AI Agent (cerebro con system prompt)
✅ Simple Memory (window buffer - mantiene contexto)
✅ Calculator (herramienta nativa - matemáticas)
✅ HTTP Request (herramienta nativa - APIs externas)
✅ OpenAI Chat Model (gpt-4o-mini - barato y rápido)

### Ventajas de esta arquitectura

1. **Misma arquitectura** → Los estudiantes aprenden una vez
2. **Casos de negocio reales** → Cada uno aplica a diferentes sectores
3. **Solo nodos nativos** → Sin complejidades, HTTP requests mínimos
4. **Telegram优先** → Dinamismo en clase, feedback instantáneo
5. **Videos impresionantes** → Estilo startup >$1B USD
