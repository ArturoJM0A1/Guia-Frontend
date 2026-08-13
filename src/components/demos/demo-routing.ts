import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';

interface AppContext {
  currentPage?: string;
  fromPage?: string;
}

@customElement('demo-routing')
export class DemoRouting extends LitElement {
  elementController = new ElementController(this);

  @state()
  private _hash = window.location.hash || '#!/';

  @state()
  private _ctx: AppContext = {};

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', this._onHashChange);
    this.elementController.subscribe('__oc_app', (ctx: AppContext) => {
      this._ctx = ctx;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this._onHashChange);
  }

  private _onHashChange = () => {
    this._hash = window.location.hash || '#!/';
  };

  private _go(name: string) {
    this.elementController.navigate('demo', { demoName: name });
  }

  private _back() {
    history.back();
  }

  render() {
    const route = this.elementController.getCurrentRoute();
    const active = this._hash.replace(/^#!\//, '').split('/')[0] || 'home';
    return html`
      <div>
        <div class="demo-actions">
          <button class="oc-button ${active === 'demo' ? '' : 'primary'}" @click=${() => this._go('a')}>Ir a Demo A</button>
          <button class="oc-button" @click=${() => this._go('b')}>Ir a Demo B</button>
          <button class="oc-button" @click=${() => this._go('c')}>Ir a Demo C</button>
          <button class="oc-button accent" @click=${this._back}>↩ Volver</button>
        </div>

        <span class="url-chip">${this._hash}</span>

        <div class="route-info">
          <div class="ri-item">
            <div class="ri-label">Ruta (name)</div>
            <div class="ri-value">${route?.name ?? '-'}</div>
          </div>
          <div class="ri-item">
            <div class="ri-label">Parámetro :demoName</div>
            <div class="ri-value">${route?.params?.demoName ?? '-'}</div>
          </div>
          <div class="ri-item">
            <div class="ri-label">Componente pintado</div>
            <div class="ri-value">${route?.name ? route.name + '-page' : '-'}</div>
          </div>
        </div>

        <div class="demo-howto">
          <strong>Observa:</strong> al pulsar un botón, la URL cambia a <code>#!/demo/a</code>,
          <code>#!/demo/b</code> o <code>#!/demo/c</code>, y Open Cells monta la página
          <code>demo-page</code> con el parámetro correspondiente. Ahora mismo la ruta activa es
          <code>${route?.name ?? '?'}</code> (desde: <code>${this._ctx.fromPage ?? '-'}</code>).
        </div>
      </div>
    `;
  }
}
