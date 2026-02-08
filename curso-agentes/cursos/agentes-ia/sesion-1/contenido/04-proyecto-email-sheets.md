# Módulo 4: Proyecto - Email a Sheets

## Duración: 60 minutos

## Objetivos
- Conectar Gmail a n8n
- Conectar Google Sheets a n8n
- Crear un workflow funcional completo
- Aprender a debuggear

---

## Slide S1-28: Título del Proyecto

**Layout:** Divider
**Número:** Proyecto 1
**Título:** Gmail → Sheets
**Subtítulo:** Registra emails automáticamente en una hoja de cálculo

---

## Slide S1-29: ¿Qué vamos a construir?

**Layout:** Visual Full
**Visual:** Diagrama de flujo

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    Gmail    │  ───→ │    n8n      │  ───→ │   Sheets    │
│   Trigger   │       │   Process   │       │   Append    │
└─────────────┘       └─────────────┘       └─────────────┘
      ↓                     ↓                     ↓
"Llega email"        "Extraer datos"      "Nueva fila con
                                           Remitente, Asunto,
                                           Fecha"
```

**Resultado final:** Cada email que llegue crea una fila automáticamente

---

## Slide S1-30: Paso 1 - Crear Hoja de Prueba

**Layout:** Visual + Instrucciones

**Instrucciones:**
1. Abrir Google Sheets
2. Crear nueva hoja: "Registro de Emails"
3. Agregar encabezados en fila 1:
   - A1: `Remitente`
   - B1: `Asunto`
   - C1: `Fecha`
4. Guardar

**Visual:** Screenshot de la hoja con encabezados

---

## Slide S1-31: Paso 2 - Conectar Gmail

**Layout:** Visual + Instrucciones

### Demo en Vivo: Credencial Gmail
**Archivo detallado:** `demos/demo-04-gmail-sheets.md`

**Pasos:**
1. En n8n, ir a Credentials → Add Credential
2. Buscar "Gmail OAuth2"
3. Click en "Sign in with Google"
4. Seleccionar cuenta de Google
5. Autorizar permisos (leer emails)
6. Verificar que dice "Connected"

**Nota:** Solo necesita permiso de lectura

---

## Slide S1-32: Paso 3 - Conectar Google Sheets

**Layout:** Visual + Instrucciones

**Pasos:**
1. En n8n, ir a Credentials → Add Credential
2. Buscar "Google Sheets OAuth2"
3. Click en "Sign in with Google"
4. Autorizar permisos
5. Verificar conexión

**Tip:** Usar la misma cuenta de Google para ambos

---

## Slide S1-33: Paso 4 - Gmail Trigger

**Layout:** 2 Columnas

**Columna izquierda - Configuración:**
1. Agregar nodo "Gmail Trigger"
2. Event: "Message Received"
3. Credential: Seleccionar la creada
4. (Opcional) Label: Filtrar por etiqueta

**Columna derecha - Test:**
1. Click en "Fetch Test Event"
2. Enviar email de prueba desde celular
3. Verificar que aparecen datos

**Estructura de datos del email:**
```json
{
  "id": "abc123",
  "from": {
    "value": [{"address": "sender@mail.com"}]
  },
  "subject": "Asunto del email",
  "date": "2024-01-15T10:30:00Z"
}
```

---

## Slide S1-34: Paso 5 - Google Sheets Node

**Layout:** 2 Columnas

**Columna izquierda - Configuración:**
1. Agregar nodo "Google Sheets"
2. Operation: "Append Row"
3. Credential: Seleccionar
4. Spreadsheet: "Registro de Emails"
5. Sheet: "Sheet1" (o el nombre de tu hoja)

**Columna derecha - Mapeo de campos:**
| Campo en Sheets | Expresión n8n |
|-----------------|---------------|
| Remitente | `{{ $json.from.value[0].address }}` |
| Asunto | `{{ $json.subject }}` |
| Fecha | `{{ $json.date }}` |

---

## Slide S1-35: Paso 6 - Probar el Workflow

**Layout:** Instrucciones numeradas

**Pasos:**
1. Conectar Gmail Trigger → Google Sheets
2. Guardar workflow
3. Click en "Execute Workflow"
4. Enviar email de prueba
5. Verificar en Google Sheets que aparece la fila
6. Revisar datos en cada nodo

**Checkpoint:** ¿Aparece la fila en tu hoja?

---

## Slide S1-36: Paso 7 - Activar Workflow

**Layout:** Big Statement + Instrucciones

**H1:** Hacerlo automático

**Pasos:**
1. En n8n, toggle "Active" → ON (arriba a la derecha)
2. El workflow ahora corre en background
3. Enviar otro email de prueba
4. Esperar 1-2 minutos
5. Verificar nueva fila (sin ejecutar manualmente)

**Nota:** n8n cloud revisa cada 1-2 minutos por defecto

---

## Slide S1-37: Debugging

**Layout:** 2 Columnas

**Columna izquierda - Ver ejecuciones:**
1. Click en "Executions" (esquina inferior izquierda)
2. Ver lista de ejecuciones
3. Verde = éxito, Rojo = error
4. Click en una para ver detalles

**Columna derecha - Errores comunes:**
- Credencial expirada → Reconectar
- Campo no encontrado → Revisar expresión
- Rate limit → Esperar o upgrade plan

### Demo: Romper y Arreglar
**Pasos:**
1. Romper algo intencionalmente (expresión mal escrita)
2. Ejecutar → ver error
3. Leer mensaje de error
4. Identificar el problema
5. Arreglar
6. Ejecutar → éxito

---

## Slide S1-38: Ejercicio Final

**Layout:** Big Statement

**H1:** Tu workflow funcionando

### Poll de Cierre
**Pregunta:** ¿Completaste el proyecto?

**Opciones:**
- A) Sí, funciona perfecto
- B) Funciona pero con algunos errores
- C) No logré terminarlo
- D) Necesito ayuda

**Momento:** Cierre, para medir éxito de la sesión
**Duración:** 1 minuto

---

## Slide S1-39: Extensiones Opcionales

**Layout:** 3 Líneas

Para los que terminaron antes:

1. **Filtrar:** Solo emails de cierto remitente
2. **Formatear fecha:** Convertir a formato legible
3. **Agregar campo:** Incluir cuerpo del email (primeras 100 palabras)

---

## Slide S1-40: Resumen del Proyecto

**Layout:** Checklist Visual

✅ Gmail conectado a n8n
✅ Google Sheets conectado
✅ Trigger configurado
✅ Datos mapeados correctamente
✅ Workflow activo y funcionando
✅ Sabes dónde ver errores

---

## Notas del Instructor

### Timing
- Intro y crear hoja: 5 min
- Conectar Gmail: 10 min
- Conectar Sheets: 5 min
- Gmail Trigger: 10 min
- Sheets node: 10 min
- Probar y activar: 10 min
- Debug demo: 5 min
- Buffer/ayuda individual: 5 min
- **Total:** 60 min

### Tips
- Tener credenciales pre-creadas como backup
- Algunos tendrán problemas con OAuth
- Mostrar tu pantalla mientras ellos hacen

### Problemas Frecuentes
| Problema | Solución |
|----------|----------|
| OAuth falla | Verificar cuenta Google correcta |
| No aparece la hoja | Refrescar lista de spreadsheets |
| Expresión mal | Copiar exacta del slide |
| No detecta emails | Verificar label, esperar 1-2 min |

### Ayuda Durante Ejercicio
- Identificar quiénes tienen problemas de OAuth (ayudarlos primero)
- Tener el JSON de ejemplo a mano
- Si alguien no puede, que haga pair con un compañero

### Celebrar Éxitos
- Cuando alguien termine, que muestre su hoja
- Aplaudir primer éxito del grupo
- Screenshot grupal de hojas funcionando
