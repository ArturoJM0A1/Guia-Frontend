import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';

interface LifecycleEvent {
  type: 'enter' | 'leave';
  page: string;
  at: string;
}

interface AppContext {
  currentPage?: string;
  fromPage?: string;
}

@customElement('demo-architecture')
export class DemoArchitecture extends LitElement {
  elementController = new ElementController(this);

  @state()
  private _ctx: AppContext = {};

  @state()
  private _events: LifecycleEvent[] = [];

  @state()
  private _routeName = '';

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    const route = this.elementController.getCurrentRoute();
    this._routeName = route?.name ?? '';
    this.elementController.subscribe('__oc_app', (ctx: AppContext) => {
      this._ctx = ctx;
      this._routeName = ctx.currentPage ?? '';
    });
    this.elementController.subscribe('lifecycle-events', (evt: LifecycleEvent) => {
      this._events = [...this._events.slice(-29), evt];
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.elementController.unsubscribe('__oc_app');
    this.elementController.unsubscribe('lifecycle-events');
  }

  private _goDemo() {
    this.elementController.navigate('demo', { demoName: 'arch' });
  }

  render() {
    return html`
      <div class="grid-3">
        <div class="card">
          <h4>Router</h4>
          <p class="log-line">
            Ruta actual: <strong>${this._routeName || '-'}</strong>
          </p>
          <p class="log-line log-dim">
            Lo lee Open Cells al hacer match con la URL y lo publica en el app context.
          </p>
          <div class="demo-actions">
            <button class="oc-button" @click=${this._goDemo}>Ir a una página demo</button>
          </div>
        </div>

        <div class="card">
          <h4>App context</h4>
          <p class="log-line">
            currentPage: <strong>${this._ctx.currentPage ?? '-'}</strong>
          </p>
          <p class="log-line">
            fromPage: <strong>${this._ctx.fromPage ?? '-'}</strong>
          </p>
          <p class="log-line log-dim">
            Canal privado <code>__oc_app</code>, de solo lectura. Lo actualiza el core en cada
            navegación.
          </p>
        </div>

        <div class="card">
          <h4>Ciclo de vida</h4>
          <div class="lifecycle-log" style="max-height:120px;overflow-y:auto">
            ${this._events.length === 0
              ? html`<span class="log-line log-dim">Sin eventos todavía.</span>`
              : this._events.map(
                  (evt) => html`<span class="log-line">
                    <span class="lifecycle-badge ${evt.type}">
                      ${evt.type === 'enter' ? 'ENTER' : 'LEAVE'}
                    </span>
                    ${evt.page}
                  </span>`,
                )}
          </div>
          <p class="log-line log-dim">
            Publicados por las páginas en <code>lifecycle-events</code> desde su
            <code>onPageEnter</code>/<code>onPageLeave</code>.
          </p>
        </div>
      </div>

      <div class="arch-flow" style="margin-top:14px">
        <span class="step">routes</span><span class="arrow"> → </span><span class="desc">match de URL</span><span class="arrow"> → </span>
        <span class="step">action</span><span class="arrow"> → </span><span class="desc">import() de la página</span><span class="arrow"> → </span>
        <span class="step">página</span><span class="arrow"> → </span><span class="desc">app context + lifecycle-events</span><span class="arrow"> → </span>
        <span class="step">estado</span>
      </div>
    `;
  }
}
