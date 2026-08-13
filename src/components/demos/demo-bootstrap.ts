import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

type Bp = 'sm' | 'md' | 'lg' | 'xl';

const BP_WIDTHS: Record<Bp, number> = { sm: 576, md: 768, lg: 992, xl: 1200 };
const BP_ORDER: Bp[] = ['sm', 'md', 'lg', 'xl'];

@customElement('demo-bootstrap')
export class DemoBootstrap extends LitElement {
  static styles = css`
    :host {
      display: block;
      --demo-bp-width: 992px;
    }

    .demo-wrap {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    /* --- Barra de breakpoints --- */
    .bp-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      font-size: 0.85rem;
    }

    .bp-chip {
      border: 1px solid var(--oc-color-border);
      background: transparent;
      color: var(--oc-color-text);
      border-radius: 999px;
      padding: 4px 12px;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.82rem;
    }

    .bp-chip.active {
      background: var(--oc-color-accent-strong);
      border-color: var(--oc-color-accent-strong);
      color: #fff;
    }

    .bp-width {
      color: #7f8ea3;
      font-variant-numeric: tabular-nums;
    }

    /* --- Contenedor simulado --- */
    .screen {
      border: 1px dashed var(--oc-color-border);
      border-radius: 10px;
      padding: 12px;
      max-width: var(--demo-bp-width);
      width: 100%;
      transition: max-width 0.25s ease;
    }

    .screen-label {
      margin: 0 0 8px;
      font-size: 0.78rem;
      color: #7f8ea3;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* --- Grid (mini-Bootstrap) --- */
    .container {
      width: 100%;
      margin-inline: auto;
      padding-inline: 12px;
      box-sizing: border-box;
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      margin-inline: -12px;
      box-sizing: border-box;
    }

    .row > * {
      padding-inline: 12px;
      box-sizing: border-box;
    }

    .col-12 { flex: 0 0 100%; max-width: 100%; }
    .col-md-6 { flex: 0 0 50%; max-width: 50%; }
    .col-xl-3 { flex: 0 0 25%; max-width: 25%; }

    .grid-cell {
      background: color-mix(in srgb, var(--oc-color-accent-strong) 14%, transparent);
      border: 1px solid color-mix(in srgb, var(--oc-color-accent-strong) 40%, transparent);
      border-radius: 6px;
      padding: 10px;
      text-align: center;
      font-size: 0.82rem;
      margin-bottom: 12px;
    }

    .grid-cell code { font-size: 0.72rem; color: var(--oc-color-accent-strong); }

    /* --- Componentes --- */
    .btn {
      display: inline-block;
      border: 1px solid transparent;
      border-radius: 6px;
      padding: 6px 14px;
      font-size: 0.85rem;
      cursor: pointer;
      font-family: inherit;
      color: #fff;
    }

    .btn-primary { background: var(--oc-color-accent-strong); }
    .btn-primary:hover { filter: brightness(1.1); }
    .btn-success { background: #2a9d6f; }
    .btn-outline-secondary { background: transparent; border-color: #9aa8b8; color: var(--oc-color-text); }
    .btn-danger { background: #d9534f; }
    .btn-sm { padding: 3px 9px; font-size: 0.78rem; }

    .alert {
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 0.85rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }

    .alert-danger { background: #fdecea; border: 1px solid #f5c6c4; color: #a23a2c; }
    .alert-info { background: #e7f5fb; border: 1px solid #b6daf0; color: #1d5f86; }

    .btn-close {
      border: none;
      background: none;
      color: inherit;
      font-size: 1rem;
      cursor: pointer;
      line-height: 1;
    }

    .card {
      border: 1px solid var(--oc-color-border);
      border-radius: 10px;
      background: var(--oc-color-surface);
      max-width: 18rem;
      overflow: hidden;
    }

    .card-body { padding: 14px 16px; }
    .card-title { margin: 0 0 6px; font-size: 1rem; }
    .card-text { margin: 0 0 10px; font-size: 0.85rem; color: #7f8ea3; }
    .card-tag {
      display: inline-block;
      background: color-mix(in srgb, var(--oc-color-accent-strong) 16%, transparent);
      color: var(--oc-color-accent-strong);
      font-size: 0.72rem;
      border-radius: 999px;
      padding: 2px 10px;
      margin-bottom: 8px;
    }

    /* Navbar */
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      background: #17203a;
      color: #fff;
      border-radius: 8px;
      padding: 10px 14px;
    }

    .navbar-brand { font-weight: 700; font-size: 0.95rem; }

    .navbar-toggler {
      background: none;
      border: 1px solid #46536e;
      border-radius: 6px;
      color: #fff;
      cursor: pointer;
      font-size: 1rem;
      padding: 4px 8px;
      display: none;
    }

    .nav-menu { display: flex; gap: 4px; }

    .nav-link {
      color: #c7d0e0;
      text-decoration: none;
      font-size: 0.85rem;
      border-radius: 6px;
      padding: 4px 10px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: inherit;
    }

    .nav-link.active { color: #fff; }
    .nav-link.active, .nav-link:hover { background: #2a3454; }

    .navbar.collapsed .nav-menu {
      position: absolute;
      flex-direction: column;
      background: #17203a;
      border-radius: 0 0 8px 8px;
      inset: 100% 0 auto 0;
      padding: 8px 14px;
    }

    .navbar { position: relative; }

    .navbar.collapsed .navbar-toggler { display: inline-block; }
    .navbar.collapsed .nav-menu { display: none; }
    .navbar.collapsed .nav-menu.open { display: flex; }

    /* Modal */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(10, 18, 30, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 60;
    }

    .modal-dialog {
      background: var(--oc-color-surface);
      border: 1px solid var(--oc-color-border);
      border-radius: 12px;
      max-width: 26rem;
      width: 100%;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
    }

    .modal-header, .modal-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
    }

    .modal-header { border-bottom: 1px solid var(--oc-color-border); }
    .modal-footer { border-top: 1px solid var(--oc-color-border); justify-content: flex-end; }
    .modal-title { margin: 0; font-size: 1rem; }
    .modal-body { padding: 14px 16px; font-size: 0.88rem; color: #7f8ea3; }

    /* --- Utilidades --- */
    .u-block {
      border: 1px dashed var(--oc-color-border);
      border-radius: 8px;
      padding: 12px;
      font-size: 0.82rem;
    }

    .u-label {
      display: block;
      font-size: 0.72rem;
      color: #7f8ea3;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .d-flex { display: flex; }
    .flex-column { flex-direction: column; }
    .justify-content-between { justify-content: space-between; }
    .align-items-center { align-items: center; }
    .gap-2 { gap: 8px; }
    .text-center { text-align: center; }
    .text-secondary { color: #7f8ea3; }
    .rounded { border-radius: 8px; }
    .shadow-sm { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18); }
    .mx-auto { margin-inline: auto; }
    .p-2 { padding: 8px; }
    .mt-3 { margin-top: 12px; }
    .mb-0 { margin-bottom: 0; }

    .demo-note {
      font-size: 0.78rem;
      color: #7f8ea3;
    }
  `;

