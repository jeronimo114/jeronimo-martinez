# Cronograma de Admisiones

## Estado: Pendiente

## Descripcion
Componente (no pagina completa) que muestra el calendario de admisiones para prospectos. Se integra directamente en las paginas generales de pregrado y master, y opcionalmente en el detalle de cada programa.

## Decision clave de la reunion
- **NO es una pagina independiente** - es un componente/plugin que se inserta en paginas existentes
- **NO es calendario interno de estudiantes** - es de cara al prospecto (fechas de admision, inicio de clases)
- **NO incluir detalle de clases** (tipo martes, miercoles) - solo hitos grandes

## Requisitos

### Contenido para prospectos
- Fase de admisiones: cuando abre, cuando cierra
- Fecha de inicio de clases del proximo corte
- Hitos grandes del programa (modulos principales, viaje/inmersion)

### Donde se muestra
1. Pagina general de pregrado
2. Pagina general de master
3. Detalle de cada programa individual (duplicado/reutilizado del componente)

### Formato
- Reemplaza la tabla/cuadro de fechas que existia antes en el sitio anterior
- Presentacion visual atractiva (no un Excel)
- Diseno reutilizable: mismo formato para pregrado y master

### Pregrado
- Mas complejo: multiples anos/cortes simultaneos
- Fechas de vacaciones (se menciono pero se descarto parcialmente - mejor manejar via Ubiflex/plataforma interna)
- Actualizacion anual

### Master
- Mas manejable: siempre son dos cortes al tiempo maximo
- Ejemplo: corte 5 se gradua en junio, corte 6 en otro momento
- Cuadro resumen macro de los modulos grandes

## Insumos necesarios
- Fechas de admision pregrado (Eliana las pasa recurrentemente)
- Fechas de admision master (equipo ESIC)
- Hitos grandes por programa (modulos, inmersiones)

## Complejidad
Media-baja - es un componente puntual, no una pagina completa. Estimado ~1.5 dias.

## Notas de la reunion
- Alguien ya habia reportado que "quitaron la programacion de fechas de pregrado"
- El calendario detallado de estudiantes (tipo Excel de Sara) NO se replica en el sitio - demasiado denso
- Las comunicaciones internas de vacaciones/calendario detallado se manejan mejor via Ubiflex (banners internos)
- Dani: "arranquemos con calendario de admisiones, lo mas general"
- Si el componente queda bien, se duplica en cada programa individual (ej: Digital Business)
