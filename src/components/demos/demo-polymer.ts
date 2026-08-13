import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('demo-polymer')
export class DemoPolymer extends LitElement {
  @state()
  private _mensaje = 'hola';

  @state()
  private _editable = 'escribe algo…';

  @state()
  private _saludos = 0;

  @state()
  private _items = ['publish', 'subscribe'];

  createRenderRoot() {
    return this;
  }

  private _saludar() {
    this._saludos++;
  }

  private _addItem() {
    this._items = [...this._items, `item-${this._items.length + 1}`];
  }

  render() {
    return html`
      <div>
        <div class="grid-2">
          <div class="grid-2-main">
            <div class="demo-lit-box">
              <p class="demo-lit-label">1 · [[mensaje]] — binding de una dirección</p>
              <p class="demo-polymer-result">
                Dices: <b>${this._mensaje}</b>
              </p>
              <div class="demo-actions">
                <button class="oc-button" @click=${() => (this._mensaje = 'polymer')}>Estado = "polymer"</button>
                <button class="oc-button" @click=${() => (this._mensaje = 'hola')}>Estado = "hola"</button>
              </div>
              <p class="log-line log-dim" style="font-size:0.82rem">
                Como en <code>[[mensaje]]</code>, solo hay una flecha: propiedad → vista. El botón
                cambia el estado y la vista se actualiza sola. El input NO podría escribirlo.
              </p>
            </div>

            <div class="demo-lit-box">
              <p class="demo-lit-label">2 · {{editable::input}} — binding de dos direcciones</p>
              <input
                class="station-input" style="width:100%"
                type="text"
                .value=${this._editable}
                @input=${(e: Event) => (this._editable = (e.target as HTMLInputElement).value)}
                placeholder="Escribe algo…"
              />
              <p class="demo-polymer-result">
                El estado vale: <b>${this._editable}</b>
              </p>
              <p class="log-line log-dim" style="font-size:0.82rem">
                En <code>{{editable::input}}</code> hay dos flechas: el input escribe el estado
                (evento <code>input</code>) y la vista lo refleja. Es lo que hoy escribes con
                <code>.value</code> + <code>@input</code> en Lit.
              </p>
            </div>
          </div>

          <div class="grid-2-side">
            <div class="demo-lit-box">
              <p class="demo-lit-label">3 · on-click="método"</p>
              <button class="oc-button primary" @click=${this._saludar}>Saludar (${this._saludos})</button>
              <p class="log-line log-dim" style="font-size:0.82rem">
                Polymer conectaba los eventos en el propio template. El equivalente moderno es
                <code>@click</code>.
              </p>
            </div>

            <div class="demo-lit-box">
              <p class="demo-lit-label">4 · dom-repeat</p>
              <ul class="lit-list">
                ${this._items.map(
                  (item) => html`<li><code>${item}</code></li>`,
                )}
              </ul>
              <button class="oc-button" @click=${this._addItem}>Añadir elemento</button>
              <p class="log-line log-dim" style="font-size:0.82rem">
                El <code>dom-repeat</code> de Polymer repetía un template por cada elemento de la
                lista. Hoy se hace con <code>map()</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
