import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('demo-react-hooks')
export class DemoReactHooks extends LitElement {
  @state()
  private _contador = 0;

  @state()
  private _tema = 'claro';

  @state()
  private _cargando = true;

  @state()
  private _datos: string[] = [];

  private _timers: number[] = [];

  private _inputRef: HTMLInputElement | null = null;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    // Simula el useEffect(..., []) que carga datos "una vez al montar"
    const t = window.setTimeout(() => {
      this._datos = ['pedro', 'maria', 'lucia'];
      this._cargando = false;
    }, 800);
    this._timers.push(t);
  }

  disconnectedCallback() {
    // Simula el cleanup del useEffect
    this._timers.forEach((t) => clearTimeout(t));
    super.disconnectedCallback();
  }

  private _enfocar() {
    this._inputRef?.focus();
  }

  render() {
    return html`
      <div>
        <div class="grid-2">
          <div class="grid-2-main">
            <div class="demo-lit-box">
              <p class="demo-lit-label">1 · useState — estado local</p>
              <div class="demo-actions">
                <button class="oc-button" @click=${() => this._contador++}>+1</button>
                <button class="oc-button" @click=${() => (this._contador = 0)}>Reset</button>
              </div>
              <p class="demo-polymer-result">
                Contador: <b>${this._contador}</b>
              </p>
              <p class="log-line log-dim" style="font-size:0.82rem">
                Equivale a <code>const [contador, setContador] = useState(0)</code>. Cada cambio de
                estado vuelve a ejecutar <code>render()</code>.
              </p>
            </div>

            <div class="demo-lit-box">
              <p class="demo-lit-label">2 · useEffect — efectos secundarios ([] = al montar)</p>
              ${this._cargando
                ? html`<p class="log-line">Cargando datos…</p>`
                : html`<ul class="lit-list">
                    ${this._datos.map((dato) => html`<li><code>${dato}</code></li>`)}
                  </ul>`}
              <p class="log-line log-dim" style="font-size:0.82rem">
                Al entrar, un "efecto" busca datos una sola vez (deps vacías) y luego repinta. Cuando
                el componente se va, el cleanup limpia el temporizador — igual que el
                <code>unsubscribe</code> de Open Cells.
              </p>
            </div>
          </div>

          <div class="grid-2-side">
            <div class="demo-lit-box">
              <p class="demo-lit-label">3 · useRef — referencia al DOM</p>
              <input
                class="station-input" style="width:100%"
                type="text"
                placeholder="Este input lo enfoca el botón"
                ref=${(el: Element | null) => (this._inputRef = el as HTMLInputElement)}
              />
              <div class="demo-actions" style="margin-top:8px">
                <button class="oc-button primary" @click=${this._enfocar}>Enfocar el input</button>
              </div>
              <p class="log-line log-dim" style="font-size:0.82rem">
                <code>useRef</code> apunta al elemento real del DOM sin provocar re-renders.
              </p>
            </div>

            <div class="demo-lit-box">
              <p class="demo-lit-label">4 · useContext — valor global sin prop drilling</p>
              <div class="demo-actions">
                <button class="oc-button" @click=${() => (this._tema = this._tema === 'claro' ? 'oscuro' : 'claro')}>
                  Cambiar tema (${this._tema})
                </button>
              </div>
              <div class="lit-tone" style="border-color:${this._tema === 'claro' ? 'var(--oc-color-accent-strong)' : 'var(--oc-color-warning-border)'}">
                Un Provider ofrece el tema; cualquier componente lo lee con useContext.
              </div>
              <p class="log-line log-dim" style="font-size:0.82rem">
                En Open Cells esto lo haría un canal global: mismo dato compartido, sin árbol de
                proveedores.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
