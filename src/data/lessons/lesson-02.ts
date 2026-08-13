import type { Lesson } from '../types';

export const lesson02: Lesson = {
  id: 'estructura-de-una-aplicacion',
  index: 1,
  title: 'Estructura de una aplicación',
  subtitle: 'Pocas carpetas, reglas claras y cero opiniones raras.',
  topic: 'opencells',
  sections: [
    {
      type: 'intro',
      text: 'A Open Cells no le importa dónde pongas cada archivo... con una condición: que exista la configuración de rutas y que haya componentes web que actúen como páginas. Aun así, el proyecto oficial de ejemplo sugiere una estructura de carpetas que mantiene todo en su sitio y que vas a encontrar en casi todas las apps Open Cells del mundo real.',
    },
    {
      type: 'problem',
      text: 'En una app grande, si cada programador pone los archivos donde le parece, al mes ya nadie encuentra nada: "¿dónde estaba ese componente de cabecera? ¿las rutas estaban en src o en la raíz?". Tener una estructura predecible hace que entrar en un proyecto nuevo sea mucho más rápido: sabes dónde mirar sin tener que preguntar.',
    },
    {
      type: 'text',
      title: 'El árbol de carpetas',
      text: 'Esta es la estructura que genera el comando oficial de creación de apps (npx @open-cells/create-app) y la que sigue la mayoría de proyectos:',
    },
    {
      type: 'code',
      sample: {
        title: 'Estructura sugerida de una app Open Cells',
        lang: 'bash',
        code: `open-cells-app/
├── package.json          # dependencias y scripts (dev, build...)
├── tsconfig.json
├── index.html            # documento donde se monta la app
├── images/               # estáticos (favicon, logos...)
└── src/
    ├── components/       # componentes de la app (incluido app-index)
    ├── pages/            # una carpeta por página
    │   ├── home/
    │   │   └── home-page.ts
    │   └── second/
    │       └── second-page.ts
    ├── css/              # estilos globales y por página
    └── router/
        └── routes.ts     # la configuración de rutas`,
      },
    },
    {
      type: 'explain',
      title: 'Qué responsabilidad tiene cada carpeta',
      points: [
        '`src/components/` → piezas de interfaz reutilizables y componentes "de app": menús, cabeceras, tarjetas... y el `app-index`, el componente raíz que arranca la app y pinta el marco general (en esta app, el menú lateral y la barra de progreso).',
        '`src/pages/` → una carpeta por página, y dentro un componente que termina en `-page` (`home-page`, `second-page`...). Cada `-page` está asociada a una ruta y se carga bajo demanda.',
        '`src/router/` → el archivo `routes.ts` que exporta la lista de rutas. Es el "mapa" que le das a Open Cells al arrancar.',
        '`src/css/` → los estilos. Puedes tener un `main.css` global (cargado en el index.html) y hojas por página si lo necesitas.',
        '`index.html` → el documento único de la SPA. Contiene el `<app-index id="app-content">` (el nodo donde Open Cells renderiza las páginas) y el `<script>` que importa el arranque.',
      ],
    },
    {
      type: 'note',
      text: 'Importante: Open Cells no obliga a esta estructura exacta. Es una sugerencia. Lo único imprescindible es que exista una configuración de rutas y componentes web que actúen como páginas. La estructura es para que tu cerebro (y el de tu equipo) sepa dónde buscar.',
    },
    {
      type: 'demo',
      title: 'Pruébalo: el árbol de esta app',
      description:
        'Esta aplicación sigue exactamente la estructura que acabas de ver. Expande las carpetas y comprueba que cada pieza que hemos explicado existe aquí, de verdad.',
      component: 'oc-tree',
      howTo: ['Haz clic sobre una carpeta para expandirla o plegarla.'],
    },
    {
      type: 'summary',
      points: [
        'Open Cells pide muy poco: rutas + componentes de página. El resto es organización tuya.',
        'La estructura de ejemplo separa componentes, páginas, rutas y estilos en carpetas claras.',
        'Cada página vive en `src/pages/<nombre>/<nombre>-page.ts`.',
        'Las rutas viven en `src/router/routes.ts`.',
      ],
    },
  ],
};
