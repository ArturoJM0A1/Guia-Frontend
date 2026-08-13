# Open Cells desde cero

Curso interactivo para aprender **Open Cells**, construido con Open Cells. Explica los conceptos del framework a través de 25 lecciones en español, cada una con teoría, ejemplos de código y demos interactivas que puedes probar en el navegador.

## Cómo usarlo

Instala las dependencias con `npm install` y arranca el servidor de desarrollo con `npm run dev`. Abre la URL que indica la consola (normalmente `http://localhost:5173`) y navega por el menú lateral. Para generar la versión de producción usa `npm run build` y sírvela con `npm run preview`.

## Contenido

Las lecciones recorren los fundamentos de Open Cells: componentes, canales, routing, controladores, ciclo de vida, contexto de app y arquitectura. Después entra en los ecosistemas: Web Components, Lit, Polymer, React, Angular, Bootstrap y TypeScript. Termina con estructuras de datos, buenas prácticas y testing con mocks.

## Estructura

Las lecciones viven en `src/data/lessons/`, los componentes de ejemplo en `src/components/demos/` y el layout y la navegación en `src/components/app-index.ts`. Si quieres añadir una lección, crea su archivo en `src/data/lessons/`, regístralo en `src/data/lessons.ts` y reinicia el servidor.
