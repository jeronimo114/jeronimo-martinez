# Demo 3: Primer Workflow en n8n

## Información General

| Aspecto | Detalle |
|---------|---------|
| **Duración** | 5 minutos |
| **Módulo** | 3 - Introducción a n8n |
| **Slide** | S1-26 |
| **Herramienta** | n8n (app.n8n.cloud) |

## Objetivo del Demo

Mostrar la interfaz de n8n y crear un workflow básico paso a paso, desmitificando la herramienta antes de que los estudiantes la usen.

---

## Preparación Pre-Demo

### Checklist
- [ ] n8n abierto en app.n8n.cloud
- [ ] Logueado en cuenta demo
- [ ] Dashboard limpio (sin workflows previos visibles)
- [ ] Zoom del navegador al 100%
- [ ] Pantalla compartida lista

### Limpiar Ambiente
- Borrar o archivar workflows de pruebas anteriores
- Asegurar que las credenciales estén configuradas (para el proyecto)

---

## Script del Demo

### Introducción (30 segundos)

> "Esto es n8n. Es donde vamos a construir todas nuestras automatizaciones. Piensen en esto como un lienzo donde dibujamos flujos de trabajo."
>
> "Les voy a mostrar lo básico, y luego ustedes lo replican."

### Paso 1: Crear Nuevo Workflow (30 segundos)

1. Click en **"+ Create Workflow"** (o "+ Add Workflow")
2. Se abre el canvas vacío
3. Nombrar: `Demo - Mi Primer Workflow`
4. Guardar

**Narrar:**
> "Cada workflow tiene un nombre. Siempre pongan nombres descriptivos, van a tener muchos workflows eventualmente."

### Paso 2: Agregar Manual Trigger (1 minuto)

1. Click en el **"+"** en el centro del canvas
2. Se abre el panel de nodos
3. Escribir en búsqueda: `Manual`
4. Click en **"Manual Trigger"**
5. El nodo aparece en el canvas

**Narrar:**
> "Este es nuestro primer nodo. Un 'trigger' es lo que inicia el workflow. En este caso, es manual - nosotros decidimos cuándo ejecutar."
>
> "Más adelante usaremos triggers automáticos, como 'cuando llega un email'."

### Paso 3: Agregar Nodo Set (1 minuto)

1. Click en el **"+"** que aparece a la derecha del trigger
2. Buscar: `Set`
3. Seleccionar **"Edit Fields (Set)"**
4. Se conecta automáticamente

**Narrar:**
> "El nodo Set nos permite crear o modificar datos. Es como llenar un formulario."
>
> "Fíjense en la línea que conecta los nodos. Eso es el flujo de datos."

### Paso 4: Configurar Set (1 minuto)

1. Click en el nodo Set para abrirlo
2. Click en **"Add Field"** → **"String"**
3. Configurar:
   - Name: `saludo`
   - Value: `Hola desde n8n!`
4. Mostrar el panel de configuración

**Narrar:**
> "Estoy creando un campo llamado 'saludo' con el valor 'Hola desde n8n'. Esto podría ser cualquier dato: un nombre, un email, un número."

### Paso 5: Ejecutar y Ver Resultado (1 minuto)

1. Click en **"Test Workflow"** (botón de play arriba)
2. Esperar que ejecute (indicador verde en los nodos)
3. Click en el nodo Set
4. Mostrar la pestaña **"Output"**

**Narrar:**
> "Cuando ejecuto, el workflow procesa cada nodo en orden. El verde significa éxito."
>
> "Ahora miren el output... ¡Ahí está nuestro saludo!"

Mostrar:
```json
[
  {
    "saludo": "Hola desde n8n!"
  }
]
```

> "Este formato se llama JSON. Es cómo n8n organiza los datos. Cada campo es accesible en los siguientes nodos."

---

## Resumen Visual

```
Workflow Final:

┌────────────────┐         ┌─────────────────────┐
│ Manual Trigger │────────→│ Set                 │
│ (Inicio)       │         │ saludo: "Hola..."   │
└────────────────┘         └─────────────────────┘
```

---

## Puntos Clave a Enfatizar

### Simplicidad
> "Dos nodos, una conexión. Esto es un workflow completo."

### Visual
> "No hay que escribir código. Todo es arrastrar, conectar, configurar."

### Datos
> "Los datos fluyen de izquierda a derecha, de nodo en nodo."

---

## Transición al Ejercicio

> "Ahora les toca a ustedes. Van a crear exactamente esto, pero con su nombre en el saludo."
>
> "Tienen 15 minutos. Cuando vean su mensaje en el output, levanten la mano."

---

## Troubleshooting Durante Demo

### Si n8n está lento
- Tener paciencia, explicar que cloud puede tardar
- "A veces toma unos segundos..."

### Si no encuentra el nodo
- Mostrar que hay que borrar el filtro de búsqueda
- O navegar por categorías

### Si no se conecta automáticamente
- Arrastrar manualmente la línea
- Explicar que se puede hacer de ambas formas

### Si el output no aparece
- Verificar que se ejecutó (check verde)
- Click en el nodo correcto
- Pestaña Output, no Input

---

## Notas del Instructor

### Timing Detallado
- Intro: 0:30
- Crear workflow: 0:30
- Manual Trigger: 1:00
- Set node: 1:00
- Configurar + Ejecutar: 2:00
- **Total: 5 minutos**

### Tips de Presentación
- Ir LENTO, muchos nunca han visto n8n
- Narrar cada click
- Pausar después de cada paso

### Movimientos de Mouse
- Mover el mouse lentamente
- Señalar elementos antes de hacer click
- Dar tiempo para que procesen

### Verificar Comprensión
- "¿Todos ven el nodo Set?"
- "¿Alguna pregunta hasta aquí?"
- No avanzar hasta que todos sigan
