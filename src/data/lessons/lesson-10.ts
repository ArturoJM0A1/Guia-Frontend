import type { Lesson } from '../types';

export const lesson10: Lesson = {
  id: 'app-context',
  index: 9,
  title: 'App Context',
  subtitle: 'El canal que sabe dónde estás y de dónde vienes.',
  topic: 'opencells',
  sections: [
    {
      type: 'intro',
      text: 'Open Cells mantiene un canal especial, privado y de solo lectura, que describe el estado de la navegación en todo momento. Se llama app context (contexto de la aplicación) y su contenido es un objeto con dos campos que valen oro: `currentPage` (la página activa) y `fromPage` (la página activa anterior).',
    },
    {
      type: 'problem',
      text: 'Hay funcionalidades que dependen de "dónde está el usuario": mostrar un botón de volver solo si vienes de cierta página, cambiar la cabecera según la sección, hacer analytics de navegación. Para eso necesitas saber la página actual y la anterior en cualquier momento, sin tener que adivinarlo tú. El app context te lo da servido.',
    },
    {
      type: 'code',
      sample: {
        title: 'Leer el contexto de la aplicación',
        lang: 'ts',
        code: `// En cualquier componente con controller:
this.pageController.subscribe('__bridge_app', (appContext) => {
  const { currentPage, fromPage } = appContext;
  console.log('Estás en:', currentPage, 'y vienes de:', fromPage);
});`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        'El canal `__bridge_app` (en las versiones actuales se llama `__oc_app`) es un canal privado que Open Cells crea al arrancar y actualiza en cada navegación.',
        '`currentPage` → el nombre (`name` de la ruta) de la página activa. Por ejemplo, cuando estás en esta lección, vale `lesson`.',
        '`fromPage` → el nombre de la página anterior. En la primera navegación, cuando no hay página anterior, es `undefined` (por eso a veces lo verás como "-").',
        'Es de solo lectura: puedes suscribirte y leerlo, pero Open Cells bloquea publicar en él. El único que lo escribe es el propio core.',
        'Como todo canal, conserva el último valor: si te suscribes tarde, recibes al instante el contexto actual.',
      ],
    },
    {
      type: 'note',
      text: 'Cuidado con el nombre del canal según la versión: la documentación y muchos tutoriales lo llaman `__bridge_app`. En las versiones actuales de Open Cells (core 1.2.x) el prefijo interno cambió a `__oc`, así que el canal real es `__oc_app`. Si algún día no te llega el valor, comprueba el prefijo que usa tu versión del core. En esta app usamos `__oc_app`, que es el que funciona con la versión instalada.',
    },
    {
      type: 'demo',
      title: 'Pruébalo: mira el contexto en vivo',
      description:
        'Este panel está suscrito al canal `__oc_app`. Cada vez que navegues, actualizará la página actual y la anterior. Es como un "volante" de dónde estás.',
      component: 'demo-app-context',
      howTo: [
        'Observa ahora: deberías ver "Página actual: lesson" y la página anterior.',
        'Ve al menú lateral y entra en otra lección: verás cómo `currentPage` y `fromPage` se actualizan solos.',
        'La demo muestra también el objeto completo, tal y como llega del canal.',
      ],
    },
    {
      type: 'summary',
      points: [
        'El app context es un canal privado con la página actual y la anterior.',
        '`currentPage` = página activa; `fromPage` = página de la que vienes.',
        'Es de solo lectura: solo el core lo escribe.',
        'El nombre del canal varía según la versión (`__bridge_app` antiguo, `__oc_app` actual).',
      ],
    },
  ],
};
