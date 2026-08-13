import type { Lesson } from '../types';

export const lesson04: Lesson = {
  id: 'routing',
  index: 3,
  title: 'Routing',
  subtitle: 'La URL manda: cada ruta tiene una página.',
  topic: 'opencells',
  sections: [
    {
      type: 'intro',
      text: 'El router es el corazón de una SPA. La idea es muy simple: Open Cells asocia una ruta (un trozo de la URL) con un componente web. Cada vez que la URL cambia, el router busca la ruta que coincide, carga el componente correspondiente y lo renderiza dentro del nodo que definiste en `mainNode`.',
    },
    {
      type: 'problem',
      text: 'Sin router, cambiar de "página" en una SPA es un caos: o recargas el navegador (y pierdes el estado de la app) o haces malabares para saber qué pantalla mostrar. Además, sin URL no puedes compartir un enlace a una pantalla concreta, ni usar los botones atrás/adelante del navegador. Un router une la URL con lo que se ve en pantalla, y de paso te da navegación, historial y enlaces compartibles gratis.',
    },
    {
      type: 'text',
      title: 'Cómo se ven las URLs en Open Cells',
      text: 'Open Cells usa el hash de la URL (`#!`) para las rutas por defecto. Así la app funciona incluso sin configuración especial del servidor, porque el navegador no pide una URL nueva al servidor: solo cambia la parte de después de la `#`. Por ejemplo, `http://localhost:5173/#!/lesson/routing`. Tú defines rutas como `/lesson/:lessonId` y el router traduce eso a la parte `#!...`.',
    },
    {
      type: 'code',
      sample: {
        title: 'Definición de rutas en src/router/routes.ts',
        lang: 'ts',
        code: `import { routes as demoRoutes } from './demo-routes';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: 'home-page',
    action: async () => {
      await import('../pages/home/home-page.js');
    },
  },
  {
    path: '/category/:category',
    name: 'category',
    component: 'category-page',
    action: async () => {
      await import('../pages/category/category-page.js');
    },
  },
  {
    path: '/demo/:demoName',
    name: 'demo',
    component: 'demo-page',
    action: async () => {
      await import('../pages/demo/demo-page.js');
    },
  },
  ...demoRoutes,
];`,
      },
    },
    {
      type: 'explain',
      title: 'Las piezas de una ruta',
      points: [
        '`path` → la ruta definida, tal cual aparece en la URL (después de `#!`). Puede contener parámetros dinámicos: `:category` es un comodín que captura cualquier valor en esa posición (en `/category/perros`, `category` valdría "perros"). También soporta query params (`?clave=valor`).',
        '`name` → el nombre que le das a la ruta. No es decorativo: es lo que usas después para la navegación programática, llamando `navigate(\'category\', {...})`. Nombres cortos y claros, porque los vas a repetir por toda la app.',
        '`component` → el tag name del Web Component que se renderiza al entrar en esa ruta. Es opcional: si no lo pones, Open Cells asume que el componente se llama `nombre-de-la-ruta + \'-page\'` (con la ruta `home`, el componente sería `home-page`).',
        '`action` → función asíncrona que se ejecuta ANTES de renderizar el componente. Aquí es donde haces el `import()` dinámico de la página. Eso significa que el código de cada página solo se descarga del servidor cuando de verdad se necesita (lazy loading). Por eso el import apunta a `../pages/.../xxx-page.js`: el router espera a que el módulo cargue y defina el componente antes de pintarlo.',
        'El parámetro dinámico `:demoName` llega después al componente a través de su propiedad `params`, que verás en la demo de abajo.',
      ],
    },
    {
      type: 'note',
      text: 'Detalle de versión: en algunas versiones el router admite un `notFound: true` en una ruta para que actúe como página 404 (se muestra cuando ninguna ruta coincide). Es un extra útil, pero no imprescindible para empezar.',
    },
    {
      type: 'demo',
      title: 'Pruébalo: navega entre 3 páginas y mira la URL',
      description:
        'Las tres páginas de esta demo son rutas reales de esta aplicación. Usa los botones (o los enlaces con hash `#!/demo/a`) y observa cómo cambia la URL del navegador y qué componente se pinta.',
      component: 'demo-routing',
      howTo: [
        'Pulsa los botones A, B o C y mira la barra de direcciones: la URL cambia a `#!/demo/a`, `#!/demo/b` o `#!/demo/c`.',
        'El panel muestra la URL actual en tiempo real, la ruta `name` que coincide y el valor del parámetro `:demoName`.',
        'Usa los botones atrás/adelante del navegador: la SPA responde sin recargar.',
      ],
    },
    {
      type: 'summary',
      points: [
        'Cada ruta asocia un `path` con un `component` (página).',
        '`name` te da un identificador estable para navegar sin depender de la URL.',
        '`action` carga la página bajo demanda con `import()` dinámico.',
        'Los parámetros dinámicos (`:algo`) capturan trozos variables de la URL.',
        'Open Cells usa el hash `#!` por defecto, así que no necesitas configuración de servidor.',
      ],
    },
  ],
};
