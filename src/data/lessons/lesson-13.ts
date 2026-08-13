import type { Lesson } from '../types';

export const lesson13: Lesson = {
  id: 'lit',
  index: 12,
  title: 'Lit',
  subtitle: 'LitElement, templates, reactive properties y eventos.',
  topic: 'plataforma',
  sections: [
    {
      type: 'intro',
      text: 'En la lección anterior viste que crear un Custom Element "a pelo" funciona, pero es verboso: hay que construir el HTML a base de strings, enganchar cada evento a mano y sincronizar atributos y estado manualmente. Lit es una librería pequeña que convierte todo eso en código declarativo y legible. Es lo que usa esta aplicación: todas las páginas y componentes del curso están hechos con Lit.',
    },
    {
      type: 'problem',
      text: 'Con Custom Elements puros, cada componente se convierte en una mezcla de `innerHTML` con plantillas de texto, `addEventListener` por aquí y por allá, y lógica para traducir atributos a estado interno. A los diez componentes, ese código es un dolor. Lit abstrae la mecánica del DOM: tú declaras qué quieres pintar y qué propiedades son reactivas, y Lit se encarga de actualizar solo lo que cambia.',
    },
    {
      type: 'text',
      title: 'LitElement: el punto de partida',
      text: 'Para crear un componente con Lit, tu clase extiende `LitElement` y define un método `render()` que devuelve el HTML. El decorador `@customElement(\'mi-etiqueta\')` registra el componente (es azúcar para `customElements.define`). Es exactamente la base de todas las páginas Open Cells.',
    },
    {
      type: 'code',
      sample: {
        title: 'Tu primer componente Lit',
        lang: 'ts',
        code: `import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('mi-saludo')
export class MiSaludo extends LitElement {
  @property() nombre = 'mundo';

  render() {
    return html\`
      <p>Hola, <strong>\${this.nombre}</strong>!</p>
    \`;
  }
}

// Uso: <mi-saludo nombre="Ana"></mi-saludo>`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`extends LitElement` → tu componente es un Custom Element con superpoderes: render declarativo, propiedades reactivas y ciclo de vida de Lit.',
        '`@customElement(\'mi-saludo\')` → registra la etiqueta. Mismo requisito que en los Custom Elements: nombre con guion.',
        '`@property() nombre` → declara una propiedad reactiva. Si desde fuera pones `<mi-saludo nombre="Ana">`, el atributo se convierte en la propiedad `nombre`, y al cambiar, Lit re-ejecuta `render()`.',
        '`render()` → devuelve un template (etiqueta `html`). No es un string: Lit lo convierte en un DOM eficiente y en cada actualización toca SOLO lo que cambió (nada de reconstruir todo el componente).',
        '`${this.nombre}` → interpolación: el valor se inserta en el template y se actualiza cuando cambia.',
      ],
    },
    {
      type: 'text',
      title: 'Reactive properties: @property vs @state',
      text: 'Hay dos tipos de propiedades reactivas. `@property` mira también hacia fuera: se sincroniza con un atributo HTML y puede tener un tipo. `@state` es solo interna: cambios desde dentro del componente disparan el re-render, pero no se expone como atributo. Regla simple: si viene de fuera, `@property`; si es interna, `@state`.',
    },
    {
      type: 'table',
      title: 'property vs state',
      caption: 'Cómo se comporta cada tipo',
      headers: ['Decorador', 'Se lee desde fuera', 'Se escribe como atributo HTML', 'Usos típicos'],
      rows: [
        ['@property()', 'Sí', 'Sí (con tipo: String, Number, Boolean, Object, Array)', 'Los "inputs" del componente'],
        ['@state()', 'No', 'No', 'Contadores, toggles, datos recibidos por canales'],
      ],
    },
    {
      type: 'text',
      title: 'Templates: condiciones, listas y eventos',
      text: 'Los templates de Lit son JavaScript de verdad, así que puedes usar expresiones, ternarios y `.map()` dentro de ellos. Los eventos se enganchan con `@nombre-del-evento`, y los valores se pasan con un punto delante (`.value=`) para asignar propiedades en lugar de atributos.',
    },
    {
      type: 'code',
      sample: {
        title: 'Condiciones, listas y eventos en un template',
        lang: 'ts',
        code: `@customElement('mi-lista')
export class MiLista extends LitElement {
  @state() items = ['publish', 'subscribe', 'unsubscribe'];
  @state() mostrar = true;

  private _toggle() {
    this.mostrar = !this.mostrar;
  }

  render() {
    return html\`
      <button @click=\${this._toggle}>Mostrar / ocultar</button>
      \${this.mostrar
        ? html\`<ul>
            \${this.items.map(
              (item) => html\`<li>\${item}</li>\`,
            )}
          </ul>\`
        : html\`<p>Lista oculta.</p>\`}
    \`;
  }
}`,
      },
    },
    {
      type: 'explain',
      title: 'Las expresiones del template',
      points: [
        '`@click=${this._toggle}` → escucha un evento DOM. El "arroba" es azúcar de Lit para `addEventListener`, y Lit lo limpia solo cuando hace falta.',
        '`${this.mostrar ? html`...` : html`...`}` → render condicional con un ternario de JavaScript normal. No hay sintaxis mágica que aprender.',
        '`${this.items.map(...)}` → render de listas: `map` devuelve un array de templates que Lit intercala. Cada elemento puede usar `key` si la lista cambia de orden.',
        '`html` se puede anidar: cada rama del ternario o cada elemento del `map` es un template completo.',
      ],
    },
    {
      type: 'text',
      title: 'Eventos hacia fuera',
      text: 'Para avisar al mundo exterior (por ejemplo, a una página que contiene tu componente), lo natural es lanzar un `CustomEvent`. Quien escuche puede reaccionar con `@mi-evento` desde el HTML o con un listener de Open Cells.',
    },
    {
      type: 'code',
      sample: {
        title: 'Emitir un evento propio',
        lang: 'ts',
        code: `@customElement('boton-saludo')
export class BotonSaludo extends LitElement {
  private _saludar() {
    this.dispatchEvent(
      new CustomEvent('saludo', {
        detail: { texto: '¡Hola!' },
        bubbles: true,
        composed: true, // atraviesa el Shadow DOM
      }),
    );
  }

  render() {
    return html\`<button @click=\${this._saludar}>Saludar</button>\`;
  }
}

// Uso desde fuera:
// <boton-saludo @saludo=\${(e) => console.log(e.detail.texto)}></boton-saludo>`,
      },
    },
    {
      type: 'demo',
      title: 'Pruébalo: reactive properties en vivo',
      description:
        'Este panel es un componente Lit real. Escribe en el campo y observa cómo una propiedad reactiva vuelve a pintar el template; alterna el detalle (condicional), añade elementos a una lista (map) y cambia un estilo desde un evento.',
      component: 'demo-lit',
      howTo: [
        'Escribe tu nombre: cada tecla dispara un re-render parcial (solo cambia el texto).',
        'Usa "Mostrar detalle" y "Añadir elemento": condicionales y listas en acción.',
        'Cambia el color del borde: un evento actualiza una propiedad y Lit re-aplica el estilo.',
      ],
    },
    {
      type: 'note',
      text: 'Conexión con Open Cells: este curso está construido con Lit. Cada página es un `LitElement`, y las demos que has ido tocando (el contador, la emisora, el árbol) son componentes Lit que se comunican con el resto vía canales. Lit y Open Cells son compañeros: Lit se encarga del "cómo se ve y se actualiza el componente"; Open Cells, del "cuándo se muestra y cómo comparte estado".',
    },
    {
      type: 'summary',
      points: [
        '`LitElement` + `render()` dan componentes declarativos: describes qué pintar, Lit actualiza lo mínimo.',
        '`@property` para entradas desde fuera; `@state` para estado interno.',
        'Los templates son JavaScript: ternarios para condiciones, `map()` para listas, `@evento` para escuchar.',
        'Para comunicarse hacia fuera, `dispatchEvent(new CustomEvent(...))`.',
        'Las páginas y componentes de Open Cells están hechos con Lit.',
      ],
    },
  ],
};
