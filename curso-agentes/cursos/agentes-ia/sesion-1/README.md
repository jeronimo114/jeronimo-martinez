# Sesión 1: Fundamentos de LLM + Automatización

## Descripción

Primera sesión del curso de Agentes de IA. Introduce los conceptos fundamentales de cómo funcionan los LLMs, qué son las automatizaciones, y proporciona experiencia práctica con n8n.

## Objetivos de Aprendizaje

Al finalizar esta sesión, los estudiantes podrán:

1. **Explicar** qué es un LLM y sus limitaciones principales
2. **Entender** tokens, ventana de contexto e instrucciones
3. **Navegar** n8n y crear un workflow básico
4. **Conectar** Gmail y Google Sheets en un workflow
5. **Debuggear** una ejecución fallida

## Estructura (4.5 horas)

| Bloque | Contenido | Duración | Acumulado |
|--------|-----------|----------|-----------|
| **Apertura** | Portada, instructor, agenda, icebreaker | 20 min | 0:20 |
| **Módulo 1** | Fundamentos LLM + Poll + Ejercicio tokens | 55 min | 1:15 |
| **Break 1** | Descanso + networking | 15 min | 1:30 |
| **Módulo 2** | Automatizaciones + Actividad grupal | 35 min | 2:05 |
| **Módulo 3** | Intro n8n + Demo + Ejercicio workflow | 50 min | 2:55 |
| **Break 2** | Descanso | 15 min | 3:10 |
| **Proyecto** | Gmail a Sheets (guiado + autónomo) | 60 min | 4:10 |
| **Cierre** | Checklist, Q&A, preview sesión 2 | 20 min | 4:30 |

## Contenido por Módulo

### Módulo 1: LLM por Dentro (55 min)
- Qué es un modelo de lenguaje
- Tokens y tokenización
- Ventana de contexto
- Stack de mensajes (sistema/usuario/asistente)
- Precisión del lenguaje

**Demo:** OpenAI Tokenizer
**Ejercicio:** Contar tokens

### Módulo 2: Automatizaciones (35 min)
- Qué es una automatización
- Trigger → Acción
- Ejemplos reales
- Automatización vs IA vs Agentes

**Actividad:** Compartir tareas repetitivas

### Módulo 3: Introducción a n8n (50 min)
- Qué es n8n
- Canvas y nodos
- Datos en JSON
- Items y flujo de datos

**Demo:** Primer workflow
**Ejercicio:** Crear workflow básico

### Proyecto: Email a Sheets (60 min)
- Conectar Gmail
- Conectar Google Sheets
- Configurar trigger
- Mapear datos
- Activar y probar

## Materiales

### Archivos de Contenido
- `contenido/01-fundamentos-llm.md`
- `contenido/02-automatizaciones.md`
- `contenido/03-introduccion-n8n.md`
- `contenido/04-proyecto-email-sheets.md`

### Ejercicios
- `ejercicios/ejercicio-01-tokens.md`
- `ejercicios/ejercicio-02-prompts.md`
- `ejercicios/ejercicio-03-workflow.md`

### Demos
- `demos/demo-01-tokenizer.md`
- `demos/demo-02-prompts.md`
- `demos/demo-03-n8n-basico.md`
- `demos/demo-04-gmail-sheets.md`

### Notas del Instructor
- `notas-instructor/guia-sesion.md`
- `notas-instructor/preguntas-frecuentes.md`

## Interacción

### Polls (5)
1. "¿Qué crees que hace un LLM?" (S1-03)
2. "¿Cuántos tokens tiene tu nombre?" (S1-05)
3. "¿Cuál de estas tareas automatizarías?" (S1-15)
4. "¿Qué tan cómodo te sientes con n8n?" (S1-20)
5. "¿Completaste el proyecto?" (S1-36)

### Ejercicios Hands-on (4)
1. Tokenizer (5 min)
2. Reescribir prompt (8 min)
3. Primer workflow n8n (15 min)
4. Proyecto Gmail→Sheets (35 min)

## Requisitos

### Instructor
- [ ] Presentación HTML funcionando
- [ ] Cuenta n8n con credenciales Gmail/Sheets
- [ ] Polls configurados en Mentimeter
- [ ] Email de prueba listo

### Estudiantes
- [ ] Laptop con navegador
- [ ] Cuenta Google
- [ ] Cuenta n8n cloud
- [ ] Celular para polls

## Proyecto Final: Gmail → Google Sheets

**Objetivo:** Workflow que registra automáticamente emails en una hoja de cálculo.

**Resultado esperado:**
- Gmail Trigger configurado
- Google Sheets conectado
- Campos mapeados (Remitente, Asunto, Fecha)
- Workflow activo y funcionando

---

*Duración total: 4.5 horas | Slides: 40+ | Dificultad: Introductoria*
