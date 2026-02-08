# Demo 4: Gmail a Google Sheets

## Información General

| Aspecto | Detalle |
|---------|---------|
| **Duración** | 15-20 minutos |
| **Módulo** | Proyecto 1 |
| **Slides** | S1-28 a S1-37 |
| **Herramientas** | n8n Cloud, Gmail, Google Sheets |

---

## Objetivo del Demo

Construir paso a paso un workflow completo que:
1. Detecta nuevos emails en Gmail
2. Extrae datos (remitente, asunto, fecha)
3. Los registra automáticamente en Google Sheets

Los estudiantes seguirán el demo y luego lo replicarán.

---

## Preparación Pre-Demo

### Antes de la sesión:
- [ ] n8n Cloud abierto y logueado
- [ ] Gmail conectado como credencial en n8n
- [ ] Google Sheets conectado como credencial en n8n
- [ ] Google Sheet de prueba creado con columnas: Remitente | Asunto | Fecha
- [ ] Email de prueba listo para enviar desde el celular
- [ ] Workflow nuevo y vacío

### Credenciales a verificar:
1. **Gmail OAuth2:** Debe tener permisos de lectura
2. **Google Sheets OAuth2:** Debe tener permisos de lectura/escritura

### Google Sheet de prueba:
- Nombre: "Demo - Registro de Emails"
- Hoja: "Sheet1"
- Encabezados en fila 1:
  - A1: `Remitente`
  - B1: `Asunto`
  - C1: `Fecha`

---

## Script del Demo

### Parte A: Setup Inicial (2 minutos)

#### A1. Mostrar el objetivo

> "Vamos a construir algo real: cada vez que llegue un email a mi Gmail, automáticamente se registra en esta hoja de cálculo."

1. Mostrar la hoja de Google Sheets vacía (solo encabezados)
2. Mostrar Gmail vacío o con pocos emails

> "Al final de este demo, cuando me llegue un email, aparecerá una fila aquí automáticamente."

#### A2. Crear workflow

1. En n8n, crear nuevo workflow
2. Nombrar: `Gmail a Sheets - Demo`

---

### Parte B: Conectar Gmail (4 minutos)

#### B1. Agregar Gmail Trigger

1. Click en **"+"**
2. Buscar: `gmail`
3. Seleccionar **"Gmail Trigger"**

> "Este nodo vigila mi bandeja de entrada. Cuando llega un email nuevo, dispara el workflow."

#### B2. Configurar el trigger

1. Click en el nodo para abrirlo
2. En **"Credential"**, seleccionar la credencial de Gmail existente

   > "Ya tengo Gmail conectado. Si ustedes no lo tienen, hay que crear la credencial primero."

3. En **"Event"**, seleccionar: `Message Received`

4. (Opcional) Mostrar filtros:
   > "Puedo filtrar por etiqueta o por remitente, pero lo dejaremos sin filtro para ver todos los emails."

#### B3. Probar el trigger

1. Click en **"Fetch Test Event"**

2. Si no hay emails recientes:
   > "Voy a enviarme un email de prueba desde mi celular..."
   - Enviar email rápido desde celular al mismo Gmail
   - Esperar 10-20 segundos
   - Click en "Fetch Test Event" de nuevo

3. Mostrar los datos del email:
   ```json
   {
     "id": "abc123...",
     "from": {
       "value": [{"address": "sender@example.com", "name": "Sender"}]
     },
     "subject": "Email de prueba",
     "date": "2024-01-15T10:30:00Z"
   }
   ```

> "Miren la estructura. El remitente está en `from.value[0].address`, el asunto en `subject`, y la fecha en `date`."

---

### Parte C: Conectar Google Sheets (4 minutos)

#### C1. Agregar nodo Google Sheets

1. Click en **"+"** a la derecha del Gmail Trigger
2. Buscar: `google sheets`
3. Seleccionar **"Google Sheets"**

#### C2. Configurar el nodo

1. **Credential:** Seleccionar credencial de Google Sheets

2. **Operation:** `Append Row` (Agregar fila)
   > "Cada email = una nueva fila al final"

3. **Document:** Click y buscar "Demo - Registro de Emails"
   > "n8n lista todas las hojas de mi cuenta"

4. **Sheet:** Seleccionar "Sheet1"

5. **Mapping:**
   > "Ahora conecto cada columna con el dato correspondiente del email..."

   | Column | Value (Expression) |
   |--------|-------------------|
   | Remitente | `{{ $json.from.value[0].address }}` |
   | Asunto | `{{ $json.subject }}` |
   | Fecha | `{{ $json.date }}` |

   Para cada campo:
   - Click en el campo
   - Click en el ícono de expresión (⚡)
   - Escribir/pegar la expresión

> "La sintaxis `$json` accede a los datos del nodo anterior. El punto navega dentro del JSON."

---

### Parte D: Probar el Workflow (3 minutos)

#### D1. Primera ejecución

1. Click en **"Test Workflow"**
2. Esperar ejecución exitosa

