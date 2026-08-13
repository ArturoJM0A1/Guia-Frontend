import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

interface Tarea {
  texto: string;
  hecha: boolean;
}

type Filtro = 'todas' | 'pendientes' | 'hechas';

@customElement('demo-vanilla-js')
export class DemoVanillaJs extends LitElement {
  @state()
  private _tareas: Tarea[] = [
    { texto: 'Aprender querySelector', hecha: true },
    { texto: 'Probar addEventListener', hecha: false },
  ];

  @state()
  private _filtro: Filtro = 'todas';

  @state()
  private _cargando = false;

  @state()
  private _datos: string[] = [];

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    // addEventListener de verdad: el botón "Cargar datos" usa una llamada asíncrona simulada
    this.updateComplete.then(() => {
      const boton = this.querySelector<HTMLButtonElement>('#btn-cargar');
      if (boton && !boton.dataset.vinculado) {
        boton.dataset.vinculado = 'true';
        boton.addEventListener('click', () => void this._cargarDatos());
      }
    });

    // Ejemplos ES6+ que se imprimen en consola: destructuring y spread/rest
    const ana = { nombre: 'Ana', edad: 34, rol: 'dev' };
    const { nombre, rol } = ana;
    const base = [1, 2, 3];
    const copia = [...base, 4];
    const junta = (...n: number[]) => n.reduce((acc, x) => acc + x, 0);
    console.log('[demo-vanilla-js] destructuring:', nombre, rol);
    console.log('[demo-vanilla-js] spread:', copia);
    console.log('[demo-vanilla-js] rest + reduce:', junta(1, 2, 3, 4));
  }

  private _anadir(e: Event) {
    e.preventDefault(); // el clásico preventDefault del submit
    const input = this.querySelector<HTMLInputElement>('#input-tarea');
    const lista = this.querySelector<HTMLUListElement>('#lista-tareas');
    if (!input || !lista) return;

    const texto = input.value.trim();
    if (!texto) return;

    // Vanilla DOM: createElement + appendChild (no es un re-render de Lit)
    const li = document.createElement('li');
    li.className = 'vj-item';
    li.textContent = texto;
    lista.appendChild(li);

    this._tareas = [...this._tareas, { texto, hecha: false }];
    input.value = '';
  }

  private async _cargarDatos() {
    this._cargando = true;
    // Simula fetch: una Promise que tarda ~900ms en "llegar del servidor"
    const datos = await new Promise<string[]>((resolve) =>
      setTimeout(() => resolve(['pedro@mail.com', 'maria@mail.com', 'lucia@mail.com']), 900),
    );
    this._datos = datos;
    this._cargando = false;
  }

  private _toggle(index: number) {
    this._tareas = this._tareas.map((t, i) => (i === index ? { ...t, hecha: !t.hecha } : t));
  }

  private _visibles(): Tarea[] {
    switch (this._filtro) {
      case 'pendientes':
        return this._tareas.filter((t) => !t.hecha);
      case 'hechas':
        return this._tareas.filter((t) => t.hecha);
      default:
        return this._tareas;
    }
  }

  render() {
    const visibles = this._visibles();
    const pendientes = this._tareas.filter((t) => !t.hecha).length;
    const hechas = this._tareas.reduce((acc, t) => acc + (t.hecha ? 1 : 0), 0);

    return html`
      <div>
        <div class="grid-2">
          <div class="grid-2-main">
            <div class="demo-lit-box">
              <p class="demo-lit-label">1 · DOM — querySelector, createElement, appendChild</p>
              <form id="form-tarea" @submit=${this._anadir}>
                <div style="display:flex; gap:8px;">
                  <input
                    id="input-tarea"
                    class="station-input" style="flex:1;"
                    type="text"
                    placeholder="Escribe una tarea y pulsa Añadir…"
                  />
                  <button type="submit" class="oc-button primary">Añadir</button>
                </div>
              </form>
              <p class="log-line log-dim" style="font-size:0.82rem">
                Cada tarea se crea con <code>createElement</code> y se inserta con
                <code>appendChild</code> sobre <code>#lista-tareas</code> (búscalo con
                <code>querySelector</code>). No es un re-render de Lit: es DOM a pelo.
              </p>
            </div>

            <div class="demo-lit-box">
              <p class="demo-lit-label">2 · Arrays — map, filter, reduce</p>
              <div class="demo-actions">
                ${(['todas', 'pendientes', 'hechas'] as Filtro[]).map(
                  (f) => html`
                    <button
                      class="oc-button ${this._filtro === f ? 'primary' : ''}"
                      @click=${() => (this._filtro = f)}
                    >
                      ${f}
                    </button>
                  `,
                )}
              </div>
              <ul id="lista-tareas" class="vj-list">
                ${visibles.map(
                  (tarea, i) => html`
                    <li class="vj-item ${tarea.hecha ? 'hecha' : ''}">
                      <span>${tarea.texto}</span>
                      <button class="oc-button" @click=${() => this._toggle(i)}>
                        ${tarea.hecha ? 'deshacer' : 'hecha ✓'}
                      </button>
                    </li>
                  `,
                )}
              </ul>
              <p class="log-line log-dim" style="font-size:0.82rem">
                <code>filter</code> decide qué se ve, <code>map</code> pinta cada fila y
                <code>reduce</code> suma: ${pendientes} pendientes, ${hechas} hechas.
              </p>
            </div>
          </div>

          <div class="grid-2-side">
            <div class="demo-lit-box">
              <p class="demo-lit-label">3 · Asincronía — Promise, async/await, fetch</p>
              <div class="demo-actions">
                <button id="btn-cargar" class="oc-button primary" ?disabled=${this._cargando}>
                  ${this._cargando ? 'Cargando…' : 'Cargar datos (fetch simulado)'}
                </button>
              </div>
              ${this._cargando
                ? html`<p class="log-line">Esperando a la Promise…</p>`
                : html`
                    ${this._datos.length
                      ? html`<ul class="vj-list">
                          ${this._datos.map((d) => html`<li class="vj-item"><code>${d}</code></li>`)}
                        </ul>`
                      : html`<p class="log-line log-dim" style="font-size:0.82rem">
                          Un <code>await fetch(url)</code> de verdad devolvería aquí los datos del
                          servidor. Este botón usa una <code>Promise</code> con <code>setTimeout</code>.
                        </p>`}
                  `}
            </div>

            <div class="demo-lit-box">
              <p class="demo-lit-label">4 · Eventos — addEventListener, click, submit</p>
              <p class="log-line log-dim" style="font-size:0.82rem">
                El formulario de arriba escucha <code>submit</code> y llama a
                <code>event.preventDefault()</code>. Este botón fue conectado con
                <code>addEventListener</code> en <code>connectedCallback</code>.
              </p>
              <p class="log-line log-dim" style="font-size:0.82rem">
                Abre la consola (F12) al cargar la lección: verás ejemplos de destructuring,
                spread y rest impresos con <code>console.log</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
