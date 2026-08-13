import type { Lesson } from '../types';

export const lesson01: Lesson = {
  id: 'que-es-open-cells',
  index: 0,
  title: '¿Qué es Open Cells?',
  subtitle: 'Un framework pequeño que resuelve lo que toda SPA necesita.',
  topic: 'opencells',
  sections: [
    {
      type: 'intro',
      text: 'Open Cells es un framework para construir aplicaciones web de una sola página (SPA). No es un framework "todo en uno" como Angular o Vue: es deliberadamente pequeño. Solo se encarga de las cuatro cosas que todas las SPAs necesitan y que son un dolor de cabeza hacerlas a mano: el routing, el estado (comunicación entre componentes), la configuración y el arranque de la aplicación.',
    },
    {
      type: 'problem',
      text: 'Cuando construyes una SPA a mano, te encuentras con los mismos problemas siempre: "¿cómo muestro un componente cuando la URL cambia?", "¿cómo hago que dos componentes hablen entre sí sin acoplarlos?", "¿dónde guardo el estado de la app?". Open Cells responde a esas preguntas con una API pequeña y predecible, para que no tengas que resolverlas tú con código casero. El resto — el HTML, el CSS, la lógica de tu negocio — es 100% tuyo y 100% estándar.',
    },
    {
      type: 'text',
      title: '¿Por qué Web Components?',
      text: 'Los Web Components son la tecnología del propio navegador para crear componentes reutilizables: una etiqueta HTML con su propio comportamiento, su propio HTML interno y su propio CSS aislado. Son estándar (cualquier navegador moderno los entiende) y no dependen de ninguna librería. Open Cells los usa como "unidad de página": cada página de tu app es un Web Component, y Open Cells se limita a poner la página adecuada en el DOM según la URL.',
    },
    {
      type: 'text',
      title: '¿Qué significa "basado en estándares web"?',
      text: 'Que no inventa un lenguaje ni una sintaxis nueva que solo existe dentro del framework. Usa lo que el navegador ya sabe hacer: Custom Elements, Shadow DOM, módulos ES (import/export), la History API. Si ya sabes HTML, CSS y JavaScript, solo tienes que aprender "un par de APIs y convenciones" de Open Cells, no un universo nuevo. Eso hace la curva de aprendizaje muy corta.',
    },
    {
      type: 'text',
      title: '¿Y qué es exactamente una SPA?',
      text: 'SPA = Single Page Application (Aplicación de una sola página). El navegador carga un único documento HTML una vez, y después la app cambia de "página" sin recargar el documento: solo se actualiza una zona del DOM. Fíjate en esta misma app: cuando pulsas una lección en el menú lateral, la URL cambia y el contenido cambia, pero el navegador no hace un "refresh" completo. Eso es una SPA funcionando.',
    },
    {
      type: 'code',
      sample: {
        title: 'Tu primer Web Component con Lit (la base de una página en Open Cells)',
        lang: 'ts',
        code: `import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('hola-mundo')
export class HolaMundo extends LitElement {
  render() {
    return html\`
      <p>Hola desde un Web Component.</p>
      <slot></slot>
    \`;
  }
}`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando en el código',
      points: [
        '`@customElement(\'hola-mundo\')` registra la clase como una etiqueta HTML nueva. A partir de ahí, puedes escribir `<hola-mundo></hola-mundo>` en cualquier sitio del HTML, igual que escribes `<div>` o `<button>`.',
        '`extends LitElement` convierte la clase en un Web Component con ciclo de vida y render declarativo. Lit es la librería que Open Cells usa (y recomienda) para escribir componentes de forma cómoda.',
        'El método `render()` devuelve el HTML interno del componente. Cuando cambian sus propiedades, Lit vuelve a ejecutar `render()` y actualiza solo lo que cambió.',
        '`<slot></slot>` es el hueco donde se insertan los hijos que le pases desde fuera, igual que ocurre con `<select><option>...`',
        'No hace falta framework externo para que esto funcione: es el navegador quien ejecuta la etiqueta. Esta misma aplicación está llena de componentes así.',
      ],
    },
    {
      type: 'demo',
      title: 'Pruébalo: un Web Component sin framework',
      description:
        'Este bloque es un Web Component de verdad. Está definido, registrado y ejecutándose en tu navegador ahora mismo, sin React ni Vue ni Angular: solo estándares web.',
      component: 'demo-web-component',
      howTo: [
        'Pulsa el botón para comprobar que el componente recibe eventos como cualquier elemento HTML.',
        'Abre las herramientas del desarrollador (F12) y fíjate en el DOM: verás la etiqueta <demo-web-component> y su contenido interno.',
      ],
    },
    {
      type: 'summary',
      points: [
        'Open Cells resuelve lo que toda SPA necesita: routing, estado, configuración y arranque.',
        'Usa Web Components: cada página es una etiqueta HTML estándar.',
        'Está basado en estándares web: si sabes HTML/CSS/JS, ya sabes el 80% de lo que necesitas.',
        'En la siguiente lección verás cómo se organiza una aplicación Open Cells por dentro.',
      ],
    },
  ],
};
