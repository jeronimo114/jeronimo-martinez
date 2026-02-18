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
