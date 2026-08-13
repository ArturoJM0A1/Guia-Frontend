import type { Lesson } from '../types';

export const lesson24: Lesson = {
  id: 'frontend-bbva',
  index: 23,
  title: 'Frontend BBVA',
  subtitle: 'Cómo se hace el frontend en BBVA y cómo se migra el código.',
  topic: 'opencells',
  sections: [
    {
      type: 'intro',
      text: 'BBVA desarrolla aplicaciones web para empleados y clientes en varios países, con un contexto multi-aplicación y multi-equipo. Para que tantos equipos puedan compartir código sin pisarse, el frontend de BBVA apuesta por estándares web: Web Components y una capa fina encima llamada Open Cells. En esta lección verás cómo se organiza ese frontend y cuál es el proceso de migración de código cuando una app vieja se pasa a la pila moderna.',
    },
    {
      type: 'problem',
      text: 'Cuando tienes cientos de aplicaciones, cada una con su framework y su estilo, el resultado es un mantenimiento imposible: cada equipo reinventa la rueda, las dependencias se acumulan y el conocimiento no se comparte. BBVA respondió con dos decisiones: apostar por componentes estándar (Web Components) que funcionan en cualquier sitio, y centralizar lo que toda SPA necesita (routing y estado) en un framework ligero y común: Open Cells.',
    },
    {
      type: 'text',
      title: 'El contexto: un frontend multi-aplicación y multi-país',
      text: 'BBVA tiene aplicaciones de cliente y de empleado en 11 países. Esa escala impone reglas: código estándar y reutilizable, componentes que se comparten como paquetes, y una arquitectura donde una app es solo "páginas web component + canales". Nada de pegarse a la sintaxis propietaria de un framework: lo que se construye hoy debe poder migrarse mañana sin reescribirlo.',
    },
    {
      type: 'text',
      title: 'La pila moderna: estándares + Open Cells',
      text: 'La pila actual se apoya en tres capas: los Web Components (la base, directamente del navegador), Lit (la librería que los hace cómodos: reactividad y templates) y Open Cells (routing + comunicación por canales). Open Cells está publicado como open source (github.com/BBVA/open-cells) y se compone de `core` (routing, estado, configuración, arranque), `element-controller` (para que cualquier componente publique, se suscriba y navegue) y `page-controller` (añade el ciclo de vida de las páginas).',
    },
    {
      type: 'code',
      sample: {
        title: 'La huella de Open Cells en una página',
        lang: 'ts',
        code: `// app-index.ts — el arranque (lo que ya viste en la lección 3)
import { startApp } from '@open-cells/core';
import { routes } from '../router/routes.js';

startApp({
  routes,
  mainNode: 'app-content',
});

// Una página típica: PageController + canales + Lit
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageController } from '@open-cells/page-controller';

@customElement('detalle-page')
export class DetallePage extends LitElement {
  pageController = new PageController(this);

  onPageEnter() {
    this.pageController.subscribe('cliente', (cliente) => {
      this.cliente = cliente; // el canal llega solo
    });
    this.pageController.publish('pedir-cliente', this.clienteId);
  }
}`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        'El frontend de BBVA es "páginas que son Web Components + Open Cells". No hay sintaxis rara: HTML, CSS y JavaScript estándar.',
        'Los canales son el pegamento entre páginas: una página pide datos (`publish`) y otra responde (suscribe). Ese contrato es lo que hace migrable todo.',
        'Por eso el mismo código sirve para una web de cliente en España y una de empleado en México: los componentes y los canales se comparten.',
        'Las piezas son empaquetables (npm) y reutilizables: librerías de componentes con Lit que funcionan en cualquier app.',
      ],
    },
    {
      type: 'text',
      title: 'De dónde venimos: la era Cells (Polymer)',
      text: 'Open Cells no apareció de la nada: su nombre viene de "Cells", la plataforma anterior de componentes de BBVA, basada en Polymer (la lección 14). Durante años las apps de BBVA se construyeron con Polymer: mismo concepto (páginas = Web Components + canales) pero con la maquinaria pesada de Polymer y un ecosistema cerrado. El mundo cambió: Polymer dejó de mantenerse y su sucesor, Lit, era mucho más pequeño y moderno. Había que migrar.',
    },
    {
      type: 'text',
      title: 'El proceso de migración de código',
      text: 'La migración real no fue "borrar y reescribir", sino un proceso gradual, componente a componente, con el patrón del "rascacielos (strangler)": la app nueva y la vieja conviven mientras se traslada pieza a pieza. Los canales son la clave: como el contrato entre páginas no cambia, una página migrada a Lit puede convivir con una página que aún es de Polymer, porque ambas hablan el mismo canal.',
    },
    {
      type: 'code',
      sample: {
        title: 'El mismo componente, antes y después',
        lang: 'js',
        code: `// ANTES — Cells / Polymer 3
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class ClienteCard extends PolymerElement {
  static get template() {
    return html\`
      <style> :host { display: block; } </style>
      <h3>[[cliente.nombre]]</h3>
      <p>Saldo: [[cliente.saldo]]</p>
    \`;
  }
  static get properties() {
    return {
      cliente: { type: Object, value: null },
    };
  }
}
customElements.define('cliente-card', ClienteCard);

// DESPUÉS — Open Cells / Lit
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cliente-card')
class ClienteCard extends LitElement {
  @property({ type: Object })
  cliente = null;

  render() {
    return html\`
      <h3>\${this.cliente?.nombre}</h3>
      <p>Saldo: \${this.cliente?.saldo}</p>
    \`;
  }
}`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        'El tag (`cliente-card`) y las propiedades (`cliente`) no cambian: por eso los consumidores de fuera no se enteran de la migración.',
        '`static get template()` + `static get properties()` → `render()` + decoradores `@property`. Mismo contrato, menos maquinaria.',
        'El estilo pasa de `:host` en el template a `static styles`, y las plantillas de `${}` (template literals) reemplazan a los bindings `[[...]]`.',
        'Las páginas migran igual: `PageController` sustituye a los mixins de Polymer y los canales siguen siendo los mismos.',
      ],
    },
    {
      type: 'table',
      title: 'Las fases de la migración',
      caption: 'El proceso real, paso a paso, sin romper nada',
      headers: ['Fase', 'Qué se hace', 'Resultado'],
      rows: [
        ['1 · Inventario', 'Mapear páginas, componentes y canales; detectar dependencias muertas', 'Un mapa claro de qué se migra'],
        ['2 · Base común', 'Montar la app nueva con Open Cells y las rutas vacías al lado de la vieja', 'Convivencia (strangler pattern)'],
        ['3 · Componentes primero', 'Migrar los componentes compartidos (los más usados primero)', 'Librería Lit lista para usar'],
        ['4 · Páginas después', 'Migrar páginas una a una; cada una sigue usando los mismos canales', 'App híbrida funcionando'],
        ['5 · Rutas y limpieza', 'Apagar la app vieja, borrar dependencias de Polymer y duplicados', '100% Open Cells / Lit'],
        ['6 · Verificación', 'Tests de regresión por página y por canal en cada paso', 'Nada se rompe al migrar'],
      ],
    },
    {
      type: 'note',
      text: 'Por qué funciona: la decisión de fondo es que el contrato (Web Components + canales) no depende del framework. Lo que era Polymer, luego Lit, y mañana lo que venga, sigue siendo un Custom Element que se suscribe a un canal. Migrar es "cambiar el motor del coche sin cambiar el volante", no reconstruir el coche.',
    },
    {
      type: 'summary',
      points: [
        'El frontend de BBVA: Web Components estándar + Lit + Open Cells, compartido en 11 países.',
        'Open Cells = routing + canales (pub/sub) + arranque; page-controller da el ciclo de vida.',
        'La pila anterior era Cells (Polymer): mismo concepto, otra maquinaria.',
        'La migración es incremental: componente a componente, página a página, sin parar la app (strangler).',
        'Los canales son el contrato estable: migrar el motor, no el volante.',
      ],
    },
  ],
};
