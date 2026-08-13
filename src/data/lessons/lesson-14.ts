import type { Lesson } from '../types';

export const lesson14: Lesson = {
  id: 'polymer',
  index: 13,
  title: 'Polymer',
  subtitle: 'El antepasado que hizo popular a los Web Components.',
  topic: 'frameworks',
  sections: [
    {
      type: 'intro',
      text: 'Polymer fue una librería de Google (nacida en 2013) que hizo una apuesta enorme: que los Web Components fueran el futuro de la web. En aquella época los navegadores aún no los soportaban del todo, así que Polymer aportaba los "polyfills" necesarios y, por encima, una capa cómoda para escribir componentes con bindings declarativos. Con el tiempo, los navegadores incorporaron los estándares y Polymer simplificó su API... y de esa simplificación nació Lit. Por eso, entender Polymer es entender de dónde vienen tanto Lit como el propio Open Cells.',
    },
    {
      type: 'problem',
      text: 'A la vez que la plataforma no estaba lista, escribir componentes con JavaScript puro era muy laborioso: había que construir strings de HTML, sincronizar datos a mano y teclear muchísimo. Polymer dio un paso adelante: propiedades declarativas, bindings en el propio template y eventos conectados con sintaxis mínima. Fue el puente que enseñó a una generación de desarrolladores a pensar en "componentes web reutilizables".',
    },
    {
      type: 'text',
      title: 'Arquitectura: componentes, propiedades y bindings',
      text: 'En Polymer, un componente extiende `PolymerElement`, define un template y declara sus propiedades. Lo llamativo era el sistema de bindings del template: con una sintaxis pequeña podías conectar una propiedad a un input (two-way), mostrar valores (one-way) o disparar métodos con eventos, sin escribir nada de JavaScript de pegado.',
    },
    {
      type: 'code',
      sample: {
        title: 'Un elemento Polymer clásico',
        lang: 'js',
        code: `import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class MiElemento extends PolymerElement {
  static get template() {
    return html\`
      <input value="{{mensaje::input}}" placeholder="Escribe algo...">

      <p>Dices: <b>[[mensaje]]</b></p>

      <button on-click="_saludar">Saludar</button>
    \`;
  }

  static get properties() {
    return {
      mensaje: { type: String, value: 'hola' },
    };
  }

  _saludar() {
    this.mensaje = '¡Hola desde Polymer!';
  }
}

customElements.define('mi-elemento', MiElemento);`,
      },
    },
    {
      type: 'explain',
      title: 'Descifrando la sintaxis',
      points: [
        '`[[mensaje]]` → binding one-way: el valor de la propiedad se muestra en el HTML y se actualiza solo cuando cambia. Con el tiempo pasó a `[[...]]` y a `{{...}}` para dos direcciones.',
        '`{{mensaje::input}}` → binding two-way: el input actualiza la propiedad `mensaje` (evento `input`), y a la vez el resto de la plantilla reacciona. Era la forma corta de "value + oninput" sin escribir JavaScript.',
        '`on-click="_saludar"` → conexión de eventos en el template: el método `_saludar` se llama al pulsar el botón. Hoy en día escribirías `@click` con Lit.',
        '`properties` → declaración central: el tipo y el valor inicial de cada propiedad. Es el abuelo de `@property`/`@state` de Lit.',
        'Al final, `customElements.define(...)`: los componentes Polymer son Web Components de verdad, con su Shadow DOM.',
      ],
    },
    {
      type: 'text',
      title: 'Bindings en detalle',
      text: 'La distinción clave de Polymer era la dirección del flujo de datos. `[[expresión]]` va en un sentido: propiedad → vista (solo lectura, ideal para mostrar). `{{expresión}}` va en dos: propiedad ↔ vista (editable, ideal para formularios). Pensar en "quién puede escribir cada dato" es una lección que sigue viva en todos los frameworks actuales.',
    },
    {
      type: 'table',
      title: 'One-way vs two-way',
      caption: 'La dirección del flujo de datos en Polymer',
      headers: ['Binding', 'Dirección', 'Cuándo usarlo'],
      rows: [
        ['[[valor]]', 'Solo lectura: propiedad → vista', 'Mostrar un dato que nadie edita'],
        ['{{valor}}', 'Dos direcciones: propiedad ↔ vista', 'Inputs y formularios que editan el estado'],
        ['on-evento="metodo"', 'Evento → método', 'Reaccionar a interacciones del usuario'],
      ],
    },
    {
      type: 'text',
      title: 'Reutilización de componentes',
      text: 'Polymer hizo popular la idea de un "catálogo de componentes": piezas pequeñas y bien hechas que se combinan como bloques. Un componente de Polymer puede incluir a otros dentro de su template, pasarles datos con bindings y recibir sus eventos. Esa composición (componentes dentro de componentes, conectados por datos) es exactamente la misma filosofía que usan Lit, React y Angular hoy, y la que Open Cells aplica con sus páginas y sus canales.',
    },
    {
      type: 'code',
      sample: {
        title: 'Componer elementos dentro de otros',
        lang: 'js',
        code: `class ListaDeCosas extends PolymerElement {
  static get template() {
    return html\`
      <dom-repeat items="{{items}}">
        <template>
          <mi-elemento mensaje="[[item]]"></mi-elemento>
        </template>
      </dom-repeat>
    \`;
  }

  static get properties() {
    return {
      items: { type: Array, value: () => ['a', 'b', 'c'] },
    };
  }
}`,
      },
    },
    {
      type: 'explain',
      title: 'Qué hace este ejemplo',
      points: [
        '`<dom-repeat>` → repite un template por cada elemento de la lista (el abuelo de `*ngFor` y de `.map()`).',
        'Dentro del bucle, `[[item]]` pasa cada valor a la propiedad `mensaje` del hijo: composición por datos, sin referencias manuales.',
        'La idea clave: cada pieza recibe lo que necesita por propiedades y comunica cambios con eventos. Tu trabajo es componerlas, no "pegar" componentes entre sí.',
        'Polymer como tal ya no se mantiene (su equipo lo migró a Lit), pero su ADN —componentes web + bindings + composición— sigue en todo el ecosistema actual.',
      ],
    },
    {
      type: 'note',
      text: 'Conexión con Open Cells: el mundo "cells" de BBVA (del que Open Cells hereda su nombre y su enfoque de canales y páginas) creció en esta época y usaba componentes basados en Polymer. El salto a Lit mantuvo la filosofía pero simplificó la API. Cuando veas Lit y Open Cells trabajando juntos, estás viendo la evolución natural de esta historia.',
    },
    {
      type: 'demo',
      title: 'Pruébalo: los bindings de Polymer, en vivo',
      description: 'Una demo que simula las ideas de Polymer (construida con Lit, que es su heredero): bindings de una y dos direcciones, eventos en el template y listas repetidas.',
      component: 'demo-polymer',
      howTo: [
        'En el bloque 1 ([[mensaje]]), pulsa los botones y fíjate en que la vista reacciona sola al cambio de estado: una sola flecha, propiedad → vista.',
        'En el bloque 2 ({{editable::input}}), escribe en el input: aquí la flecha es doble, el input edita el estado.',
        'Pulsa "Saludar" varias veces (bloque 3) y añade elementos (bloque 4) para ver los contadores y las listas en acción.',
      ],
    },
    {
      type: 'summary',
      points: [
        'Polymer popularizó los Web Components y aportó bindings declarativos.',
        '`[[valor]]` = one-way; `{{valor}}` = two-way; `on-evento` = métodos en el template.',
        'Defendió la composición: componentes pequeños conectados por datos y eventos.',
        'Su evolución dio lugar a Lit, el heredero moderno.',
        'Su filosofía (componentes + bindings + composición) está en todos los frameworks actuales.',
      ],
    },
  ],
};
