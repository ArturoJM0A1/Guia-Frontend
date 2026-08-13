import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';

interface AppContext {
  currentPage?: string;
  fromPage?: string;
  interceptorContext?: Record<string, unknown>;
  currentRoute?: unknown;
}

@customElement('demo-app-context')
export class DemoAppContext extends LitElement {
  elementController = new ElementController(this);

  @state()
  private _ctx: AppContext = {};

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.elementController.subscribe('__oc_app', (ctx: AppContext) => {
      this._ctx = ctx;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.elementController.unsubscribe('__oc_app');
  }

  private _goLesson() {
    this.elementController.navigate('lesson', { lessonId: 'app-context' });
  }

  render() {
    const { currentPage, fromPage } = this._ctx;
    return html`
      <div>
        <p style="margin:0 0 10px">
          Este panel está suscrito al canal privado <code>__oc_app</code>. Se actualiza solo en cada
          navegación.
        </p>

        <div class="ctx-row">
          <div class="ctx-box">
            <div class="ctx-label">currentPage</div>
            <div class="ctx-value">${currentPage ?? '-'}</div>
          </div>
          <div class="ctx-box">
            <div class="ctx-label">fromPage</div>
            <div class="ctx-value">${fromPage ?? '-'}</div>
          </div>
        </div>

        <div class="demo-actions">
          <button class="oc-button" @click=${this._goLesson}>
            Ir a otra página (la lección de app context)
          </button>
        </div>

        <div class="demo-howto">
          <strong>Observa:</strong> al navegar, <code>fromPage</code> se convierte en la página que
          estabas viendo y <code>currentPage</code> en la nueva. En la primera navegación no hay
          página anterior, por eso ves <code>-</code>.
        </div>

        <p style="margin:12px 0 6px;font-weight:700;color:var(--oc-color-primary)">
          Objeto completo, tal y como llega del canal
        </p>
        <div class="demo-log"><span class="log-line">${JSON.stringify(this._ctx, null, 2)}</span></div>
      </div>
    `;
  }
}
