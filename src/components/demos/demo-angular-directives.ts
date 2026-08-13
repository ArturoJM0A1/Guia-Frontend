import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('demo-angular-directives')
export class DemoAngularDirectives extends LitElement {
  @state()
  private _sesion = false;

  @state()
  private _items = ['a', 'b', 'c'];

  @state()
  private _opcion = 'a';

  @state()
  private _estado = 'activo';

  createRenderRoot() {
    return this;
  }

  private _addItem() {
    this._items = [...this._items, `item-${this._items.length + 1}`];
  }

  private _removeItem(item: string) {
    this._items = this._items.filter((i) => i !== item);
  }

  render() {
    return html`
      <div>
        <div class="grid-2">
          <div class="grid-2-main">
            <div class="demo-lit-box">
              <p class="demo-lit-label">1 · *ngIf / @if — mostrar u ocultar</p>
              <div class="demo-actions">
                <button class="oc-button" @click=${() => (this._sesion = !this._sesion)}>
                  ${this._sesion ? 'Cerrar sesión' : 'Iniciar sesión'}
                </button>
              </div>
              ${this._sesion
                ? html`<p class="demo-polymer-result">Hola, <b>ana</b> 👋</p>`
                : html`<p class="demo-polymer-result">No hay sesión iniciada.</p>`}
              <p class="log-line log-dim" style="font-size:0.82rem">
                Equivale a <code>@if (sesion) { … } @else { … }</code>. El bloque se añade o se
                quita del DOM, no solo se esconde.
              </p>
            </div>

            <div class="demo-lit-box">
              <p class="demo-lit-label">2 · *ngFor / @for — recorrer listas</p>
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
              <p class="log-line log-dim" style="font-size:0.82rem">
                Equivale a <code>@for (item of items; track item.id)</code> o a
                <code>*ngFor="let item of items"</code>.
              </p>
            </div>
          </div>

          <div class="grid-2-side">
            <div class="demo-lit-box">
              <p class="demo-lit-label">3 · [ngClass] / [class.nombre] — clases dinámicas</p>
              <div class="demo-actions">
                <button class="oc-button" @click=${() => (this._opcion = 'a')}>Elegir A</button>
                <button class="oc-button" @click=${() => (this._opcion = 'b')}>Elegir B</button>
              </div>
              <p class="log-line log-dim" style="font-size:0.82rem">
                <code>[class.seleccionada]="opcion === 'b'"</code> enciende una clase según la
                condición. Prueba a pulsar los botones:
              </p>
              <div class="${this._opcion === 'b' ? 'lit-tone seleccionada' : 'lit-tone'}">
                Opción B ${this._opcion === 'b' ? '· clase seleccionada ✓' : ''}
              </div>
            </div>

            <div class="demo-lit-box">
              <p class="demo-lit-label">4 · Data binding — componente ↔ template</p>
              <div class="demo-actions">
                <button class="oc-button" @click=${() => (this._estado = this._estado === 'activo' ? 'inactivo' : 'activo')}>
                  Cambiar estado (${this._estado})
                </button>
              </div>
              <p class="demo-polymer-result">
                Estado mostrado con interpolación: <b>${this._estado}</b>
              </p>
              <p class="log-line log-dim" style="font-size:0.82rem">
                La interpolación <code>{{ estado }}</code> es el mismo flujo: componente → template.
                El binding <code>[disabled]</code> haría lo mismo sobre un atributo.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
