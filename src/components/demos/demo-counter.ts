import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';

@customElement('oc-demo-publisher')
export class OcDemoPublisher extends LitElement {
  elementController = new ElementController(this);

  @state()
  private _value = 0;

  createRenderRoot() {
    return this;
  }

  private _emit(delta: number) {
    const next = this._value + delta;
    this._value = next;
    this.elementController.publish('counter', next);
  }

  render() {
    return html`
      <div class="counter-card">
        <h4>📡 Publicador (emisora)</h4>
        <p style="margin:0 0 8px;font-size:0.9rem;color:var(--oc-color-text-soft)">
          Cada vez que pulsas, hace <code>publish('counter', valor)</code>. No conoce a ningún receptor.
        </p>
        <div class="demo-actions">
          <button class="oc-button" @click=${() => this._emit(-1)}>−</button>
          <span class="counter-value">${this._value}</span>
          <button class="oc-button" @click=${() => this._emit(1)}>+</button>
        </div>
        <code class="log-line log-dim" style="font-size:0.82rem">
          publish('counter', ${this._value})
        </code>
      </div>
    `;
  }
}

@customElement('oc-demo-subscriber')
export class OcDemoSubscriber extends LitElement {
  elementController = new ElementController(this);

  @state()
  private _value: number | null = null;

  @state()
  private _subscribed = true;

  @state()
  private _receivedCount = 0;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this._subscribe();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribe();
  }

  private _subscribe() {
    this.elementController.subscribe('counter', (value: number) => {
      this._value = value;
      this._receivedCount += 1;
    });
    this._subscribed = true;
  }

  private _unsubscribe() {
    this.elementController.unsubscribe('counter');
    this._subscribed = false;
  }

  private _toggle() {
    if (this._subscribed) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  render() {
    return html`
      <div class="counter-card">
        <h4>📻 Receptor (sintonizado)</h4>
        <p style="margin:0 0 8px;font-size:0.9rem;color:var(--oc-color-text-soft)">
          Está suscrito a <code>'counter'</code>. No conoce a ningún publicador.
        </p>
        <div class="counter-value ${this._subscribed ? '' : 'stale'}">
          ${this._value ?? '—'}
        </div>
        <span class="status-badge ${this._subscribed ? 'on' : 'off'}">
          ${this._subscribed ? '● suscrito' : '○ desuscrito'}
        </span>
        <p class="log-line" style="font-size:0.82rem;color:var(--oc-color-text-soft)">
          Valores recibidos: ${this._receivedCount}
          ${this._subscribed ? '' : ' · el publicador sigue emitiendo, pero este receptor no escucha'}
        </p>
        <div class="demo-actions">
          <button class="oc-button" @click=${this._toggle}>
            ${this._subscribed ? 'Desuscribir receptor' : 'Volver a suscribir'}
          </button>
        </div>
      </div>
    `;
  }
}

@customElement('demo-counter')
export class DemoCounter extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="counter-stage">
        <oc-demo-publisher></oc-demo-publisher>
        <oc-demo-subscriber></oc-demo-subscriber>
      </div>
      <p class="log-line log-dim" style="margin-top:10px">
        Los dos componentes de arriba NO se conocen: solo comparten el nombre del canal
        <code>counter</code>. Prueba a desuscribir el receptor y sigue pulsando los botones del
        publicador: emite igualmente, pero nadie escucha.
      </p>
    `;
  }
}
