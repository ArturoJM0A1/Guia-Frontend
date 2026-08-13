import type { Lesson } from '../types';

export const lesson03: Lesson = {
  id: 'inicializacion',
  index: 2,
  title: 'Inicialización',
  subtitle: 'startApp(): el interruptor general de la app.',
  topic: 'opencells',
  sections: [
    {
      type: 'intro',
      text: 'Toda app Open Cells arranca igual: se llama a una función llamada `startApp()` pasándole la configuración. Es el momento en el que Open Cells "despierta": crea el router, los canales de comunicación y deja todo listo para que la app empiece a responder a la URL.',
    },
    {
      type: 'problem',
      text: 'Alguien tiene que montar el andamiaje: escuchar los cambios de URL, decidir qué componente pintar, mantener los canales de estado. Si haces esto a mano en cada proyecto, acabas copiando y pegando el mismo código de arranque una y otra vez. `startApp()` encapsula todo ese andamiaje en una sola llamada.',
    },
    {
      type: 'text',
      title: 'Dónde vive el arranque',
      text: 'Por convención, el arranque se hace en el componente raíz de la app, `src/components/app-index.ts`. Este componente es el que el `index.html` carga con la etiqueta `<app-index id="app-content">` y es el nodo donde Open Cells renderizará las páginas.',
    },
    {
      type: 'code',
      sample: {
        title: 'El arranque de una app Open Cells (app-index.ts)',
        lang: 'ts',
        code: `import { startApp } from '@open-cells/core';
import { routes } from '../router/routes.js';

startApp({
  routes,
  mainNode: 'app-content',
});`,
      },
    },
    {
      type: 'explain',
      title: 'Línea por línea',
      points: [
        '`import { startApp } from \'@open-cells/core\'` → trae del paquete principal la función que inicializa todo. Es el único "conector" con el core que necesita tu componente raíz.',
        '`import { routes } from \'../router/routes.js\'` → trae el mapa de rutas que definimos en la carpeta router. Es la lista de "si la URL es X, pinta el componente Y".',
        '`startApp({...})` → se ejecuta una sola vez y hace el bootstrapping: crea el puente (bridge) interno, el router y los canales.',
        '`routes` → las rutas que Open Cells debe conocer y hacer coincidir con la URL.',
        '`mainNode: \'app-content\'` → el id del elemento HTML donde se van a renderizar las páginas. Open Cells busca `#app-content` (nuestro `<app-index>`) y va colocando ahí la página activa.',
        'Cuando `startApp` termina, el router arranca mirando la URL actual y muestra la primera página: como la app siempre empieza en `/`, es obligatorio tener una ruta para el path `/`.',
      ],
    },
    {
      type: 'code',
      sample: {
        title: 'El index.html que lo sostiene todo',
        lang: 'html',
        code: `<!DOCTYPE html>
<html lang="es">
  <head>
    <link rel="stylesheet" href="/src/css/main.css" />
  </head>
  <body>
    <!-- El nodo donde Open Cells monta las páginas -->
    <app-index id="app-content"></app-index>

    <!-- El script que ejecuta el arranque -->
    <script type="module" src="src/components/app-index.ts"></script>
  </body>
</html>`,
      },
    },
    {
      type: 'explain',
      title: 'Qué hace cada pieza del HTML',
      points: [
        '`<app-index id="app-content">` → aquí vive la app. El componente `app-index` dibuja el marco (menú, cabecera...) y Open Cells inserta dentro la página activa.',
        'El `id="app-content"` es el que le pasamos a `startApp` como `mainNode`. Es el puente entre el HTML y la configuración.',
        'El `<script type="module">` importa `app-index.ts`, que al ejecutarse define el componente `app-index` y llama a `startApp`.',
      ],
    },
    {
      type: 'demo',
      title: 'Pruébalo: esta app ya está inicializada',
      description:
        'Esta aplicación está funcionando gracias al mismo `startApp({ routes, mainNode })` que acabas de ver. Este panel consulta el estado del router en vivo: la ruta actual que Open Cells tiene registrada.',
      component: 'demo-initialization',
      howTo: [
        'Pulsa "Consultar ruta actual" para ver el objeto de ruta que el router está manejando ahora mismo.',
        'Cambia de lección y vuelve: verás que `name` y `params` reflejan la página activa.',
      ],
    },
    {
      type: 'summary',
      points: [
        '`startApp({ routes, mainNode })` inicializa routing, estado y configuración en una sola llamada.',
        '`mainNode` indica dónde se renderizan las páginas (el id de un elemento del HTML).',
        'El arranque vive normalmente en `app-index.ts`, que se carga desde el `index.html`.',
        'La app siempre arranca en `/`, así que esa ruta debe existir sí o sí.',
      ],
    },
  ],
};
