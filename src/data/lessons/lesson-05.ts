import type { Lesson } from '../types';

export const lesson05: Lesson = {
  id: 'navegacion-programatica',
  index: 4,
  title: 'Navegación programática',
  subtitle: 'Decirle a la app a dónde ir, sin tocar la URL a mano.',
  topic: 'opencells',
  sections: [
    {
      type: 'intro',
      text: 'Hasta ahora la navegación dependía de que la URL cambiara (un enlace, el usuario escribiendo la URL...). Pero muchas veces quieres navegar desde el código: cuando se envía un formulario, cuando una operación termina, cuando el usuario pulsa un botón. Para eso Open Cells ofrece la navegación programática.',
    },
    {
      type: 'problem',
      text: 'Cambiar la URL a mano (`window.location.hash = ...`) funciona, pero es frágil: hay que saber exactamente qué formato usa el router, y si mañana cambias el path de una ruta, tendrías que actualizar todos los sitios donde la URL se construía a mano. La navegación programática evita eso: le dices a Open Cells el NOMBRE de la página, y él se encarga de construir la URL correcta.',
    },
    {
      type: 'code',
      sample: {
        title: 'Navegar por nombre de ruta con parámetros',
        lang: 'ts',
        code: `// Dentro de un componente de página que tiene un pageController:

this.pageController.navigate('category', { category: 'example' });`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`this.pageController` → el controlador que tu componente tiene (lo veremos a fondo en la lección de controllers). Aporta, entre otras cosas, la navegación.',
        '`navigate(...)` → el método que le pide a Open Cells ir a una página.',
        '`\'category\'` → el NOMBRE de la ruta que definiste en `routes.ts`, no su URL. Open Cells lo traduce internamente al path correspondiente.',
        '`{ category: \'example\' }` → los parámetros de la ruta. Como la ruta era `/category/:category`, este objeto rellena el `:category` y la URL resultante será `#!/category/example`.',
        'En lugar de cambiar la URL manualmente, el controlador le dice a Open Cells a qué página queremos ir. Tú describes el destino; Open Cells construye la URL.',
      ],
    },
    {
      type: 'text',
      title: 'La ventaja de navegar por nombre',
      text: 'Si un día decides que la categoría ya no vive en `/category/:category` sino en `/seccion/:category`, solo cambias el `path` en `routes.ts`. Todos los `navigate(\'category\', ...)` de tu app siguen funcionando sin tocar una sola línea. Acoplar el código al nombre de la ruta (estable) en lugar de a la URL (variable) es lo que hace que la app sea mantenible.',
    },
    {
      type: 'demo',
      title: 'Pruébalo: botones que navegan programáticamente',
      description:
        'Estos botones no tienen href: cada uno llama a `navigate(\'demo\', { demoName: ... })`. Observa que la URL cambia igualmente y que el historial del navegador funciona.',
      component: 'demo-programmatic-nav',
      howTo: [
        'Pulsa cada botón y mira la URL: cambia a pesar de que no hay ningún enlace.',
        'Vuelve a esta lección con el botón "Volver a esta lección", que también usa navegación programática.',
      ],
    },
    {
      type: 'summary',
      points: [
        '`navigate(name, params)` lleva a la página por su nombre de ruta.',
        'El nombre es estable; la URL puede cambiar sin romper tu código.',
        'Los parámetros del objeto rellenan los `:parametros` de la ruta.',
        'Navegación programática = describir el destino, no construir la URL.',
      ],
    },
  ],
};
