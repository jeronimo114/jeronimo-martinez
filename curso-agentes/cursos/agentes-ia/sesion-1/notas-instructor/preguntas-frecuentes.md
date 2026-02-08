# Preguntas Frecuentes - Sesión 1

## Sobre LLMs

### "¿Por qué dices que la IA no entiende?"
> Los LLMs son modelos estadísticos. Predicen qué texto es más probable que siga basándose en patrones aprendidos. No hay comprensión semántica como la nuestra. Un ejemplo: si le preguntas "¿cuántas letras R tiene 'strawberry'?", muchos modelos fallan porque no "ven" letras, ven tokens.

### "¿Cuál es la diferencia entre GPT, Claude, Gemini, etc.?"
> Todos son LLMs pero de diferentes empresas (OpenAI, Anthropic, Google). Las diferencias están en:
> - Tamaño del modelo
> - Datos de entrenamiento
> - Fine-tuning y alineación
> - Ventana de contexto
> - Costo
>
> Para automatizaciones, la mayoría funcionan bien. Nosotros usaremos OpenAI porque es el más común y n8n lo integra fácilmente.

### "¿Por qué español usa más tokens que inglés?"
> El tokenizer de GPT fue entrenado mayoritariamente con texto en inglés. Por eso palabras inglesas comunes son tokens completos, mientras que palabras en español se dividen en subpalabras. Es una limitación conocida que afecta costo y eficiencia.

### "¿Cuánto cuesta usar GPT?"
> Depende del modelo y uso:
> - GPT-4o: ~$5/millón de tokens input, ~$15/millón output
> - GPT-4o-mini: ~$0.15/millón input, ~$0.60/millón output
> - Para workflows típicos: centavos por día
>
> n8n incluye créditos en planes pagos, pero puedes usar tu propia API key.

### "¿Qué pasa si el modelo 'alucina'?"
> Las alucinaciones ocurren cuando el modelo genera información falsa con confianza. Para minimizarlas:
> - Dar contexto específico
> - Pedir que cite fuentes
> - Verificar información crítica
> - Usar para tareas donde se puede validar el output

---

## Sobre n8n

### "¿Por qué n8n y no Zapier?"
> n8n tiene varias ventajas para este curso:
> - **Tier gratuito generoso:** 2,500 ejecuciones/mes
> - **Open source:** Puedes self-hostear sin límites
> - **Nodos de IA nativos:** Integración directa con OpenAI, Claude, etc.
> - **Más flexible:** Puedes escribir código si necesitas
> - **Comunidad activa:** Muchos templates y ayuda
>
> Zapier es excelente pero es más caro y menos flexible para flujos complejos.

### "¿Cuánto cuesta n8n?"
> - **Cloud gratuito:** 2,500 ejecuciones/mes
> - **Cloud Pro:** ~$20/mes, 10,000 ejecuciones
> - **Self-hosted:** Gratis (pagas solo servidor ~$5-10/mes)
>
> Para aprender y prototipar, el tier gratuito es suficiente.

### "¿Puedo usar n8n con Outlook/Microsoft?"
> Sí, n8n tiene nodos para:
> - Microsoft Outlook
> - Microsoft 365
> - Microsoft Teams
> - OneDrive
> - Excel Online
>
> El proceso de configuración es similar pero usa OAuth de Microsoft.

### "¿Qué pasa con mis datos en n8n Cloud?"
> - Los datos se procesan pero no se almacenan permanentemente
> - Las credenciales están encriptadas
> - Puedes self-hostear si necesitas control total
> - Cumple con GDPR si usas servidores EU

### "¿Puedo usar n8n sin programar?"
> Sí, 100%. Todo es visual. Solo para casos muy avanzados necesitarías escribir código, y aun así n8n tiene nodos de código que simplifican mucho.

---

## Sobre el Proyecto Gmail → Sheets

### "¿Por qué tarda 1-2 minutos en detectar emails nuevos?"
> Es el intervalo de polling de n8n Cloud. El trigger revisa Gmail periódicamente, no en tiempo real. Opciones:
> - Esperar (es normal)
> - Upgrade a plan pago (intervalos más cortos)
> - Self-hosted (puedes configurar intervalos)
> - Usar webhook (más complejo, para cursos avanzados)

### "¿Puedo filtrar solo emails de cierto remitente?"
> Sí, hay dos formas:
> 1. **En Gmail:** Crear etiqueta + filtro, luego filtrar por etiqueta en n8n
> 2. **En n8n:** Agregar nodo IF después del trigger con condición sobre `from.value[0].address`

