import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

type Resultado = { grupo: string; caso: string; ok: boolean; detalle: string };

@customElement('demo-testing')
export class DemoTesting extends LitElement {
  @state()
  private _resultados: Resultado[] = [];

  @state()
  private _modoFetch: 'ok' | 'error' = 'ok';

  @state()
  private _ejecutado = false;

  @state()
  private _llamadasFetch: string[] = [];

  createRenderRoot() {
    return this;
  }

  private _expect(resultados: Resultado[], grupo: string, actual: unknown, esperado: unknown, etiqueta: string) {
    const iguales =
      Object.is(actual, esperado) || JSON.stringify(actual) === JSON.stringify(esperado);
    resultados.push({
      grupo,
      caso: etiqueta,
      ok: iguales,
      detalle: `esperado: ${JSON.stringify(esperado)} · recibido: ${JSON.stringify(actual)}`,
    });
  }

  private _mock() {
    const llamadas: unknown[][] = [];
    const fn = (...args: unknown[]) => {
      llamadas.push(args);
      return '¡hola!';
    };
    return { fn, llamadas };
  }

  private async _ejecutar() {
    const resultados: Resultado[] = [];

    const { fn, llamadas } = this._mock();
    const saludarSiPuede = (saludar: (...a: unknown[]) => unknown, nombre: string) =>
      nombre ? saludar(nombre) : 'sin nombre';
    const resultado = saludarSiPuede(fn, 'Ana');

    this._expect(resultados, 'vi.fn()', resultado, '¡hola!', 'Devuelve la respuesta fija del mock');
    this._expect(resultados, 'vi.fn()', llamadas.length, 1, 'Se llamó una sola vez');
    this._expect(resultados, 'vi.fn()', llamadas[0]?.[0], 'Ana', 'Se llamó con el argumento "Ana"');

    const llamadasFetch: string[] = [];
    const falsoFetch = async (url: string) => {
      llamadasFetch.push(url);
      if (this._modoFetch === 'ok') {
        return { ok: true, json: async () => [{ id: 1, nombre: 'Ana' }] };
      }
      return { ok: false, status: 500 };
    };
    const cargarUsuarios = async (fetchFn: (u: string) => Promise<unknown>) => {
      const r = (await fetchFn('/api/usuarios')) as {
        ok: boolean;
        status: number;
        json: () => Promise<unknown>;
      };
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    };

    if (this._modoFetch === 'ok') {
      try {
        const usuarios = await cargarUsuarios(falsoFetch);
        this._expect(
          resultados,
          'fetch mockeado',
          usuarios,
          [{ id: 1, nombre: 'Ana' }],
          'Devuelve los usuarios del servidor falso',
        );
        this._expect(
          resultados,
          'fetch mockeado',
          llamadasFetch,
          ['/api/usuarios'],
          'Llamó a "/api/usuarios"',
        );
      } catch (e) {
        this._expect(resultados, 'fetch mockeado', String(e), '', 'No debería lanzar error');
      }
    } else {
      let error = '';
      try {
        await cargarUsuarios(falsoFetch);
      } catch (e) {
        error = String((e as Error).message);
      }
      this._expect(resultados, 'fetch mockeado', error, 'HTTP 500', 'Lanza "HTTP 500" si el servidor falla');
    }

    this._resultados = resultados;
    this._llamadasFetch = llamadasFetch;
    this._ejecutado = true;
  }

  private _toggleModo(modo: 'ok' | 'error') {
    this._modoFetch = modo;
    if (this._ejecutado) {
      void this._ejecutar();
    }
  }

  render() {
    const grupos = [...new Set(this._resultados.map((r) => r.grupo))];
    const totalOk = this._resultados.filter((r) => r.ok).length;

    return html`
      <div>
        <div class="demo-lit-box">
          <p class="demo-lit-label">1 · vi.fn() — función falsa que registra llamadas</p>
          <p class="log-line log-dim" style="font-size:0.82rem">
            <code>saludarSiPuede(saludar, 'Ana')</code> se ejecuta con un mock que devuelve
            <code>'¡hola!'</code>. Los tests comprueban resultado, número de llamadas y argumento.
          </p>
        </div>

        <div class="demo-lit-box">
          <p class="demo-lit-label">2 · fetch mockeado — elige la respuesta del "servidor"</p>
          <div class="demo-actions">
            <button
              class="oc-button ${this._modoFetch === 'ok' ? 'primary' : ''}"
              @click=${() => this._toggleModo('ok')}
            >
              Servidor responde OK
            </button>
            <button
              class="oc-button ${this._modoFetch === 'error' ? 'primary' : ''}"
              @click=${() => this._toggleModo('error')}
            >
              Servidor responde 500
            </button>
          </div>
          <p class="log-line log-dim" style="font-size:0.82rem">
            Ninguna petición real sale de tu navegador: <code>fetch</code> es un mock. Llamadas
            registradas:
            <b>${this._llamadasFetch.length ? this._llamadasFetch.join(', ') : '—'}</b>
          </p>
        </div>

        <div class="demo-actions" style="margin: 14px 0;">
          <button class="oc-button primary" @click=${this._ejecutar}>Ejecutar tests</button>
          ${this._ejecutado
            ? html`<span style="margin-left:10px;"><b>${totalOk}/${this._resultados.length}</b> pasan</span>`
            : ''}
        </div>

        ${this._ejecutado
          ? grupos.map(
              (grupo) => html`
                <div class="demo-lit-box">
                  <p class="demo-lit-label">${grupo}</p>
                  <ul class="vj-list">
                    ${this._resultados
                      .filter((r) => r.grupo === grupo)
                      .map(
                        (r) => html`
                          <li
                            class="vj-item"
                            style="display:flex; align-items:center; gap:8px; padding:6px 8px;"
                          >
                            <span
                              style="width:18px; height:18px; border-radius:50%; flex:none; display:inline-flex; align-items:center; justify-content:center; color:#fff; font-size:0.7rem; background:${r.ok ? '#2e7d32' : '#c62828'};"
                              >${r.ok ? '✓' : '✕'}</span
                            >
                            <span>${r.caso}</span>
                            <span class="log-dim" style="font-size:0.78rem; margin-left:auto;">${r.detalle}</span>
                          </li>
                        `,
                      )}
                  </ul>
                </div>
              `,
            )
          : ''}
      </div>
    `;
  }
}
