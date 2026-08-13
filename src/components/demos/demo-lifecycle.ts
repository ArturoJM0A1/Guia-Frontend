import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';

interface LifecycleEvent {
  type: 'enter' | 'leave';
  page: string;
  at: string;
}

@customElement('demo-lifecycle')
export class DemoLifecycle extends LitElement {
  elementController = new ElementController(this);

  @state()
  private _events: LifecycleEvent[] = [];

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.elementController.subscribe('lifecycle-events', (evt: LifecycleEvent) => {
      this._events = [...this._events, evt];
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.elementController.unsubscribe('lifecycle-events');
  }

  private _goDemo() {
    this.elementController.navigate('demo', { demoName: 'lifecycle' });
  }

  private _clear() {
    this._events = [];
  }

  render() {
    return html`
      <div>
        <p style="margin:0 0 10px">
          Las páginas de esta app publican en el canal <code>lifecycle-events</code> cada vez que
          entran o salen de pantalla. Aquí los recibimos todos en orden:
        </p>
        <div class="demo-actions">
          <button class="oc-button primary" @click=${this._goDemo}>Ir a una página demo</button>
          <button class="oc-button" @click=${this._clear}>Limpiar registro</button>
        </div>
        <div class="lifecycle-log">
          ${this._events.length === 0
            ? html`<span class="log-line log-dim">
                Sin eventos todavía. Ve a otra página y vuelve: se registrarán las entradas y salidas.
              </span>`
            : this._events.map(
                (evt) => html`<span class="log-line">
                  <span class="lifecycle-badge ${evt.type}">
                    ${evt.type === 'enter' ? 'ENTER' : 'LEAVE'}
                  </span>
                  página <strong>${evt.page}</strong> · ${evt.at}
                </span>`,
              )}
        </div>
        <p class="log-line log-dim" style="margin-top:10px">
          Detalle: la lección que estás viendo publica <code>{ type: 'enter' | 'leave', page, at }</code>
          desde su <code>onPageEnter</code> y <code>onPageLeave</code>.
        </p>
      </div>
    `;
  }
}