### "¿Qué pasa si el workflow falla?"
> El email no se pierde. Puedes:
> 1. Ir a Executions
> 2. Ver la ejecución fallida
> 3. Identificar el error
> 4. Arreglarlo
> 5. Re-ejecutar esa ejecución específica

### "¿Puedo leer el cuerpo del email?"
> Sí, está en:
> - `$json.text` (texto plano)
> - `$json.html` (HTML)
> - Cuidado: puede ser muy largo

### "¿Y si tengo muchos emails?"
> Consideraciones:
> - n8n procesa items en paralelo por defecto
> - Sheets tiene límite de escritura (~100/min)
> - Para volúmenes altos, agregar nodo de delay
> - O usar Append Row batch

---

## Sobre Automatización en General

### "¿Cuándo debería automatizar algo?"
> Regla general: Si haces algo más de 2 veces por semana y toma más de 5 minutos, considera automatizarlo. Pero:
> - Empieza simple
> - No automatices decisiones críticas sin supervisión
> - El tiempo de setup debe justificar el ahorro

### "¿Qué pasa si automatizo algo y sale mal?"
> Por eso:
> - Siempre probar antes de activar
> - Empezar con volúmenes bajos
> - Tener forma de revertir
> - Monitorear las primeras ejecuciones
> - n8n guarda historial de todo

### "¿Puedo automatizar cosas de mi empresa?"
> Consideraciones:
> - Permisos de IT/seguridad
> - Datos sensibles
> - Cumplimiento normativo
> - n8n self-hosted puede ser opción para empresas
>
> Para proyectos personales o prototipos, adelante.

---

## Técnicas

### "¿Cómo sé qué expresión usar?"
> Técnica recomendada:
> 1. Ejecutar el workflow hasta el nodo anterior
> 2. Click en el nodo para ver su output
> 3. El output muestra la estructura exacta
> 4. Navegar desde `$json.` siguiendo la estructura
>
> Ejemplo: Si ves `{"from": {"value": [{"address": "x@y.com"}]}}`, la expresión es `$json.from.value[0].address`

### "¿Por qué mi expresión no funciona?"
> Errores comunes:
> - Olvidar `{{ }}` alrededor
> - Typo en nombre de campo (case sensitive)
> - Índice mal (`[0]` vs `[1]`)
> - El campo no existe en ese momento
>
> Tip: Usar el panel de expresiones de n8n para probar

### "¿Cómo formateo la fecha?"
> Expresión para formato legible:
> ```
> {{ DateTime.fromISO($json.date).toFormat('dd/MM/yyyy HH:mm') }}
> ```
> Otros formatos:
> - `'yyyy-MM-dd'` → 2024-01-15
> - `'dd MMM yyyy'` → 15 Jan 2024
> - `'HH:mm:ss'` → 10:30:00

---

## Preguntas que Anticipar

### Sobre el curso
- "¿Habrá certificado?" → Depende de tu política
- "¿Puedo revisar el material después?" → Sí, tienen acceso a los archivos
- "¿Cuándo es la siguiente sesión?" → [fecha]

### Sobre aplicaciones prácticas
- "¿Puedo hacer X?" → Probablemente sí, veámoslo
- "¿Esto sirve para Y industria?" → Sí, los principios son los mismos

### Sobre dificultad
- "¿Es muy técnico?" → No, todo es visual
- "¿Necesito saber programar?" → No para este nivel

---

## Respuestas Modelo para Situaciones Difíciles

### Si alguien dice "Esto es muy fácil"
> "Perfecto, te propongo un reto: agrega un filtro que solo procese emails con 'urgente' en el asunto, y que agregue una columna con la hora en formato local."

### Si alguien dice "No entiendo nada"
> "Vamos paso a paso. ¿Cuál es el último punto donde todo tenía sentido?" → Identificar el gap y explicar desde ahí.

### Si alguien cuestiona la utilidad
> "Entiendo el escepticismo. Este es un ejemplo simple para aprender. Las empresas usan esto mismo para procesar miles de documentos, atender clientes 24/7, y automatizar procesos que antes requerían equipos enteros."

### Si hay un error que no puedes resolver
> "Esto es interesante. Voy a investigarlo y les comparto la solución. Mientras tanto, veamos si podemos continuar de otra forma." → Anotar para resolver después.
