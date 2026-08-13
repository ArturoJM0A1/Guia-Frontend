import { startApp } from '@open-cells/core';
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../router/routes.js';
import { lessons } from '../data/lessons.js';

startApp({
  routes,
  mainNode: 'app-content',
});

@customElement('app-index')
export class AppIndex extends LitElement {
  elementController = new ElementController(this);

  @state()
  private _activeLesson: { id: string; index: number } | null = null;

  @state()
  private _menuOpen = false;

  connectedCallback() {
    super.connectedCallback();
    this.elementController.subscribe('active-lesson', (data: { id: string; index: number }) => {
      this._activeLesson = data;
    });
  }

  private get _progress(): number {
    if (!this._activeLesson) {
      return 0;
    }
    return ((this._activeLesson.index + 1) / lessons.length) * 100;
  }

  private get _progressLabel(): string {
    if (!this._activeLesson) {
      return 'Empieza con la primera lección';
    }
    return `Lección ${this._activeLesson.index + 1} de ${lessons.length}`;
  }

  private _closeMenu() {
    this._menuOpen = false;
  }

  private _toggleMenu() {
    this._menuOpen = !this._menuOpen;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .layout {
      display: flex;
      height: 100%;
    }

    .sidebar {
      width: var(--oc-sidebar-width);
      background: var(--oc-color-sidebar);
      color: #dbe2ef;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      overflow-y: auto;
      transition: transform 0.2s ease;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 18px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .brand-mark {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: var(--oc-color-accent);
      color: #06332e;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      line-height: 1.3;
    }

    .brand-text strong {
      font-size: 1rem;
      color: #fff;
    }

    .brand-text span {
      font-size: 0.8rem;
      color: #8fa1c8;
    }

    .nav {
      flex: 1;
      padding: 12px 10px 20px;
    }

    .nav-group-label {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #6d7ea3;
      padding: 14px 12px 6px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #c3cde4;
      text-decoration: none;
      font-size: 0.9rem;
      padding: 8px 12px;
      border-radius: 8px;
      margin: 1px 0;
      line-height: 1.35;
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.06);
      color: #fff;
    }

    .nav-link.active {
      background: var(--oc-color-accent);
      color: #06332e;
      font-weight: 600;
    }

    .nav-num {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.1);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      font-weight: 700;
    }

    .nav-link.active .nav-num {
      background: rgba(6, 51, 46, 0.15);
    }

    .progress {
      padding: 16px 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .progress-top {
      display: flex;
      justify-content: space-between;
      font-size: 0.78rem;
      color: #8fa1c8;
      margin-bottom: 8px;
    }

    .progress-track {
      height: 8px;
      background: rgba(255, 255, 255, 0.12);
      border-radius: 999px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--oc-color-accent);
      border-radius: 999px;
      transition: width 0.25s ease;
    }

    .progress-label {
      margin-top: 8px;
      font-size: 0.8rem;
      color: #8fa1c8;
    }

    .main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }

    .topbar {
      height: var(--oc-header-height);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 20px;
      background: var(--oc-color-surface);
      border-bottom: 1px solid var(--oc-color-border);
    }

    .topbar-title {
      color: var(--oc-color-text-soft);
      font-size: 0.9rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .burger {
      display: none;
      appearance: none;
      border: 1px solid var(--oc-color-border);
      background: transparent;
      border-radius: 8px;
      width: 38px;
      height: 38px;
      font-size: 1.1rem;
      cursor: pointer;
      color: var(--oc-color-primary);
    }

    .content {
      flex: 1;
      overflow-y: auto;
      background: var(--oc-color-bg);
    }

    @media (max-width: 900px) {
      .sidebar {
        position: fixed;
        z-index: 20;
        top: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
      }

      .sidebar.open {
        transform: translateX(0);
      }

      .burger {
        display: block;
      }
    }
  `;

  render() {
    return html`
      <div class="layout">
        <aside class="sidebar ${this._menuOpen ? 'open' : ''}">
          <div class="brand">
            <div class="brand-mark">OC</div>
            <div class="brand-text">
              <strong>Open Cells</strong>
              <span>desde cero</span>
            </div>
          </div>

          <nav class="nav">
            <a
              class="nav-link ${!this._activeLesson ? 'active' : ''}"
              href="#!/"
              @click=${this._closeMenu}
            >
              Inicio
            </a>
            <div class="nav-group-label">Lecciones</div>
            ${lessons.map(
              (lesson) => html`
                <a
                  class="nav-link ${this._activeLesson?.id === lesson.id ? 'active' : ''}"
                  href="#!/lesson/${lesson.id}"
                  @click=${this._closeMenu}
                >
                  <span class="nav-num">${lesson.index + 1}</span>
                  ${lesson.title}
                </a>
              `,
            )}
          </nav>

          <div class="progress">
            <div class="progress-top">
              <span>Progreso del curso</span>
              <span>${this._activeLesson ? `${Math.round(this._progress)}%` : '0%'}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${this._progress}%"></div>
            </div>
            <div class="progress-label">${this._progressLabel}</div>
          </div>
        </aside>

        <div class="main">
          <header class="topbar">
            <button class="burger" aria-label="Abrir menú" @click=${this._toggleMenu}>☰</button>
            <span class="topbar-title">Curso interactivo · <strong>Open Cells desde cero</strong></span>
          </header>
          <main class="content">
            <slot></slot>
          </main>
        </div>
      </div>
    `;
  }
}
