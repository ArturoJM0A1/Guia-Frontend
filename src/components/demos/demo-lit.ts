import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('demo-lit')
export class DemoLit extends LitElement {
  @state()
  private _name = 'mundo';

  @state()
  private _showDetail = false;

  @state()
  private _items: string[] = ['publish', 'subscribe', 'unsubscribe'];

  @state()
  private _tone = 'turquesa';

  @state()
  private _clicks = 0;

  createRenderRoot() {
    return this;
  }

  private _onName(e: Event) {
    this._name = (e.target as HTMLInputElement).value;
  }

  private _addItem() {
    this._items = [...this._items, `item-${this._items.length + 1}`];
  }

  private _removeItem(name: string) {
    this._items = this._items.filter((i) => i !== name);
  }

  render() {
    return html`
      <div>
        <div class="grid-2">
          <div class="grid-2-main">
            <div class="demo-lit-box">
              <p class="demo-lit-label">1 · Reactive property + template literal</p>
              <input
                class="station-input" style="width:100%"
                type="text"
                .value=${this._name}
                @input=${this._onName}
                placeholder="Escribe tu nombre…"
              />
              <p class="demo-lit-result">Hola, <strong>${this._name || 'anónimo'}</strong> 👋</p>
              <p class="log-line log-dim" style="font-size:0.82rem">
                Cada tecla actualiza la propiedad <code>_name</code> y Lit vuelve a ejecutar
                <code>render()</code>, actualizando solo la parte que cambió.
              </p>
            </div>

            <div class="demo-lit-box">
              <p class="demo-lit-label">2 · Render condicional</p>
              <div class="demo-actions">
                <button class="oc-button" @click=${() => (this._showDetail = !this._showDetail)}>
                  ${this._showDetail ? 'Ocultar detalle' : 'Mostrar detalle'}
                </button>
              </div>
              ${this._showDetail
                ? html`<div class="lesson-note" style="margin-top:6px">
                    <span class="note-label">Detalle visible</span>
                    <p style="margin:4px 0 0">
                      Este bloque solo existe en el DOM mientras la condición es verdadera
                      (<code>?con&nbsp;ternario</code>).
                    </p>
                  </div>`
                : ''}
            </div>
          </div>

          <div class="grid-2-side">
            <div class="demo-lit-box">
              <p class="demo-lit-label">3 · Listas con map()</p>
              <ul class="lit-list">
                ${this._items.map(
                  (item) => html`
                    <li>
                      <code>${item}</code>
                      <button class="lit-remove" @click=${() => this._removeItem(item)} aria-label="Quitar ${item}">×</button>
                    </li>
                  `,
                )}
              </ul>
              <button class="oc-button" @click=${this._addItem}>Añadir elemento</button>
            </div>

            <div class="demo-lit-box">
              <p class="demo-lit-label">4 · Eventos + style binding</p>
              <div class="demo-actions">
                <button class="oc-button primary" @click=${() => this._clicks++}>
                  Púlsame (${this._clicks})
                </button>
              </div>
              <div class="lit-tone" style="border-color:${this._tone === 'turquesa' ? 'var(--oc-color-accent-strong)' : 'var(--oc-color-warning-border)'}">
                <label>Elige el color del borde:</label>
                <div class="demo-actions">
                  <button class="oc-button" @click=${() => (this._tone = 'turquesa')}>Turquesa</button>
                  <button class="oc-button" @click=${() => (this._tone = 'ámbar')}>Ámbar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
