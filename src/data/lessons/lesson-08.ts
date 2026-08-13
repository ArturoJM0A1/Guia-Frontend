import type { Lesson } from '../types';

export const lesson08: Lesson = {
  id: 'controllers',
  index: 7,
  title: 'Controllers',
  subtitle: 'El "control remoto" que le da superpoderes a tus componentes.',
  topic: 'opencells',
  sections: [
    {
      type: 'intro',
      text: 'Hasta ahora hemos usado métodos como `publish`, `subscribe` o `navigate` como si cayeran del cielo. En realidad vienen de un objeto llamado controller (controlador). Un controller es un objeto que se "enchufa" a un componente para dotarle de funcionalidad. Open Cells trae dos: `ElementController` y `PageController`.',
    },
    {
      type: 'problem',
      text: 'Si cada componente tuviera que implementar a mano la comunicación con el router y los canales, habría cientos de líneas repetidas y mil formas distintas de hacer lo mismo. Un controller encapsula esa funcionalidad en un objeto reutilizable: se crea en una línea y el componente ya sabe publicar, suscribirse y navegar.',
    },
    {
      type: 'text',
      title: 'ElementController: el control remoto básico',
      text: 'Se enchufa a CUALQUIER componente (páginas, cabeceras, tarjetas, lo que sea) y le da: publicar y suscribirse a canales, desuscribirse, navegar, retroceder y consultar la ruta actual. Si tu componente no es una página, este es el que necesitas.',
    },
    {
      type: 'table',
      title: 'Métodos de ElementController',
      caption: 'Lo que gana un componente al enchufar un ElementController',
      headers: ['Método', 'Qué hace'],
      rows: [
        ['subscribe(channel, callback)', 'Escucha un canal y ejecuta el callback con cada valor nuevo.'],
        ['unsubscribe(channel)', 'Deja de escuchar ese canal.'],
        ['publish(channel, value)', 'Publica un valor en un canal.'],
        ['publishOn(channel, element, eventName)', 'Publica el detail.value de un evento de un elemento en el canal.'],
        ['navigate(page, params)', 'Navega a una página por su nombre (y sus parámetros).'],
        ['backStep()', 'Vuelve a la página anterior del historial.'],
        ['getCurrentRoute()', 'Devuelve la información de la ruta actual (name, params, query...).'],
      ],
    },
    {
      type: 'text',
      title: 'PageController: el control remoto de las páginas',
      text: '`PageController` es `ElementController` con extras pensados para componentes que son páginas. Hereda todo lo anterior y añade dos hooks de ciclo de vida: `onPageEnter` y `onPageLeave`. Además, la página recibe automáticamente sus `params` de la ruta. En resumen: para páginas usas PageController; para el resto, ElementController.',
    },
    {
      type: 'table',
      title: 'ElementController vs PageController',
      caption: 'Quién ofrece cada cosa',
      headers: ['Capacidad', 'ElementController', 'PageController'],
      rows: [
        ['publish / subscribe / unsubscribe', 'Sí', 'Sí (lo hereda)'],
        ['navigate / backStep / getCurrentRoute', 'Sí', 'Sí (lo hereda)'],
        ['onPageEnter / onPageLeave', 'No', 'Sí'],
        ['Recibir params de la ruta', 'No', 'Sí'],
      ],
    },
    {
      type: 'code',
      sample: {
        title: 'Un componente normal con ElementController',
        lang: 'ts',
        code: `import { LitElement } from 'lit';
import { ElementController } from '@open-cells/element-controller';

export class CartBadge extends LitElement {
  elementController = new ElementController(this);

  connectedCallback() {
    super.connectedCallback();
    this.elementController.subscribe('cart', (items) => {
      this._items = items;
      this.requestUpdate();
    });
  }
}`,
      },
    },
    {
      type: 'code',
      sample: {
        title: 'Una página con PageController',
        lang: 'ts',
        code: `import { LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';

export class CategoryPage extends LitElement {
  pageController = new PageController(this);

  onPageEnter() {
    // Se ejecuta cuando la página entra en pantalla
    console.log('category-page entró en pantalla');
  }

  onPageLeave() {
    // Se ejecuta cuando la página sale de pantalla
    console.log('category-page salió de pantalla');
  }
}`,
      },
    },
    {
      type: 'explain',
      title: 'Diferencias en cristiano',
      points: [
        'Ambos controllers se crean igual: `new XController(this)`, pasándole el componente (el "this") como anfitrión.',
        'En el `connectedCallback` del componente es donde normalmente te suscribes: es el momento en que el componente se añade al DOM y ya existe un anfitrión conectado.',
        'Un widget (una barra de carrito, un botón, un contador) usa `ElementController`: necesita estado y navegación, pero no es una página.',
        'Una página usa `PageController`: además de lo anterior, necesita saber cuándo entra y sale de pantalla, y recibir sus parámetros de URL.',
        'El controller es el intermediario: tu componente no habla con el core directamente, habla con su controller.',
      ],
    },
    {
      type: 'demo',
      title: 'Pruébalo: controllers en acción',
      description:
        'Este panel tiene enchufado un ElementController. Puedes comprobar en vivo que publica, se suscribe y consulta la ruta. Y la página que estás viendo ahora mismo (la lección) usa un PageController: por eso nota si entras y sales.',
      component: 'demo-controllers',
      howTo: [
        'Pulsa "Probar publish" y mira el log: se publica en un canal y el propio panel lo recibe, como receptor.',
        'Pulsa "Probar navigate": irá a la página demo con navegación programática (después usa el botón de volver).',
        'Pulsa "Ruta actual": te muestra lo que devuelve getCurrentRoute() en este momento.',
      ],
    },
    {
      type: 'summary',
      points: [
        'Un controller es un objeto que se enchufa a un componente y le da funcionalidad.',
        '`ElementController` da estado (publish/subscribe/unsubscribe), navegación y consulta de ruta.',
        '`PageController` extiende a ElementController y añade `onPageEnter`, `onPageLeave` y los params de la ruta.',
        'Regla práctica: página → PageController; lo que no sea página → ElementController.',
      ],
    },
  ],
};
