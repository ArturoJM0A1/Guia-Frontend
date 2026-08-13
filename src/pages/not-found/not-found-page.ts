import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageController } from '@open-cells/page-controller';

@customElement('not-found-page')
export class NotFoundPage extends LitElement {
  pageController = new PageController(this);

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="lesson-empty">
        <h2>Página no encontrada (404)</h2>
        <p>
          No hay ninguna ruta que coincida con <code>${window.location.hash}</code>. Open Cells ha
          encontrado la ruta <strong>comodín</strong> y te ha traído aquí.
        </p>
        <a href="#!/" class="oc-button">Volver al inicio</a>
      </div>
    `;
  }
}