  @state()
  private _bp: Bp = 'lg';

  @state()
  private _alertVisible = true;

  @state()
  private _menuOpen = false;

  @state()
  private _modalOpen = false;

  private get _isSm() {
    return this._bp === 'sm';
  }

  private get _gridCol() {
    switch (this._bp) {
      case 'xl':
        return 'col-xl-3';
      case 'lg':
      case 'md':
        return 'col-md-6';
      default:
        return 'col-12';
    }
  }

  private get _gridColsLabel() {
    switch (this._bp) {
      case 'xl':
        return '4 columnas (col-xl-3)';
      case 'lg':
      case 'md':
        return '2 columnas (col-md-6)';
      default:
        return '1 columna (col-12)';
    }
  }

  private _setBp(bp: Bp) {
    this._bp = bp;
  }

  render() {
    return html`
      <div class="demo-wrap">
        <div class="bp-bar">
          <span class="demo-note">Simula el ancho de pantalla:</span>
          ${BP_ORDER.map(
            (bp) => html`
              <button class="bp-chip ${this._bp === bp ? 'active' : ''}" @click=${() => this._setBp(bp)}>
                ${bp}
              </button>
            `,
          )}
          <span class="bp-width">→ ${BP_WIDTHS[this._bp]}px (${this._gridColsLabel})</span>
        </div>

        <div class="screen" style="--demo-bp-width: ${BP_WIDTHS[this._bp]}px">
          <p class="screen-label">El "navegador" mide ${BP_WIDTHS[this._bp]}px — cambia el breakpoint arriba</p>

          <!-- Navbar responsive -->
          <nav class="navbar ${this._isSm ? 'collapsed' : ''}">
            <span class="navbar-brand">Mi App</span>
            <button class="navbar-toggler" @click=${() => (this._menuOpen = !this._menuOpen)}>☰</button>
            <div class="nav-menu ${this._menuOpen ? 'open' : ''}">
              <button class="nav-link active">Inicio</button>
              <button class="nav-link">Sobre mí</button>
              <button class="nav-link">Contacto</button>
            </div>
          </nav>

          <!-- Grid -->
          <div class="container" style="margin-top: 12px;">
            <div class="row">
              ${[1, 2, 3, 4].map(
                (n) => html`
                  <div class="${this._gridCol}">
                    <div class="grid-cell">
                      <strong>Tarjeta ${n}</strong>
                      <br />
                      <code>${this._gridCol}</code>
                    </div>
                  </div>
                `,
              )}
            </div>
          </div>

          <!-- Componentes: botones + alert -->
          <div class="d-flex gap-2" style="flex-wrap: wrap; margin-top: 4px;">
            <button class="btn btn-primary">Botón principal</button>
            <button class="btn btn-success">Éxito</button>
            <button class="btn btn-outline-secondary">Contorno</button>
          </div>

          ${this._alertVisible
            ? html`
                <div class="alert alert-danger" style="margin-top: 12px;">
                  <span>⚠️ Alerta desechable: este aviso puede cerrarse con la ×.</span>
                  <button class="btn-close" @click=${() => (this._alertVisible = false)} aria-label="Cerrar">×</button>
                </div>
              `
            : html`
                <div class="d-flex gap-2" style="margin-top: 12px;">
                  <button class="btn btn-outline-secondary btn-sm" @click=${() => (this._alertVisible = true)}>
                    Volver a mostrar la alerta
                  </button>
                </div>
              `}

          <!-- Card + botón del modal -->
          <div class="d-flex gap-2" style="align-items: flex-start; margin-top: 14px; flex-wrap: wrap;">
            <div class="card">
              <div class="card-body">
                <span class="card-tag">Componente</span>
                <h5 class="card-title">Tarjeta de ejemplo</h5>
                <p class="card-text">Una card solo con HTML: título, texto y una acción.</p>
                <button class="btn btn-primary btn-sm">Acción</button>
              </div>
            </div>

            <div>
              <button class="btn btn-primary" @click=${() => (this._modalOpen = true)}>Abrir modal</button>
              <p class="demo-note" style="margin: 8px 0 0; max-width: 16rem;">
                El modal se abre y se cierra con estado: en Bootstrap lo hace el atributo
                <code>data-bs-toggle</code>.
              </p>
            </div>
          </div>

          <!-- Utilidades -->
          <div class="u-block" style="margin-top: 14px;">
            <span class="u-label">Utilidades · d-flex justify-content-between align-items-center p-2 gap-2</span>
            <div class="d-flex justify-content-between align-items-center gap-2">
              <span><strong>Perfil de Ana</strong><br /><span class="text-secondary">Desarrolladora web</span></span>
              <span class="d-flex gap-2">
                <button class="btn btn-outline-secondary btn-sm">Editar</button>
                <button class="btn btn-danger btn-sm">Borrar</button>
              </span>
            </div>
          </div>

          <div class="u-block" style="margin-top: 12px;">
            <span class="u-label">Utilidades · mx-auto text-center rounded shadow-sm p-2</span>
            <div class="mx-auto text-center rounded shadow-sm p-2" style="max-width: 320px;">
              Caja centrada con <code>mx-auto</code>, texto centrado y sombra suave.
            </div>
          </div>
        </div>
      </div>

      ${this._modalOpen
        ? html`
            <div class="modal-backdrop" @click=${() => (this._modalOpen = false)}>
              <div class="modal-dialog" @click=${(e: Event) => e.stopPropagation()}>
                <div class="modal-header">
                  <h5 class="modal-title">Mi modal</h5>
                  <button class="btn-close" @click=${() => (this._modalOpen = false)} aria-label="Cerrar">×</button>
                </div>
                <div class="modal-body">
                  Un modal de Bootstrap se compone de header, body y footer. Aquí lo gestiona el
                  estado del componente.
                </div>
                <div class="modal-footer">
                  <button class="btn btn-outline-secondary" @click=${() => (this._modalOpen = false)}>Cerrar</button>
                  <button class="btn btn-primary">Guardar</button>
                </div>
              </div>
            </div>
          `
        : ''}
    `;
  }
}
