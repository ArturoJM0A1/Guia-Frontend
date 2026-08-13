import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';

@customElement('demo-initialization')
export class DemoInitialization extends LitElement {
  elementController = new ElementController(this);

  @state()
  private _hash = window.location.hash || '#!/';

  @state()
  private _log: string[] = [];

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', this._onHashChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this._onHashChange);
  }

  private _onHashChange = () => {
    this._hash = window.location.hash || '#!/';
  };

  private _consult() {
    const route = this.elementController.getCurrentRoute();
    const line = `getCurrentRoute() → { name: '${route?.name}', params: ${JSON.stringify(
      route?.params ?? {},
    )}, hashPath: '${route?.hashPath ?? ''}' }`;
    this._log = [...this._log, line];
  }

  render() {
    return html`
      <div>
        <p style="margin:0 0 10px">
          El router que arrancó <code>startApp()</code> sigue vivo y está manejando la URL actual:
        </p>
        <span class="url-chip">${this._hash}</span>

        <div class="demo-actions">
          <button class="oc-button primary" @click=${this._consult}>Consultar ruta actual</button>
        </div>

        <div class="demo-log">
          ${this._log.length === 0
            ? html`<span class="log-line log-dim">Pulsa el botón para consultar la ruta.</span>`
            : this._log.map((line) => html`<span class="log-line log-ok">${line}</span>`)}
        </div>
      </div>
    `;
  }
}
