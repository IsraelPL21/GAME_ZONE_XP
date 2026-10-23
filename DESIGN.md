---
name: Game Zone XP
description: Sistema oscuro con acentos verdes de la Propuesta Visual 02 aprobada.
colors:
  bg: "#101214"
  surface: "#191d22"
  green: "#55ef83"
  text: "#f5f7fa"
  muted: "#b8c0cc"
  border: "#35434d"
typography:
  display:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(54px, 6.4vw, 84px)"
    fontWeight: 900
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(34px, 3.9vw, 46px)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(20px, 2.3vw, 27px)"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(16px, 1.8vw, 20px)"
    fontWeight: 400
    lineHeight: 1.35
  label:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    letterSpacing: "0.08em"
rounded:
  button: "10px"
  button-mobile: "9px"
  photo: "12px"
spacing:
  compact: "12px"
  regular: "24px"
  section: "clamp(20px, 2.3vw, 28px)"
  wide: "34px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "#08120c"
    rounded: "{rounded.button}"
    padding: "10px 20px"
    height: "48px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.green}"
    rounded: "{rounded.button}"
    padding: "6px 12px"
    height: "36px"
  photo-placeholder:
    textColor: "{colors.muted}"
    rounded: "{rounded.photo}"
---

# Design System: Game Zone XP

## Overview

La referencia visual es la **Propuesta Visual 02 aprobada**: una presentación oscura, directa y de alto contraste, con verde luminoso como señal de identidad y acción. Este documento registra la implementación de esa referencia; no establece una nueva dirección creativa ni acredita una revisión visual terminada.

La tipografía contundente, las bandas diagonales del hero y los pequeños marcadores verdes dan carácter gamer. El contenido conserva una lectura sencilla en español. Las superficies de fotografía pendientes se reconocen como tales; las ilustraciones de equipo no sustituyen fotografías del establecimiento.

**Key Characteristics:**

- Fondo carbón y texto claro.
- Verde para acciones, identidad y detalles de orientación.
- Secciones compactas separadas por líneas finas.
- Equipamiento con su proporción original.
- Fotografías pendientes expresadas con marcos e iconos discretos.

## Colors

### Primary

El verde luminoso `green` identifica XP, la frase destacada del hero, el enlace activo, los botones principales, los marcadores de sección y los pines de ubicación. Las variantes de hover aclaran el botón sólido y tiñen suavemente el botón delineado.

### Neutral

`bg` sostiene la página; `surface` pertenece al vocabulario de superficies oscuras. `text` aporta el contraste principal y `muted` reduce la importancia de notas e iconos. `border` separa secciones y columnas. Los marcos fotográficos incorporan un degradado gris azulado y un borde más claro.

**The Green Signal Rule.** El verde guía acciones y jerarquía; las grandes superficies continúan oscuras.

## Typography

La familia es Arial, con Helvetica y sans-serif como alternativas. Los encabezados son pesados y de espaciado estrecho; los textos de apoyo mantienen formas familiares y lectura clara.

El display se reserva para el hero. En móvil cambia a `clamp(36px, 11.3vw, 64px)`, interlínea (1) y espaciado (-0.03em). Los títulos de sección pasan a (27px), los títulos de equipo a (18px), y sus descripciones a (14px). El texto introductorio usa `clamp(20px, 2.3vw, 26px)` en escritorio y (16px) en móvil. La localidad usa mayúsculas y espaciado abierto; no extender ese tratamiento a párrafos.

## Layout

El contenedor tiene un máximo de (1200px), con (36px) por lado desde (769px) y (20px) en móvil. El tramo intermedio comprende (769–1100px); los ajustes finales de escritorio conservan el margen de (36px) también en ese tramo. El cambio a móvil ocurre hasta (768px).

El hero dispone texto e imagen en dos columnas iguales; en móvil se apilan. La franja de oferta conserva tres columnas, con iconos encima del texto en móvil. Experiencia pasa de tres columnas con divisores a tres filas de imagen y descripción. Galería pasa de una composición (1.35fr / .85fr / .85fr) a filas compactas. Ubicación pasa de dos columnas a una. Las secciones usan separación superior y espacios verticales compactos.