3. Ir a Google Sheets y refrescar
   > "¡Miren! Apareció una nueva fila con los datos del email."

4. Mostrar la fila con datos:
   - Remitente: sender@example.com
   - Asunto: Email de prueba
   - Fecha: 2024-01-15T10:30:00Z

#### D2. Segunda prueba

1. Volver a n8n
2. Enviar otro email de prueba
3. Click en "Test Workflow"
4. Verificar segunda fila en Sheets

> "Cada vez que ejecuto, procesa los emails nuevos."

---

### Parte E: Activar (2 minutos)

#### E1. Activar el workflow

1. Mostrar el toggle **"Active"** arriba a la derecha
2. Activar (cambiar a ON)

> "Ahora el workflow corre automáticamente. n8n revisa mi Gmail cada 1-2 minutos."

#### E2. Demostrar automatización

1. Enviar email desde celular
2. Esperar 1-2 minutos
3. Mostrar nueva fila en Sheets sin haber ejecutado manualmente

> "¡Automático! No toqué nada y apareció la fila."

---

### Parte F: Debugging (3 minutos)

#### F1. Ver ejecuciones

1. Click en **"Executions"** (abajo a la izquierda)
2. Mostrar lista de ejecuciones:
   - Verde = éxito
   - Rojo = error
3. Click en una ejecución para ver detalles

> "Aquí veo el historial completo. Puedo ver exactamente qué pasó en cada ejecución."

#### F2. Simular un error

1. Volver al workflow
2. Romper algo intencionalmente:
   - Cambiar expresión a algo mal: `{{ $json.from.value[99].address }}`
3. Ejecutar
4. Mostrar error en rojo

> "Rompí la expresión a propósito. Miren cómo n8n me dice exactamente dónde está el problema."

5. Leer el mensaje de error
6. Arreglar la expresión
7. Ejecutar de nuevo → éxito

> "Debuggear en n8n es revisar el error, entender qué falló, y arreglarlo."

---

### Cierre (1 minuto)

> "Eso es todo. Un workflow real que funciona. Ahora les toca a ustedes construir el suyo."

Guardar el workflow.

---

## Puntos Clave a Enfatizar

1. **La estructura de datos importa**
   > "Tienen que entender cómo viene el JSON para extraer los campos correctos."

2. **Las expresiones son el pegamento**
   > "`{{ $json.campo }}` conecta los datos entre nodos."

3. **Siempre probar antes de activar**
   > "Ejecuten manualmente varias veces antes de dejar activo."

4. **Los errores no dan miedo**
   > "n8n les dice exactamente qué falló. Léanlo."

---

## Expresiones Importantes

```
# Remitente (email)
{{ $json.from.value[0].address }}

# Remitente (nombre)
{{ $json.from.value[0].name }}

# Asunto
{{ $json.subject }}

# Fecha original
{{ $json.date }}

# Fecha formateada (opcional)
{{ DateTime.fromISO($json.date).toFormat('dd/MM/yyyy HH:mm') }}

# Cuerpo del email (si es texto plano)
{{ $json.text }}

# Cuerpo del email (si es HTML, primeras 200 chars)
{{ $json.html.substring(0, 200) }}
```

---

## Preguntas Anticipadas

**P: ¿Por qué tarda 1-2 minutos en detectar emails?**
> "Es el intervalo de polling de n8n cloud. Se puede configurar en planes pagos."

**P: ¿Puedo filtrar solo emails de cierto remitente?**
> "Sí, en el Gmail Trigger hay opciones de filtro, o pueden agregar un nodo IF después."

**P: ¿Funciona con Outlook?**
> "Sí, n8n tiene nodos para Microsoft. El proceso es similar."

**P: ¿Qué pasa si falla el Sheets?**
> "El email no se pierde. Pueden ir a Executions, ver el error, arreglarlo, y re-ejecutar."

---

## Backup Plans

### Si Gmail OAuth falla:
- Usar credencial de backup pre-configurada
- Mostrar proceso de autenticación en slides

### Si no llegan emails:
- Tener emails pre-enviados listos
- Usar el "Fetch Test Event" repetidamente

### Si Sheets no aparece:
- Verificar permisos de la credencial
- Tener hoja compartida como backup

---

## Timing Detallado

| Sección | Duración |
|---------|----------|
| Setup inicial | 2:00 |
| Conectar Gmail | 4:00 |
| Conectar Sheets | 4:00 |
| Probar | 3:00 |
| Activar | 2:00 |
| Debugging | 3:00 |
| Cierre | 1:00 |
| **Total** | **19:00** |

---

## Notas para el Instructor

### Durante el demo
- Narrar cada click
- Explicar el "por qué", no solo el "qué"
- Pausar para preguntas en transiciones

### Manejo de errores en vivo
- Si algo falla, usarlo como oportunidad de enseñanza
- "Miren, esto es exactamente lo que pasa cuando algo sale mal..."

### Atención a la audiencia
- Verificar que siguen visualmente
- Preguntar: "¿Hasta aquí todo claro?"
- Identificar caras de confusión
