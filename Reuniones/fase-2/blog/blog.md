# Blog

## Estado: Rediseno pendiente

## Descripcion
Rediseno de la interfaz del blog existente. No es una pagina nueva sino una mejora de la experiencia actual del blog en esic.co.

## Problemas actuales identificados
1. **Articulos desaparecidos**: hay articulos que no se encuentran facilmente - Dani lo va a conversar internamente
2. **Sin categorias/filtros**: los articulos se muestran uno tras otro cronologicamente, sin forma de filtrar
3. **Fechas incorrectas**: articulos publicados recientemente aparecian con fecha de 2022 (problema de backend WordPress)
4. **Navegacion pobre**: hay que bajar mucho para encontrar el blog

## Requisitos del rediseno

### Sistema de categorias
- Filtros por tematica: tecnologia, futuro, educacion, etc.
- Que el usuario pueda elegir que tipo de contenido quiere leer
- Categorias definidas por el equipo ESIC

### Interfaz mejorada
- Presentacion atractiva de articulos
- Vista de tarjetas o grid (no lista lineal)
- Fechas correctas y visibles

### Posicion en el sitio
- Dani considera que el blog NO necesita estar en el menu principal
- La funcion principal del blog es SEO, no necesariamente lectura directa
- La ubicacion se conversa internamente

## Decision: Blog es Blog
- No mezclar blog con papers academicos
- El blog funciona como blog tradicional (articulos, noticias, opiniones)
- Los papers/publicaciones van en otra seccion (ESIC Editions, fase 3)

## Insumos necesarios
- Listado de categorias a implementar (por definir con equipo ESIC)
- Acceso al backend de WordPress para revisar el tema de fechas
- Definicion de cuantos articulos se muestran por pagina

## Complejidad
Media - es un rediseno de interfaz existente, no una pagina desde cero

## Notas de la reunion
- Dani: "lo unico, el detalle de que se desaparecieron los articulos, eso si lo debemos revisar"
- La funcion del blog es SEO, no lectura directa por visitantes
- Dani va a hablar internamente sobre la visibilidad del blog en la navegacion
