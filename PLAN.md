# Plan de diseño — Game Zone XP

## Objetivo

Crear una página web moderna, profesional, atractiva e intuitiva para presentar Game Zone XP y facilitar que las personas conozcan el negocio y sepan cómo llegar.

El negocio se encuentra en la colonia Tierra y Libertad, San Miguel Soyaltepec, Oaxaca, México.

### Información confirmada

- Consolas Xbox Series S.
- Pantallas de 42 pulgadas y una pantalla de 75 pulgadas.
- Dos futbolitos.
- El negocio no cuenta con sillas gamer.

No inventar servicios, instalaciones, promociones, precios, horarios, catálogo de juegos ni disponibilidad. Los datos de contacto y la ubicación exacta deben confirmarse antes de publicarse. Utilizar fotografías reales del negocio y su mobiliario.

## Estructura y secciones

Se propone una página única con desplazamiento y navegación por secciones.

1. **Encabezado:** nombre Game Zone XP y enlaces a Experiencia, Galería y Ubicación.
2. **Presentación principal:** mensaje breve, fotografía real y acción principal «Cómo llegar», disponible cuando se confirme el enlace de ubicación.
3. **Experiencia:** presentación de Xbox Series S, pantallas de 42 pulgadas y una de 75 pulgadas, y dos futbolitos.
4. **Galería:** fotografías reales de consolas, pantallas y futbolitos para mostrar el lugar antes de la visita.
5. **Ubicación y contacto:** colonia, municipio y estado; agregar dirección exacta, mapa y contacto solo después de confirmarlos. El botón «Consultar por WhatsApp» es opcional y depende de contar con un número autorizado del negocio.
6. **Pie de página:** nombre del negocio y enlaces útiles confirmados.

### Texto propuesto para la presentación

> Tu próxima partida empieza aquí.
>
> Disfruta Xbox Series S y futbolitos en Game Zone XP, en la colonia Tierra y Libertad, San Miguel Soyaltepec, Oaxaca.

## Identidad visual

Evolucionar la base actual de fondo oscuro y verde, con una estética gamer moderna y una composición clara.

| Elemento | Propuesta |
| --- | --- |
| Fondo | Negro carbón `#101214` |
| Tarjetas | Gris oscuro `#191D22` |
| Acento | Verde vivo `#55EF83` |
| Texto principal | Blanco suave `#F5F7FA` |
| Texto secundario | Gris claro `#B8C0CC` |
| Tipografía | Familia del sistema, con títulos grandes y de peso fuerte |
| Formas | Tarjetas con bordes suaves y líneas discretas |

Usar el verde con moderación para destacar acciones y detalles importantes. Dar personalidad mediante tipografía, composición y fotografías reales. Mantener los efectos y las animaciones discretos para facilitar la lectura y cuidar el rendimiento.

## Responsive Design

- Diseñar primero para celular.
- Usar una columna en pantallas pequeñas y varias columnas cuando el contenido tenga espacio suficiente.
- Definir un ancho máximo de lectura y márgenes adaptables.
- Adaptar tamaños de texto, espacios e imágenes sin desbordamientos horizontales.
- Mantener botones cómodos para interacción táctil.
- Incorporar un menú móvil únicamente si la navegación lo necesita.
- Comprobar la página en tamaños de celular, tableta y escritorio.

## UI/UX y accesibilidad

- Explicar desde el inicio qué ofrece el negocio y dónde se encuentra.
- Mantener una navegación corta y mensajes claros.
- Destacar una acción principal: cómo llegar al negocio.
- Mostrar únicamente contenido y enlaces confirmados.
- Organizar el HTML con `header`, `nav`, `main`, `section` y `footer`.
- Mantener una jerarquía coherente de encabezados y contraste suficiente.
- Incluir textos alternativos útiles para las imágenes.
- Permitir navegación por teclado y mostrar el enfoque de los controles.
- Respetar la preferencia de movimiento reducido.
- Hacer que la información principal sea accesible sin JavaScript.

## Tecnologías y organización

- **HTML:** estructura semántica y contenido.
- **CSS:** estilos, variables reutilizables, Flexbox o Grid y adaptación responsive.
- **JavaScript:** interacciones necesarias, como el menú móvil, si se requiere.
- **Sin frameworks** en esta etapa.

Aplicar Clean Code con clases descriptivas, estilos reutilizables y organización sencilla. Explicar de manera clara las decisiones importantes durante la implementación para apoyar el aprendizaje.

### Rendimiento web

- Comprimir las fotografías y servirlas en dimensiones apropiadas.
- Definir dimensiones de imagen para evitar saltos de contenido.
- Usar carga diferida en imágenes de la galería.
- Evitar dependencias y efectos innecesarios.
- Usar inicialmente fuentes del sistema para reducir descargas.

### Herramientas que se podrán evaluar posteriormente

- Skills de Emil Kowalski, Impeccable y Taste.
- Figma MCP para explorar o revisar el diseño.
- Playwright para verificar navegación, interacciones y comportamiento responsive.

Su incorporación se evaluará según disponibilidad y necesidad; no es un requisito para comenzar con HTML, CSS y JavaScript.

## Plan de etapas

1. **Revisar y aprobar la propuesta.** Acordar estructura, dirección visual y prioridades antes de implementar.
2. **Reunir contenido real.** Confirmar ubicación exacta, datos de contacto y fotografías. Incorporar otros datos solo cuando sean proporcionados y verificados.
3. **Construir la estructura HTML.** Crear las secciones aprobadas y su navegación semántica.
4. **Implementar la identidad visual y el responsive.** Aplicar colores, tipografía, espacios y distribución adaptable.
5. **Agregar interacciones necesarias.** Crear o integrar `script.js` según las funciones aprobadas, conservando el contenido principal accesible sin JavaScript.
6. **Verificar calidad.** Revisar contenido, enlaces, teclado, contraste, tamaños de pantalla y rendimiento de imágenes. Corregir los problemas encontrados.
7. **Revisión final y preparación para publicación.** Validar la presentación con el responsable del negocio y confirmar los datos antes de publicar.

## Alcance de este documento

Este archivo conserva la propuesta para su revisión. Su creación no implica implementar el diseño ni modificar `index.html`, `style.css` o `script.js`.
