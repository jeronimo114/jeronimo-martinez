# Ejercicio 2: Prompts Precisos

## Información General

| Aspecto | Detalle |
|---------|---------|
| **Duración** | 8 minutos |
| **Módulo** | 1 - Fundamentos LLM |
| **Slide** | S1-11 |
| **Herramienta** | Papel/notas (no necesita computadora) |

## Objetivo

Practicar la escritura de prompts precisos transformando instrucciones vagas en peticiones específicas.

---

## Instrucciones para Estudiantes

### El Problema

El siguiente prompt es demasiado vago:

> "Escríbeme algo sobre automatización"

**¿Qué tiene de malo?**
- No especifica cantidad
- No define formato
- No indica audiencia
- No establece tono
- No da contexto

---

### La Solución: Template de Prompt Preciso

Usa esta estructura:

```
Escribe [CANTIDAD] [TIPO DE CONTENIDO] sobre [TEMA ESPECÍFICO]
para [AUDIENCIA], en formato [FORMATO], con tono [TONO].

[CONTEXTO ADICIONAL si es necesario]
```

---

### Tu Tarea

**Reescribe el prompt vago usando el template.**

Prompt vago:
> "Escríbeme algo sobre automatización"

Tu versión precisa:
```
_____________________________________________
_____________________________________________
_____________________________________________
_____________________________________________
```

---

### Ejemplo de Solución

```
Escribe 3 beneficios de automatizar emails de bienvenida
para ecommerce, en bullets de 1 línea cada uno,
con tono profesional pero accesible.

Contexto: Es para una presentación a dueños de tiendas online
que no son técnicos.
```

---

## Componentes del Prompt Preciso

| Componente | Ejemplo | Por qué importa |
|------------|---------|-----------------|
| **Cantidad** | "3 beneficios" | Evita respuestas interminables |
| **Tipo** | "bullets", "párrafo", "lista" | Define estructura |
| **Tema** | "emails de bienvenida" | Enfoca el contenido |
| **Audiencia** | "dueños de tiendas" | Ajusta complejidad |
| **Formato** | "1 línea cada uno" | Controla extensión |
| **Tono** | "profesional pero accesible" | Define estilo |

---

## Más Prompts para Practicar

Transforma estos prompts vagos en precisos:

### 1. Vago: "Dame ideas de marketing"
```
Tu versión:
_____________________________________________
_____________________________________________
```

### 2. Vago: "Explica qué es la IA"
```
Tu versión:
_____________________________________________
_____________________________________________
```

### 3. Vago: "Escribe un email"
```
Tu versión:
_____________________________________________
_____________________________________________
```

---

## Soluciones Sugeridas

### 1. Ideas de marketing
```
Dame 5 ideas de marketing digital para una cafetería local,
enfocadas en aumentar visitas los días entre semana,
con presupuesto bajo (<$100/mes), ordenadas de menor a mayor esfuerzo.
```

### 2. Explicar IA
```
Explica qué es la inteligencia artificial en 3 oraciones simples
para alguien de 60 años que nunca ha usado una computadora,
usando analogías de la vida cotidiana, sin términos técnicos.
```

### 3. Escribir email
```
Escribe un email de seguimiento para un cliente que pidió cotización
hace 3 días y no ha respondido. Máximo 100 palabras, tono amigable
pero profesional, incluye un CTA claro para agendar llamada.
```

---

## Actividad Grupal (3 minutos)

1. **En parejas:** Compartan sus versiones del primer prompt
2. **Discutan:** ¿Qué elementos incluyó cada uno?
3. **Elijan:** La mejor versión para compartir

**Votación grupal:** El instructor muestra 2-3 versiones, el grupo vota la mejor

---

## Checkpoint

**¿Cómo sé que completé el ejercicio?**
- [ ] Reescribí al menos 1 prompt vago
- [ ] Incluí: cantidad, formato, audiencia, tono
- [ ] Mi prompt tiene menos de 50 palabras pero es específico
- [ ] Entiendo por qué la precisión mejora resultados

---

## Tips Profesionales

### El Prompt Perfecto No Existe
- Iterar es normal (probar → ajustar → repetir)
- Guardar prompts que funcionan

### Menos es Más (a veces)
- No sobre-especificar si no es necesario
- Encontrar el balance

### Contexto > Instrucciones
- Dar contexto relevante mejora más que dar más reglas
- "Para un blog de tecnología" vs "usa palabras simples, máximo 3 sílabas"

---

## Notas para el Instructor

### Timing
- Explicar template: 2 min
- Trabajo individual: 3 min
- Parejas + compartir: 3 min

### Facilitar Discusión
- Pedir 2-3 voluntarios que lean su versión
- Destacar buenos elementos de cada uno
- No hay respuesta "correcta", hay mejores y peores

### Conexión con el Curso
- "Estos prompts los usaremos en n8n para darle instrucciones a la IA"
- "En Sesión 2 veremos prompts para agentes"
