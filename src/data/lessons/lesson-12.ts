import type { Lesson } from '../types';

export const lesson12: Lesson = {
  id: 'web-components',
  index: 11,
  title: 'Web Components',
  subtitle: 'Los bloques LEGO del navegador: Custom Elements, Shadow DOM y ciclo de vida.',
  topic: 'plataforma',
  sections: [
    {
      type: 'intro',
      text: 'Los Web Components son el sistema nativo del navegador para crear componentes reutilizables: etiquetas HTML con comportamiento, HTML interno y CSS aislado. No necesitan ninguna librería: los entiende Chrome, Firefox, Safari y Edge sin instalar nada. Open Cells construye sus páginas encima de ellos, así que entenderlos es entender los cimientos de todo lo que has visto en el curso.',
    },
    {
      type: 'problem',
      text: 'Antes de los Web Components, reutilizar una pieza de interfaz (una tarjeta, un acordeón, un menú) significaba copiar y pegar HTML, o importar un plugin gigante que peleaba con el resto del CSS. El navegador no tenía ninguna forma de decir "esto es un componente con su propio estilo". El resultado: HTML repetido, estilos que chocan entre sí y código difícil de mantener. Los Web Components son la respuesta del propio navegador a ese problema.',
    },
    {
      type: 'text',
      title: 'Las tres piezas de la receta',
      text: 'Los Web Components se apoyan en tres tecnologías del navegador: `Custom Elements` (defines una etiqueta nueva y la asocias a una clase), `Shadow DOM` (aislas el HTML y el CSS internos del resto del documento) y `HTML Templates` (marcado que se puede clonar). En esta lección nos centramos en las dos primeras, que son las que usan las páginas de Open Cells, y en el ciclo de vida de un elemento.',
    },
    {
      type: 'text',
      title: 'Custom Elements: tus propias etiquetas',
      text: '`customElements.define(\'mi-etiqueta\', MiClase)` registra una etiqueta nueva en el navegador. A partir de ese momento, `<mi-etiqueta>` funciona en cualquier parte del documento. La etiqueta es una clase que extiende `HTMLElement` y puede tener atributos, métodos y contenido.',
    },
    {
      type: 'code',
      sample: {
        title: 'Un Custom Element sin framework, solo JavaScript',
        lang: 'js',
        code: `class SaludoTarjeta extends HTMLElement {
  // Se ejecuta cuando el elemento se conecta al DOM
  connectedCallback() {
    const nombre = this.getAttribute('nombre') || 'mundo';
    this.innerHTML = \`<strong>Hola, \${nombre}</strong>\`;
  }
}

customElements.define('saludo-tarjeta', SaludoTarjeta);

// A partir de aquí puedes usar en el HTML:
// <saludo-tarjeta nombre="Ana"></saludo-tarjeta>`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`extends HTMLElement` → tu clase ES un elemento HTML de verdad, con sus métodos y eventos.',
        '`connectedCallback()` → método del ciclo de vida: se llama cada vez que el elemento se añade al documento. Es donde montas tu contenido.',
        '`this.getAttribute(\'nombre\')` → lee un atributo desde el HTML de fuera, igual que `<img src="...">` lee `src`.',
        '`this.innerHTML` → asigna el contenido interno del elemento. Simple, aunque con Shadow DOM se hace mejor (lo verás abajo).',
        '`customElements.define(...)` → registra la etiqueta. El nombre DEBE llevar un guion (eso evita chocar con etiquetas futuras del navegador).',
      ],
    },
    {
      type: 'text',
      title: 'Shadow DOM: la burbuja de aislamiento',
      text: 'Cuando un elemento abre un Shadow DOM, su contenido interno vive en un sub-árbol separado del documento. Los selectores CSS de la página NO entran ahí, y los estilos que escribas dentro NO salen. Es como si el componente fuera una burbuja: hacia fuera expone solo la etiqueta y sus atributos; hacia dentro, su propio mundo.',
    },
    {
      type: 'code',
      sample: {
        title: 'Abrir un Shadow DOM y aislar estilos',
        lang: 'js',
        code: `const widget = document.querySelector('#mi-widget');

// Abre la burbuja: mode 'open' permite inspeccionarla desde fuera
const shadow = widget.attachShadow({ mode: 'open' });

shadow.innerHTML = \`
  <style>
    p { color: green; font-weight: 700; }
  </style>
  <p>Soy verde: el CSS de la página no puede tocarme</p>
\`;

// El selector global 'p' de la página NO afecta a este <p>,
// y este estilo verde tampoco se escapa fuera de la burbuja.`,
      },
    },
    {
      type: 'demo',
      title: 'Pruébalo: la burbuja en acción',
      description:
        'El mismo HTML pintado dos veces: una vez dentro de un Shadow DOM (aislado del CSS global) y otra en el DOM normal (lo estila la página). Fíjate también en cómo funciona el `<slot>` para meter contenido desde fuera.',
      component: 'demo-shadow',
      howTo: [
        'Compara los dos recuadros: mismo contenido, estilos completamente distintos.',
        'Abre F12 e inspecciona el de la izquierda: verás el "shadow-root" con su `<style>` dentro.',
      ],
    },
    {
      type: 'text',
      title: 'El ciclo de vida de un elemento',
      text: 'Un Custom Element puede reaccionar a los momentos importantes de su vida implementando estos cuatro métodos. Son como el `onPageEnter`/`onPageLeave` de Open Cells, pero a nivel de DOM:',
    },
    {
      type: 'table',
      title: 'Callbacks del ciclo de vida',
      caption: 'Qué método se ejecuta y cuándo',
      headers: ['Callback', 'Cuándo se ejecuta', 'Ejemplo de uso'],
      rows: [
        ['connectedCallback()', 'Al añadirse al documento', 'Montar contenido, escuchar eventos, suscribirse'],
        ['disconnectedCallback()', 'Al quitarse del documento', 'Limpiar, desuscribirse, parar temporizadores'],
        ['attributeChangedCallback(name, oldValue, newValue)', 'Al cambiar un atributo observado', 'Sincronizar el estado interno con la UI'],
        ['adoptedCallback()', 'Al moverse a otro documento', 'Raro; normalmente no hace falta'],
      ],
    },
    {
      type: 'code',
      sample: {
        title: 'Ciclo de vida completo con atributos observados',
        lang: 'js',
        code: `class MiContador extends HTMLElement {
  // Solo estos atributos disparan attributeChangedCallback
  static get observedAttributes() {
    return ['valor'];
  }

  connectedCallback() {
    this._clicks = 0;
    this.innerHTML = '<button>Púlsame</button>';
    this.querySelector('button').addEventListener('click', () => {
      this._clicks++;
      this.setAttribute('valor', this._clicks);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'valor') {
      console.log('El valor cambió de', oldValue, 'a', newValue);
    }
  }

  disconnectedCallback() {
    console.log('El elemento se quitó del DOM');
  }
}

customElements.define('mi-contador', MiContador);`,
      },
    },
    {
      type: 'explain',
      title: 'Repasando el ejemplo',
      points: [
        '`observedAttributes` → lista de atributos que quieres vigilar. Solo los que estén ahí disparan `attributeChangedCallback`.',
        '`connectedCallback()` → construye el interior y engancha los eventos. Se puede ejecutar varias veces si el elemento se mueve por el DOM.',
        '`setAttribute(\'valor\', ...)` → al cambiar un atributo observado, el navegador llama a `attributeChangedCallback` con el valor viejo y el nuevo.',
        '`disconnectedCallback()` → el sitio natural para "recoger": desuscribirse de canales o eventos, parar timers... exactamente como haces en Open Cells.',
        'Escribir todo esto a mano funciona, pero es verboso. Por eso existe Lit, que lo hace declarativo. Es lo que toca en la siguiente lección.',
      ],
    },
    {
      type: 'note',
      text: 'Conexión con Open Cells: cada página del curso (`<home-page>`, `<lesson-page>`, `<demo-page>`) es un Custom Element que el router registra y monta. Y todos los componentes de las demos que has tocado (`<oc-tree>`, `<demo-counter>`, `<demo-channels>`...) son Custom Elements de verdad ejecutándose en tu navegador.',
    },
    {
      type: 'summary',
      points: [
        'Los Web Components son estándares del navegador: Custom Elements + Shadow DOM + Templates.',
        '`customElements.define()` crea etiquetas nuevas asociadas a una clase.',
        'El Shadow DOM aísla HTML y CSS: los estilos globales no entran ni salen.',
        'El ciclo de vida: `connectedCallback`, `disconnectedCallback`, `attributeChangedCallback`.',
        'Las páginas de Open Cells son Web Components.',
      ],
    },
  ],
};
