import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

interface Usuario {
  nombre: string;
  edad: number;
  activo: boolean;
  email?: string;
  readonly id: string;
}

type Estado = 'pendiente' | 'enviado' | 'entregado';

interface Pedido<T> {
  id: string;
  estado: Estado;
  contenido: T;
}

type Resultado<T> =
  | { tipo: 'ok'; valor: T }
  | { tipo: 'error'; mensaje: string };

function primero<T>(lista: T[]): T | undefined {
  return lista[0];
}

@customElement('demo-typescript')
export class DemoTypescript extends LitElement {
  @state()
  private _usuario: Usuario = {
    id: 'u-1',
    nombre: 'Ana',
    edad: 34,
    activo: true,
    email: 'ana@mail.com',
  };

  @state()
  private _estado: Estado = 'pendiente';

  @state()
  private _resultado: Resultado<string[]> = { tipo: 'ok', valor: ['lit', 'opencells', 'ts'] };

  createRenderRoot() {
    return this;
  }

  private _siguienteEstado() {
    const orden: Estado[] = ['pendiente', 'enviado', 'entregado'];
    const i = orden.indexOf(this._estado);
    this._estado = orden[(i + 1) % orden.length];
  }

  private _alternarResultado() {
    this._resultado =
      this._resultado.tipo === 'ok'
        ? { tipo: 'error', mensaje: 'No se pudo conectar con el servidor' }
        : { tipo: 'ok', valor: ['lit', 'opencells', 'ts'] };
  }

  private _bajarEdad() {
    this._usuario = { ...this._usuario, edad: this._usuario.edad + 1 };
  }

  render() {
    const { nombre, edad, activo, email } = this._usuario;
    const primeroNumeros = primero<number>([10, 20, 30]);
    const primeroNombres = primero<string>(['ana', 'luis', 'maria']);

    return html`
      <div>
        <div class="grid-2">
          <div class="grid-2-main">
            <div class="demo-lit-box">
              <p class="demo-lit-label">1 · interface — el contrato del objeto</p>
              <div class="vj-list">
                <div class="vj-item"><span>nombre (string)</span><b>${nombre}</b></div>
                <div class="vj-item"><span>edad (number)</span><b>${edad}</b></div>
                <div class="vj-item"><span>activo (boolean)</span><b>${activo ? '✓ sí' : '✗ no'}</b></div>
                <div class="vj-item"><span>email (opcional ?)</span><b>${email ?? 'sin email'}</b></div>
                <div class="vj-item"><span>id (readonly)</span><b>${this._usuario.id}</b></div>
              </div>
              <div class="demo-actions">
                <button class="oc-button" @click=${this._bajarEdad}>+1 edad (spread)</button>
              </div>
              <p class="log-line log-dim" style="font-size:0.82rem">
                La interface obliga a tener nombre/edad/activo/id; <code>email?</code> es
                opcional y <code>readonly id</code> no se reasigna.
              </p>
            </div>

            <div class="demo-lit-box">
              <p class="demo-lit-label">2 · type — union literal + union discriminada</p>
              <div class="demo-actions">
                <button class="oc-button primary" @click=${this._siguienteEstado}>
                  Estado: ${this._estado}
                </button>
                <button class="oc-button" @click=${this._alternarResultado}>Alternar resultado</button>
              </div>
              ${this._resultado.tipo === 'ok'
                ? html`
                    <p class="log-line">
                      <b style="color:var(--oc-color-accent-strong)">ok</b> — datos cargados:
                      ${this._resultado.valor.join(' · ')}
                    </p>
                  `
                : html`
                    <p class="log-line">
                      <b style="color:#a23a2c">error</b> — ${this._resultado.mensaje}
                    </p>
                  `}
              <p class="log-line log-dim" style="font-size:0.82rem">
                El estado solo admite <code>'pendiente' | 'enviado' | 'entregado'</code>. El
                resultado usa <code>{ tipo: 'ok' } | { tipo: 'error' }</code>: el <code>if</code>
                sobre <code>tipo</code> decide qué pinta.
              </p>
            </div>
          </div>

          <div class="grid-2-side">
            <div class="demo-lit-box">
              <p class="demo-lit-label">3 · generic &lt;T&gt; — una función, muchos tipos</p>
              <ul class="vj-list">
                <li class="vj-item">
                  <span><code>primero&lt;number&gt;([10,20,30])</code></span>
                  <b>${primeroNumeros}</b>
                </li>
                <li class="vj-item">
                  <span><code>primero&lt;string&gt;(['ana','luis','maria'])</code></span>
                  <b>${primeroNombres}</b>
                </li>
              </ul>
              <p class="log-line log-dim" style="font-size:0.82rem">
                <code>function primero&lt;T&gt;(lista: T[]): T</code> devuelve el MISMO tipo que
                recibe: TypeScript lo infiere en cada llamada.
              </p>
            </div>

            <div class="demo-lit-box">
              <p class="demo-lit-label">4 · generic en tipos — Pedido&lt;T&gt;</p>
              <div class="vj-list">
                <div class="vj-item"><span>id del pedido</span><b>#1001</b></div>
                <div class="vj-item"><span>estado (literal)</span><b>${this._estado}</b></div>
                <div class="vj-item"><span>contenido (Pedido&lt;string&gt;)</span><b>portátil</b></div>
              </div>
              <p class="log-line log-dim" style="font-size:0.82rem">
                El mismo <code>Pedido&lt;T&gt;</code> sirve para <code>&lt;string&gt;</code>,
                <code>&lt;Producto&gt;</code> o <code>&lt;string[]&gt;</code>: el contenido cambia
                de tipo, el contrato no.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
