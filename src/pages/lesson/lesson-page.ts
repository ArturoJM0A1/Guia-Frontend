import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { PageController } from '@open-cells/page-controller';
import { getLessonById, getLessonByIndex, lessons } from '../../data/lessons.js';
import type { Lesson, LessonSection } from '../../data/types.js';

import '../../components/oc-code-block.js';
import '../../components/demos/demo-web-component.js';
import '../../components/demos/demo-initialization.js';
import '../../components/demos/oc-tree.js';
import '../../components/demos/demo-routing.js';
import '../../components/demos/demo-programmatic-nav.js';
import '../../components/demos/demo-counter.js';
import '../../components/demos/demo-channels.js';
import '../../components/demos/demo-controllers.js';
import '../../components/demos/demo-lifecycle.js';
import '../../components/demos/demo-app-context.js';
import '../../components/demos/demo-architecture.js';
import '../../components/demos/demo-shadow.js';
import '../../components/demos/demo-lit.js';
import '../../components/demos/demo-polymer.js';
import '../../components/demos/demo-react-hooks.js';
import '../../components/demos/demo-angular-directives.js';
import '../../components/demos/demo-bootstrap.js';
import '../../components/demos/demo-vanilla-js.js';
import '../../components/demos/demo-data-structures.js';
import '../../components/demos/demo-typescript.js';
import '../../components/demos/demo-testing.js';

@customElement('lesson-page')
export class LessonPage extends LitElement {
  pageController = new PageController(this);

  @property({ type: Object })
  params: { lessonId?: string } = {};

  createRenderRoot() {
    return this;
  }

  private get _lesson(): Lesson | undefined {
    return getLessonById(this.params?.lessonId);
  }

  onPageEnter() {
    const lesson = this._lesson;
    if (lesson) {
      this.pageController.publish('active-lesson', { id: lesson.id, index: lesson.index });
    }
    this.pageController.publish('lifecycle-events', {
      type: 'enter',
      page: 'lesson',
      at: new Date().toLocaleTimeString(),
    });
    this._scrollToTop();
  }

  onPageLeave() {
    this.pageController.publish('lifecycle-events', {
      type: 'leave',
      page: 'lesson',
      at: new Date().toLocaleTimeString(),
    });
  }

  private _scrollToTop() {
    const host = this.closest('app-index');
    const content = host?.shadowRoot?.querySelector('.content');
    if (content) {
      content.scrollTo(0, 0);
    }
  }

  private _escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  private _inline(text: string) {
    const escaped = this._escapeHtml(text);
    const parts = escaped.split('`');
    const out: unknown[] = [];
    parts.forEach((part, i) => {
      if (i % 2 === 1) {
        out.push(html`<code>${part}</code>`);
      } else if (part) {
        out.push(part);
      }
    });
    return out;
  }

  private _paragraphs(text: string) {
    return text
      .split('\n\n')
      .filter((p) => p.trim().length > 0)
      .map((p) => html`<p>${this._inline(p.trim())}</p>`);
  }

  private _renderSection(section: LessonSection) {
    switch (section.type) {
      case 'intro':
        return html`<section class="lesson-section"><div class="lesson-intro">${this._paragraphs(section.text)}</div></section>`;

      case 'problem':
        return html`<section class="lesson-section"><div class="lesson-problem"><span class="problem-label">¿Qué problema resuelve?</span>${this._paragraphs(section.text)}</div></section>`;

      case 'text':
        return html`<section class="lesson-section">${section.title ? html`<h2>${section.title}</h2>` : ''}${this._paragraphs(section.text)}</section>`;

      case 'code':
        return html`<section class="lesson-section"><oc-code-block .sample=${section.sample}></oc-code-block></section>`;

      case 'explain':
        return html`<section class="lesson-section lesson-explain">${section.title ? html`<h2>${section.title}</h2>` : ''}<ul>${section.points.map((p) => html`<li>${this._inline(p)}</li>`)}</ul></section>`;

      case 'table':
        return html`<section class="lesson-section">${section.title ? html`<h2>${section.title}</h2>` : ''}<div class="lesson-table-wrap"><table class="lesson-table">${section.caption ? html`<caption>${section.caption}</caption>` : ''}<thead><tr>${section.headers.map((h) => html`<th>${h}</th>`)}</tr></thead><tbody>${section.rows.map((row) => html`<tr>${row.map((cell) => html`<td>${this._inline(cell)}</td>`)}</tr>`)}</tbody></table></div></section>`;

      case 'demo':
        return html`<section class="lesson-section"><h2>${section.title}</h2><div class="demo-panel">${section.description ? html`<p class="demo-desc">${section.description}</p>` : ''}${unsafeHTML(`<${section.component}></${section.component}>`)}${section.howTo && section.howTo.length ? html`<div class="demo-howto"><strong>Prueba tú:</strong><ol>${section.howTo.map((h) => html`<li>${this._inline(h)}</li>`)}</ol></div>` : ''}</div></section>`;

      case 'note':
        return html`<section class="lesson-section"><div class="lesson-note"><span class="note-label">Nota</span>${this._paragraphs(section.text)}</div></section>`;

      case 'summary':
        return html`<section class="lesson-summary"><h3>Resumen final</h3><ul>${section.points.map((p) => html`<li>${this._inline(p)}</li>`)}</ul></section>`;
    }
  }

  private _renderPrevNext(lesson: Lesson) {
    const prev = getLessonByIndex(lesson.index - 1);
    const next = getLessonByIndex(lesson.index + 1);
    return html`<div class="lesson-prevnext">
      ${prev
        ? html`<button class="oc-button" @click=${() => this._go(prev.id)}>← ${prev.index + 1}. ${prev.title}</button>`
        : html`<span></span>`}
      ${next
        ? html`<button class="oc-button primary" @click=${() => this._go(next.id)}>${next.index + 1}. ${next.title} →</button>`
        : html`<button class="oc-button accent" @click=${this._finish}>Completar el curso ✓</button>`}
    </div>`;
  }

  private _go(id: string) {
    this.pageController.navigate('lesson', { lessonId: id });
  }

  private _finish() {
    this.pageController.navigate('home');
  }

  render() {
    const lesson = this._lesson;
    if (!lesson) {
      return html`<div class="lesson-empty">
        <h2>Lección no encontrada</h2>
        <p>La URL que has pedido no corresponde a ninguna lección.</p>
        <a href="#!/" class="oc-button">Volver al inicio</a>
      </div>`;
    }
    return html`
      <article class="lesson-shell">
        <header class="lesson-header">
          <div class="lesson-kicker">
            <span class="oc-chip">Lección ${lesson.index + 1} de ${lessons.length}</span>
          </div>
          <h1>${lesson.title}</h1>
          <p class="lesson-subtitle">${lesson.subtitle}</p>
        </header>
        ${lesson.sections.map((section) => this._renderSection(section))}
        ${this._renderPrevNext(lesson)}
      </article>
    `;
  }
}
