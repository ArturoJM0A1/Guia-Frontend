import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';

@customElement('demo-programmatic-nav')
export class DemoProgrammaticNav extends LitElement {
  elementController = new ElementController(this);

  @state()
  private _log: string[] = [];

  createRenderRoot() {
    return this;
  }

  private _go(demoName: string) {
    this._log = [...this._log, `navigate('demo', { demoName: '${demoName}' }) → #!/demo/${demoName}`];
    this.elementController.navigate('demo', { demoName });
  }

  private _backToLesson() {
    this._log = [...this._log, `navigate('lesson', { lessonId: 'navegacion-programatica' })`];
    this.elementController.navigate('lesson', { lessonId: 'navegacion-programatica' });
  }

  render() {
    return html`
      <div>
        <p style="margin:0 0 10px">
          Ninguno de estos botones tiene un <code>href</code>: todos llaman a
          <code>navigate()</code> con el nombre de la ruta. La URL se construye sola.
        </p>

        <div class="demo-actions">
          <button class="oc-button" @click=${() => this._go('a')}>Ir a Demo A</button>
          <button class="oc-button" @click=${() => this._go('b')}>Ir a Demo B</button>
          <button class="oc-button" @click=${() => this._go('c')}>Ir a Demo C</button>
          <button class="oc-button accent" @click=${this._backToLesson}>Volver a esta lección</button>
        </div>

        <div class="demo-log">
          ${this._log.length === 0
            ? html`<span class="log-line log-dim">Pulsa un botón: verás la llamada que se ejecuta.</span>`
            : this._log.map((line) => html`<span class="log-line log-ok">${line}</span>`)}
        </div>
      </div>
    `;
  }
}
