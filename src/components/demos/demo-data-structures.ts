import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('demo-data-structures')
export class DemoDataStructures extends LitElement {
  @state()
  private _pila: string[] = [];

  @state()
  private _cola: string[] = [];

  @state()
  private _set = new Set<string>(['a', 'b', 'c']);

  @state()
  private _map = new Map<number, number>([[1, 10], [2, 20]]);

  @state()
  private _objeto = { nombre: 'Ana', edad: 34, rol: 'dev' };

  @state()
  private _array = ['primera', 'segunda', 'tercera'];

  @state()
  private _nuevoSet = '';

  private _contadorPila = 0;
  private _contadorCola = 0;

  createRenderRoot() {
    return this;
  }

  private _pushPila() {
    this._contadorPila++;
    this._pila = [...this._pila, `tarea-${this._contadorPila}`];
  }

  private _popPila() {
    this._pila = this._pila.slice(0, -1);
  }

  private _pushCola() {
    this._contadorCola++;
    this._cola = [...this._cola, `cliente-${this._contadorCola}`];
  }

  private _shiftCola() {
    this._cola = this._cola.slice(1);
  }

  private _addSet() {
    const valor = this._nuevoSet.trim();
    if (!valor) return;
    this._set = new Set(this._set).add(valor);
    this._nuevoSet = '';
  }

  private _incMap(clave: number) {
    const next = new Map(this._map);
    next.set(clave, (next.get(clave) ?? 0) + 1);
    this._map = next;
  }

  private _incEdad() {
    this._objeto = { ...this._objeto, edad: this._objeto.edad + 1 };
  }

  render() {
    const unicos = [...new Set(this._array)];

    return html`
      <div>
        <div class="grid-2">
          <div class="grid-2-main">
            <div class="demo-lit-box">
              <p class="demo-lit-label">1 · Array — lista ordenada</p>
              <ul class="vj-list">
                ${this._array.map((item) => html`<li class="vj-item"><code>${item}</code></li>`)}
              </ul>
              <div class="demo-actions">
                <button class="oc-button" @click=${() => (this._array = [...this._array, `item-${this._array.length + 1}`])}>push (final)</button>
                <button class="oc-button" @click=${() => (this._array = this._array.slice(0, -1))}>pop (final)</button>
                <button class="oc-button" @click=${() => (this._array = [...this._array, 'a', 'a', 'b'])}>añadir repetidos</button>
              </div>
              <p class="log-line log-dim" style="font-size:0.82rem">
                Únicos con <code>[...new Set(array)]</code>: <b>${unicos.join(', ')}</b>. El
                orden es el de inserción.
              </p>
            </div>

            <div class="demo-lit-box">
              <p class="demo-lit-label">2 · Object — datos por clave/valor</p>
              <p class="log-line">
                ${Object.entries(this._objeto)
                  .map(([clave, valor]) => `${clave}: <b>${valor}</b>`)
                  .join(' · ')}
              </p>
              <div class="demo-actions">
                <button class="oc-button" @click=${this._incEdad}>sumar edad (spread)</button>
                <button class="oc-button" @click=${() => (this._objeto = { ...this._objeto, rol: 'senior' })}>cambiar rol</button>
              </div>
              <p class="log-line log-dim" style="font-size:0.82rem">
                Se recorre con <code>Object.entries</code>. Cada cambio es una copia nueva con
                spread, sin tocar el objeto anterior.
              </p>
            </div>
          </div>

          <div class="grid-2-side">
            <div class="demo-lit-box">
              <p class="demo-lit-label">3 · Map — claves de cualquier tipo</p>
              <ul class="vj-list">
                ${[...this._map.entries()].map(
                  ([clave, valor]) => html`
                    <li class="vj-item">
                      <code>id ${clave}</code>
                      <span style="display:flex; align-items:center; gap:8px;">
                        <b>${valor} vistas</b>
                        <button class="oc-button" @click=${() => this._incMap(clave)}>+1</button>
                      </span>
                    </li>
                  `,
                )}
              </ul>
              <p class="log-line log-dim" style="font-size:0.82rem">
                <code>set</code> guarda, <code>get</code> lee, <code>has</code> comprueba y
                <code>size</code> cuenta. Aquí las claves son números.
              </p>
            </div>

            <div class="demo-lit-box">
              <p class="demo-lit-label">4 · Set — valores únicos</p>
              <ul class="vj-list">
                ${[...this._set].map((v) => html`<li class="vj-item"><code>${v}</code></li>`)}
              </ul>
              <div style="display:flex; gap:8px;">
                <input
                  class="station-input" style="flex:1;"
                  type="text"
                  .value=${this._nuevoSet}
                  @input=${(e: Event) => (this._nuevoSet = (e.target as HTMLInputElement).value)}
                  placeholder="Valor a añadir…"
                />
                <button class="oc-button primary" @click=${this._addSet}>add</button>
              </div>
              <p class="log-line log-dim" style="font-size:0.82rem">
                Añade <code>a</code>: no pasa nada, ya existe. El Set garantiza unicidad y
                <code>has</code> es instantáneo.
              </p>
            </div>
          </div>
        </div>

        <div class="demo-lit-box" style="margin-top: 14px;">
          <p class="demo-lit-label">5 · Stack (pila) y Queue (cola)</p>
          <div class="grid-2">
            <div>
              <p class="log-line"><b>Pila — LIFO (push / pop)</b></p>
              <ul class="vj-list">
                ${this._pila.length === 0
                  ? html`<li class="vj-item log-dim">vacía</li>`
                  : this._pila.map((p) => html`<li class="vj-item"><code>${p}</code></li>`)}
              </ul>
              <div class="demo-actions">
                <button class="oc-button" @click=${this._pushPila}>push</button>
                <button class="oc-button" @click=${this._popPila} ?disabled=${this._pila.length === 0}>pop</button>
              </div>
              <p class="log-line log-dim" style="font-size:0.82rem">
                Sale siempre lo último que entró (arriba de la pila).
              </p>
            </div>
            <div>
              <p class="log-line"><b>Cola — FIFO (push / shift)</b></p>
              <ul class="vj-list">
                ${this._cola.length === 0
                  ? html`<li class="vj-item log-dim">vacía</li>`
                  : this._cola.map((c) => html`<li class="vj-item"><code>${c}</code></li>`)}
              </ul>
              <div class="demo-actions">
                <button class="oc-button" @click=${this._pushCola}>push</button>
                <button class="oc-button" @click=${this._shiftCola} ?disabled=${this._cola.length === 0}>shift</button>
              </div>
              <p class="log-line log-dim" style="font-size:0.82rem">
                Sale siempre lo primero que entró (frente de la cola).
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
