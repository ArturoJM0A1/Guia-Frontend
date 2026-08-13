import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('demo-web-component')
export class DemoWebComponent extends LitElement {
  @state()
  private _clicks = 0;

  @state()
  private _log: string[] = [];

  createRenderRoot() {
    return this;
  }

  private _handleClick() {
    this._clicks += 1;
    const message = `Evento 'demo-click' recibido con detail: ${this._clicks}`;
    this._log = [...this._log, message];
    this.dispatchEvent(
      new CustomEvent('demo-click', { detail: this._clicks, bubbles: true, composed: true }),
    );
  }

  private _handleSelfEvent(e: Event) {
    const detail = (e as CustomEvent).detail;
    this._log = [...this._log, `CustomEvent 'demo-click' capturado (bubbles): ${detail}`];
  }

  render() {
    return html`
      <div class="wc-demo">
        <div class="wc-demo-head">
          <p>
            Esta caja entera es el elemento
            <code>&lt;demo-web-component&gt;</code>, registrado con
            <code>customElements.define()</code>.
          </p>
          <button class="oc-button primary" @click=${this._handleClick}>Púlsame</button>
          <span class="wc-count">Pulsado ${this._clicks} veces</span>
        </div>

        <div class="demo-log" @demo-click=${this._handleSelfEvent}>
          ${this._log.length === 0
            ? html`<span class="log-line log-dim">Aún no hay eventos. Pulsa el botón.</span>`
            : this._log.map(
                (line, i) =>
                  html`<span class="log-line ${i % 2 === 0 ? 'log-ok' : 'log-warn'}">${line}</span>`,
              )}
        </div>

        <div class="wc-demo-note">
          <strong>Tip:</strong> abre las herramientas del desarrollador (F12) e inspecciona el DOM.
          Verás la etiqueta <code>&lt;demo-web-component&gt;</code> con su contenido: es un elemento
          HTML más, igual que un <code>&lt;div&gt;</code>.
        </div>
      </div>
    `;
  }
}
