import type { Lesson } from '../types';

export const lesson09: Lesson = {
  id: 'lifecycle',
  index: 8,
  title: 'Ciclo de vida de una página',
  subtitle: 'onPageEnter y onPageLeave: cuando tu página aparece y desaparece.',
  topic: 'opencells',
  sections: [
    {
      type: 'intro',
      text: 'Cuando trabajas con páginas, casi siempre necesitas hacer cosas "al entrar" y "al salir": cargar datos cuando la página aparece, guardar o limpiar cosas cuando desaparece. Open Cells te da dos hooks para eso: `onPageEnter` (la página acaba de entrar en pantalla) y `onPageLeave` (la página acaba de salir).',
    },
    {
      type: 'problem',
      text: 'Un componente `connectedCallback` (el ciclo de vida del Web Component) NO basta para una página. Porque Open Cells puede mantener varias páginas montadas en el DOM aunque no se vean, o reutilizarlas. Tú necesitas saber cuándo la página está ACTIVA (visible para el usuario), y eso lo sabe Open Cells, no el navegador. Por eso existen estos hooks específicos de página.',
    },
    {
      type: 'code',
      sample: {
        title: 'Los hooks de una página',
        lang: 'ts',
        code: `import { LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';

export class SecondPage extends LitElement {
  pageController = new PageController(this);

  onPageEnter() {
    // Cargar los datos de la página, arrancar cosas...
    console.log('SecondPage: entré en pantalla');
  }

  onPageLeave() {
    // Guardar estado, limpiar temporizadores, soltar recursos...
    console.log('SecondPage: salí de pantalla');
  }
}`,
      },
    },
    {
      type: 'explain',
      title: 'Cuándo y cómo se disparan',
      points: [
        '`onPageEnter` se ejecuta cuando la página pasa a ser la activa: al llegar a ella navegando, o al volver atrás hacia ella. Es el lugar natural para cargar datos de la página.',
        '`onPageLeave` se ejecuta cuando la página deja de ser la activa: porque navegas a otra. Es el lugar para "recoger" antes de irse: parar temporizadores, guardar formularios a medias, liberar suscripciones...',
        'Internamente no es magia: Open Cells publica en un canal privado de la página (`__oc_page_<nombre>`) un valor `true`/`false`, y el `PageController` de la página está suscrito a ese canal. Cuando le llega `true`, llama a tu `onPageEnter`; cuando llega `false`, a tu `onPageLeave`. Tú solo escribes los métodos; del cableado se encarga el controller.',
        'No confundir con `connectedCallback`/`disconnectedCallback` (que son del Web Component y se disparan al montar/desmontar del DOM). Estos hooks son del "view" de la app: aparecer/desaparecer de pantalla.',
      ],
    },
    {
      type: 'demo',
      title: 'Pruébalo: observa entradas y salidas',
      description:
        'La página de la lección en la que estás tiene definidos `onPageEnter` y `onPageLeave`, y aquí abajo publican un registro en el canal `lifecycle-events`. Ve a otra página y vuelve: verás el orden exacto de los eventos.',
      component: 'demo-lifecycle',
      howTo: [
        'Pulsa "Ir a una página demo": cuando esta lección salga de pantalla se registrará un "leave".',
        'Vuelve con el botón de la página demo: se registrará un "enter".',
        'Cambia de lección desde el menú lateral y mira cómo se van apilando los eventos.',
      ],
    },
    {
      type: 'summary',
      points: [
        '`onPageEnter` se ejecuta cuando la página entra en pantalla; `onPageLeave` cuando sale.',
        'Úsalos para cargar datos (enter) y limpiar/guardar (leave).',
        'El PageController conecta estos hooks a través del canal privado de la página.',
        'Son distintos del ciclo de vida del Web Component: son el ciclo de vida de la página como vista.',
      ],
    },
  ],
};