La separación vertical de sección usa `clamp(20px, 2.3vw, 28px)` en escritorio y (17px) en móvil. El marco del hero tiene un mínimo de (318px) y proporción (1.23) en escritorio, y mínimo de (186px) en móvil. La altura mínima de galería usa `clamp(142px, 16.3vw, 200px)` en escritorio y (60px) en móvil. En móvil la cabecera ofrece un menú desplegable y una acción fija de ubicación al pie. El footer reserva espacio para esa acción. Las imágenes separadas de consola, pantalla y futbolito deben encajar completas conservando la relación de aspecto; su zona visual usa una altura de `clamp(110px, 12.6vw, 170px)` en escritorio y (76px) en móvil.

## Elevation & Depth

La implementación no usa sombras de caja. La profundidad procede del contraste tonal, los degradados del hero y los marcos, y los bordes. Las bandas diagonales verdes pertenecen al hero; las demás secciones mantienen fondos tranquilos.

## Shapes

Los botones tienen esquinas suavemente curvas; los marcos fotográficos usan curvas algo mayores. Los divisores son finos y rectos. Los marcadores de sección son pequeñas barras verdes. Los marcos pendientes añaden esquinas de encuadre verdes opuestas; las filas compactas de galería móvil omiten esos detalles.

## Components

### Buttons

Los botones son sólidos y claros. La acción principal del hero combina verde y texto oscuro, icono de pin y etiqueta: altura mínima (48px), tipografía (18px) y relleno (10px 20px) en escritorio. En móvil conserva la altura mínima (48px) con relleno (10px 18px). La variante de cabecera usa fondo transparente y borde verde: altura mínima (36px), tipografía (14px) y relleno (6px 12px). La acción fija móvil mide al menos (46px) y usa texto de (16px). En hover cambia el fondo; al pulsar se reduce a escala (.97). Las transiciones duran (160ms).

El foco visible usa contorno verde de (3px) separado (5px). El enlace secundario conserva subrayado verde y flecha, sin superficie de botón.

### Photo placeholders

Marcos gris azulados con borde, icono de imagen y texto explícito sobre la fotografía pendiente. El hero usa una superficie amplia; galería utiliza tres superficies que se convierten en filas en móvil. Conservar la distinción entre fotografía real y material de referencia.

### Equipment

Tres ilustraciones identifican consola, pantalla y futbolito. Los archivos WebP son recortes con transparencia nativa, sin fondos opacos. Se muestran completas, sin deformación, junto a título con una línea verde corta y descripción. En escritorio ocupan columnas; en móvil ocupan una columna visual pequeña junto al texto.

### Navigation

La navegación horizontal tiene enlaces claros y sección activa verde con subrayado. En móvil el botón Menú controla la visibilidad y comunica su estado; Escape cierra el menú y devuelve el foco al botón. Los enlaces funcionan como anclas. La sección visible actualiza el estado activo sin mover el foco.

### Location

La dirección usa un pin verde grande. La información pendiente usa icono informativo y texto secundario, separado mediante divisor en escritorio. La acción de ubicación apunta a esta sección mientras no exista un enlace de mapa confirmado.

## Do's and Don'ts

### Do:

- **Do** conservar el contraste carbón, blanco y verde de la propuesta aprobada.
- **Do** mostrar los equipos completos con su proporción original.
- **Do** mantener foco visible, enlace para saltar al contenido y controles táctiles cómodos.
- **Do** respetar movimiento reducido: desplazamiento inmediato, sin transiciones ni escala al pulsar.

### Don't:

- **Don't** presentar ilustraciones o espacios reservados como fotografías reales del local.
- **Don't** añadir sombras elevadas a un sistema que actualmente expresa profundidad con tono y borde.
- **Don't** inventar una nueva identidad, una familia tipográfica o componentes ausentes a partir de esta documentación.
