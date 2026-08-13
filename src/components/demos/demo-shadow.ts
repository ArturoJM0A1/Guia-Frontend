import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('oc-shadow-box')
export class OcShadowBox extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 2px solid #2bb3a6;
      border-radius: 10px;
      padding: 14px 16px;
      background: #0f2b28;
      color: #d9f7f2;
      font-family: Georgia, 'Times New Roman', serif;
    }

    h3 {
      margin: 0 0 8px;
      color: #7ef0e0;
      font-size: 1rem;
      letter-spacing: 0.5px;
    }

    p {
      margin: 6px 0 0;
      color: #b6e4dc;
    }

    ::slotted(.slotted) {
      color: #ffe08a;
      font-weight: 700;
    }
  `;

  render() {
    return html`
      <h3>Esto vive dentro de un Shadow DOM</h3>
      <p>
        Estos estilos (borde turquesa, fondo oscuro, serif) están escritos DENTRO del componente y
        no pueden ser tocados por el CSS global de la página.
      </p>
      <slot></slot>
    `;
  }
}

@customElement('demo-shadow')
export class DemoShadow extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div>
        <div class="grid-2">
          <div>
            <p class="demo-panel-label">1. El mismo HTML, pero dentro de un Shadow DOM</p>
            <oc-shadow-box></oc-shadow-box>
          </div>
          <div>
            <p class="demo-panel-label">2. El mismo HTML, en el DOM global de la página</p>
            <div style="border:1px solid var(--oc-color-border);border-radius:10px;padding:14px 16px;background:var(--oc-color-surface)">
              <h3 style="margin:0 0 8px">Esto es un &lt;h3&gt; normal</h3>
              <p style="margin:6px 0 0">
                Estos estilos vienen del CSS global (main.css). Fíjate en el color y la fuente:
                son los de la página.
              </p>
            </div>
          </div>
        </div>

        <p class="log-line log-dim" style="margin-top:12px">
          El elemento de la izquierda (<code>&lt;oc-shadow-box&gt;</code>) abre su propio Shadow DOM:
          lo que hay dentro está aislado del resto del documento. El de la derecha es HTML normal y
          recibe los estilos globales. Aunque los dos pintan lo mismo, no comparten nada.
        </p>

        <div class="demo-howto">
          <strong>Slots:</strong> el componente de la izquierda tiene un <code>&lt;slot&gt;</code>.
          Todo lo que le pases como hijo se proyecta ahí. Por ejemplo, este texto viene desde fuera y
          conserva el estilo de la página:
          <oc-shadow-box style="margin-top:8px">
            <span slot="custom" class="slotted">✨ Contenido proyectado por un slot (con ::slotted) </span>
          </oc-shadow-box>
        </div>
      </div>
    `;
  }
}
