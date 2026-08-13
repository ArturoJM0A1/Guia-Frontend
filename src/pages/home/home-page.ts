import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageController } from '@open-cells/page-controller';
import { lessons } from '../../data/lessons.js';

@customElement('home-page')
export class HomePage extends LitElement {
  pageController = new PageController(this);

  createRenderRoot() {
    return this;
  }

  onPageEnter() {
    this.pageController.publish('active-lesson', null);
    this.pageController.publish('lifecycle-events', {
      type: 'enter',
      page: 'home',
      at: new Date().toLocaleTimeString(),
    });
  }

  onPageLeave() {
    this.pageController.publish('lifecycle-events', {
      type: 'leave',
      page: 'home',
      at: new Date().toLocaleTimeString(),
    });
  }

  private _start() {
    this.pageController.navigate('lesson', { lessonId: lessons[0].id });
  }

  render() {
    return html`
      <div class="home-shell">
        <section class="home-hero">
          <span class="oc-chip">Curso interactivo</span>
          <h1>Open Cells <span class="home-hero-mark">desde cero</span></h1>
          <p class="home-lead">
            Aprende Open Cells construyendo esta misma aplicación. Cada lección explica una pieza
            con lenguaje sencillo, código real y una demo que puedes tocar.
          </p>
          <div class="home-hero-actions">
            <button class="oc-button accent" @click=${this._start}>Empezar el curso</button>
            <span class="home-hero-meta">${lessons.length} lecciones · SPA real con Open Cells</span>
          </div>
        </section>

        <section class="home-section">
          <h2 class="home-section-title">Lecciones</h2>
          <div class="home-grid">
            ${lessons.map(
              (lesson) => html`
                <a class="lesson-card" href="#!/lesson/${lesson.id}">
                  <span class="card-num">${lesson.index + 1}</span>
                  <div class="card-body">
                    <h3 class="card-title">${lesson.title}</h3>
                    <p class="card-subtitle">${lesson.subtitle}</p>
                  </div>
                  <span class="card-arrow">→</span>
                </a>
              `,
            )}
          </div>
        </section>

        <section class="home-section home-howto">
          <h2 class="home-section-title">Cómo se usa este curso</h2>
          <div class="home-howto-grid">
            <div class="home-howto-item">
              <strong>1 · Lee</strong>
              <p>Cada lección empieza con la idea en lenguaje sencillo: qué es, para qué sirve.</p>
            </div>
            <div class="home-howto-item">
              <strong>2 · Mira el código</strong>
              <p>Cada concepto va acompañado de un ejemplo real, sin recortes ni pseudocódigo.</p>
            </div>
            <div class="home-howto-item">
              <strong>3 · Toca la demo</strong>
              <p>Las demos son componentes vivos dentro de esta página. Experimenta con ellos.</p>
            </div>
            <div class="home-howto-item">
              <strong>4 · Aplica</strong>
              <p>Al final de cada lección hay un resumen con lo esencial para llevártelo.</p>
            </div>
          </div>
          <p class="home-howto-note">
            Este curso lo construimos con Open Cells: fíjate en cómo la URL cambia, cómo el menú
            lateral sigue tu progreso y cómo las páginas se cargan bajo demanda.
          </p>
        </section>
      </div>
    `;
  }
}
