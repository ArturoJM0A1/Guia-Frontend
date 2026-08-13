import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PageController } from '@open-cells/page-controller';

@customElement('demo-page')
export class DemoPage extends LitElement {
  pageController = new PageController(this);

  @property({ type: Object })
  params: { demoName?: string } = {};

  createRenderRoot() {
    return this;
  }

  onPageEnter() {
    this.pageController.publish('lifecycle-events', {
      type: 'enter',
      page: 'demo',
      at: new Date().toLocaleTimeString(),
    });
  }

  onPageLeave() {
    this.pageController.publish('lifecycle-events', {
      type: 'leave',
      page: 'demo',
      at: new Date().toLocaleTimeString(),
    });
  }

  private get _name(): string {
    return this.params?.demoName ?? '?';
  }

  private get _route() {
    return this.pageController.getCurrentRoute();
  }

  private _go(name: string) {
    this.pageController.navigate('demo', { demoName: name });
  }

  render() {
    const name = this._name;
    const route = this._route;
    return html`
      <div class="lesson-shell">
        <header class="lesson-header">
          <div class="lesson-kicker"><span class="oc-chip">Página demo</span></div>
          <h1>Demo ${name}</h1>
          <p class="lesson-subtitle">
            Esta página existe solo para enseñar cómo Open Cells interpreta la URL y la ruta.
          </p>
        </header>

        <section class="lesson-section">
          <h2>La URL y la ruta en vivo</h2>
          <span class="url-chip">${window.location.hash || '#!/'}</span>
          <div class="route-info">
            <div class="ri-item">
              <div class="ri-label">Ruta (name)</div>
              <div class="ri-value">${route?.name ?? '-'}</div>
            </div>
            <div class="ri-item">
              <div class="ri-label">Componente</div>
              <div class="ri-value">demo-page</div>
            </div>
            <div class="ri-item">
              <div class="ri-label">Params</div>
              <div class="ri-value">${JSON.stringify(this.params ?? {})}</div>
            </div>
          </div>
        </section>

        <section class="lesson-section">
          <h2>Navega</h2>
          <p>Cada botón cambia el parámetro de la URL sin recargar la página.</p>
          <div class="demo-actions">
            ${['a', 'b', 'c'].map(
              (x) => html`
                <button class="oc-button ${x === name ? 'primary' : ''}" @click=${() => this._go(x)}>
                  Ir a Demo ${x}
                </button>
              `,
            )}
            <button class="oc-button accent" @click=${() => history.back()}>↩ Volver</button>
          </div>
        </section>

        <section class="lesson-section">
          <h2>¿Y esto qué demuestra?</h2>
          <div class="lesson-note">
            <span class="note-label">Concepto</span>
            <p>
              La misma ruta (<code>demo</code>) sirve para muchas URLs. El parámetro
              <code>demoName</code> se extrae de la URL (<code>/demo/a</code>, <code>/demo/b</code>…) y
              llega a la página a través de <code>pageController.params</code>. Ese es exactamente el
              mecanismo que usa el curso: la ruta <code>lesson</code> recibe un <code>lessonId</code> y
              cada lección se renderiza en la misma página.
            </p>
          </div>
        </section>
      </div>
    `;
  }
}
