# Ejercicio 3: Primer Workflow en n8n

## Información General

| Aspecto | Detalle |
|---------|---------|
| **Duración** | 15 minutos |
| **Módulo** | 3 - Introducción a n8n |
| **Slide** | S1-27 |
| **Herramienta** | n8n (app.n8n.cloud) |

## Objetivo

Familiarizarse con la interfaz de n8n creando un workflow básico que procesa datos.

---

## Prerrequisitos

Antes de empezar, verifica:
- [ ] Tienes cuenta en n8n (app.n8n.cloud)
- [ ] Estás logueado
- [ ] Puedes ver el dashboard de workflows

---

## Instrucciones Paso a Paso

### Paso 1: Crear Nuevo Workflow

1. Click en botón **"+ Create Workflow"** (arriba a la derecha)
2. Nombrar el workflow: `Mi Primer Workflow - [Tu Nombre]`
3. Click en **"Save"**

**Visual de referencia:**
```
┌─────────────────────────────────────────┐
│ [+ Create Workflow]                     │
└─────────────────────────────────────────┘
```

---

### Paso 2: Agregar Manual Trigger

1. Click en el botón **"+"** en el canvas
2. En el buscador, escribir: `Manual`
3. Seleccionar **"Manual Trigger"**
4. El nodo aparece en el canvas

**¿Para qué sirve?**
- Es el punto de inicio del workflow
- Se ejecuta cuando tú haces click en "Execute"

---

### Paso 3: Agregar Nodo Set

1. Click en el **"+"** que aparece a la derecha del Manual Trigger
2. En el buscador, escribir: `Set`
3. Seleccionar **"Edit Fields (Set)"**
4. Se agrega automáticamente conectado

**¿Para qué sirve?**
- Crear o modificar datos
- Es como llenar un formulario con información

---

### Paso 4: Configurar el Nodo Set

1. Click en el nodo **Set** para abrirlo
2. En el panel derecho, verás "Fields to Set"
3. Click en **"Add Field"** → **"String"**
4. Configurar:
   - **Name:** `saludo`
   - **Value:** `Hola desde n8n, soy [ESCRIBE TU NOMBRE]!`

**Ejemplo:**
```
Name: saludo
Value: Hola desde n8n, soy María!
```

5. Click fuera del nodo para cerrarlo

---

### Paso 5: Ejecutar el Workflow

1. Click en el botón **"Test Workflow"** (arriba, icono de play)
2. Esperar 1-2 segundos
3. Verás un indicador verde en cada nodo que se ejecutó correctamente

---

### Paso 6: Ver el Output

1. Click en el nodo **Set**
2. En el panel derecho, busca la pestaña **"Output"**
3. Deberías ver algo así:

```json
[
  {
    "saludo": "Hola desde n8n, soy María!"
  }
]
```

---

## Checkpoint

**Levanta la mano cuando:**
- [ ] Veas tu mensaje personalizado en el output del nodo Set

---

## Troubleshooting

### "No veo el botón +"
- Asegúrate de estar en modo edición
- Haz zoom out si el canvas está muy cerca

### "El workflow no se ejecuta"
- Verifica que los nodos estén conectados (línea entre ellos)
- Revisa que no haya errores rojos

### "No veo el output"
- Click en el nodo Set
- Busca la pestaña "Output" (no "Input")
- Si dice "No data", ejecuta el workflow primero

---

## Extensión (Si Terminas Antes)

### Nivel 1: Agregar más campos
1. Abre el nodo Set
2. Add Field → String → `ciudad` → `[tu ciudad]`
3. Add Field → Number → `edad` → `[un número]`
4. Ejecutar y ver el nuevo output

### Nivel 2: Agregar otro nodo Set
1. Agregar un segundo nodo Set
2. Conectarlo después del primero
3. En el nuevo Set, agregar campo:
   - Name: `mensaje_completo`
   - Value: `{{ $json.saludo }} Tengo {{ $json.edad }} años.`
4. Ejecutar y ver cómo se combinan los datos

---

## Estructura Final del Workflow

```
┌────────────────┐       ┌─────────────────────┐
│ Manual Trigger │──────→│ Set                 │
│                │       │ saludo: "Hola..."   │
└────────────────┘       └─────────────────────┘
```

---

## Conceptos Aprendidos

| Concepto | Qué aprendiste |
|----------|----------------|
| **Trigger** | El nodo que inicia el workflow |
| **Nodo Set** | Crear y modificar datos |
| **Conexiones** | Las líneas que unen nodos |
| **Ejecutar** | Correr el workflow manualmente |
| **Output** | Ver los datos que produce cada nodo |

---

## Notas para el Instructor

### Timing
- Explicación: 3 min
- Trabajo individual: 10 min
- Verificación y ayuda: 2 min

### Puntos de Atención
- Algunos tardarán en encontrar el botón "+"
- El panel de configuración puede confundir
- Asegurarse de que todos ejecuten el workflow

### Circulación
- Pasear por el salón durante el ejercicio
- Identificar quiénes terminan rápido (pueden ayudar)
- Priorizar a quienes tienen problemas técnicos

### Celebrar
- Cuando alguien termine, que lo anuncie
- Aplaudir el primer éxito
- Motivar a los demás

### Conexión con Siguiente Paso
- "Este es el patrón básico que usaremos"
- "Ahora vamos a conectar herramientas reales"
