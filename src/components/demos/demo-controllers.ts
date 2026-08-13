import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';

@customElement('demo-controllers')
export class DemoControllers extends LitElement {
  elementController = new ElementController(this);

  @state()
  private _log: string[] = [];

  @state()
  private _routeInfo = '';

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.elementController.subscribe('demo-controller-test', (value: number) => {
      this._log = [
        ...this._log,
        `recibido en el propio componente (subscribe): 'demo-controller-test' → ${value}`,
      ];
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.elementController.unsubscribe('demo-controller-test');
  }

  private _testPublish() {
    const value = Math.floor(Math.random() * 100);
    this._log = [...this._log, `publish('demo-controller-test', ${value})`];
    this.elementController.publish('demo-controller-test', value);
  }

  private _testNavigate() {
    this._log = [...this._log, `navigate('demo', { demoName: 'a' })`];
    this.elementController.navigate('demo', { demoName: 'a' });
  }

  private _testRoute() {
    const route = this.elementController.getCurrentRoute();
    this._routeInfo = JSON.stringify(route, null, 2);
    this._log = [...this._log, `getCurrentRoute() → consultado (ver a la derecha)`];
  }

  render() {
    return html`
      <div class="grid-2">
        <div class="grid-2-main">
          <p style="margin:0 0 10px">
            Este panel usa un <code>ElementController</code>. Todo lo que hace (publicar, suscribirse,
            navegar, consultar la ruta) lo hace a través de él.
          </p>
          <div class="demo-actions">
            <button class="oc-button primary" @click=${this._testPublish}>Probar publish</button>
            <button class="oc-button" @click=${this._testNavigate}>Probar navigate</button>
            <button class="oc-button" @click=${this._testRoute}>Ruta actual</button>
          </div>
          <div class="demo-log">
            ${this._log.length === 0
              ? html`<span class="log-line log-dim">Pulsa los botones para ver al controller trabajar.</span>`
              : this._log.map((line, i) => html`<span class="log-line log-ok">${i + 1}. ${line}</span>`)}
          </div>
        </div>
        <div class="grid-2-side">
          <div class="route-info">
            <div class="ri-item">
              <div class="ri-label">getCurrentRoute()</div>
              <div class="ri-value" style="white-space:pre-wrap;font-size:0.78rem;font-weight:400">
                ${this._routeInfo || 'Pulsa "Ruta actual" para ver el objeto de ruta.'}
              </div>
            </div>
          </div>
          <p class="log-line log-dim" style="margin-top:10px">
            La página en la que estás (esta lección) usa un <code>PageController</code>: hereda todo lo
            de aquí y añade <code>onPageEnter</code>/<code>onPageLeave</code>.
          </p>
        </div>
      </div>
    `;
  }
}
