import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';

type Tone = 'ok' | 'warn' | 'dim';
interface LogLine {
  text: string;
  tone: Tone;
}

@customElement('oc-demo-station')
export class OcDemoStation extends LitElement {
  elementController = new ElementController(this);

  @property({ attribute: false })
  onLog?: (text: string, tone: Tone) => void;

  @state()
  private _message = '';

  createRenderRoot() {
    return this;
  }

  private _emit() {
    const msg = this._message.trim() || 'hola desde la emisora';
    this.onLog?.(`publicado en channel: chat → '${msg}'`, 'ok');
    this.elementController.publish('chat', msg);
    this._message = '';
  }

  private _onInput(e: Event) {
    this._message = (e.target as HTMLInputElement).value;
  }

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this._emit();
    }
  }

  render() {
    return html`
      <div class="counter-card">
        <h4>📡 La emisora</h4>
        <p style="margin:0 0 10px;font-size:0.9rem;color:var(--oc-color-text-soft)">
          Publica tu mensaje en el canal <code>chat</code> con <code>publish('chat', msg)</code>.
        </p>
        <div class="station-input">
          <input
            type="text"
            placeholder="Escribe un mensaje…"
            .value=${this._message}
            @input=${this._onInput}
            @keydown=${this._onKeydown}
          />
          <button class="oc-button primary" @click=${this._emit}>Emitir</button>
        </div>
      </div>
    `;
  }
}

@customElement('oc-demo-receiver')
export class OcDemoReceiver extends LitElement {
  elementController = new ElementController(this);

  @property({ attribute: false })
  onLog?: (text: string, tone: Tone) => void;

  @state()
  private _messages: string[] = [];

  @state()
  private _listening = true;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this._listen();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.elementController.unsubscribe('chat');
  }

  private _listen() {
    this.elementController.subscribe('chat', (msg: string) => {
      this._messages = [...this._messages, msg];
      this.onLog?.(`recibido en el receptor → '${msg}'`, 'warn');
    });
    this._listening = true;
  }

  private _toggle() {
    if (this._listening) {
      this.elementController.unsubscribe('chat');
      this._listening = false;
      this.onLog?.('receptor desconectado: deja de escuchar el canal chat', 'dim');
    } else {
      this._listen();
      this._listening = true;
      this.onLog?.('receptor reconectado: vuelve a escuchar el canal chat', 'dim');
    }
  }

  render() {
    return html`
      <div class="counter-card">
        <h4>📻 El receptor</h4>
        <p style="margin:0 0 10px;font-size:0.9rem;color:var(--oc-color-text-soft)">
          Suscrito a <code>'chat'</code> con <code>subscribe('chat', callback)</code>.
        </p>
        <span class="status-badge ${this._listening ? 'on' : 'off'}">
          ${this._listening ? '● sintonizado' : '○ desconectado'}
        </span>
        <div class="demo-log" style="margin-top:10px">
          ${this._messages.length === 0
            ? html`<span class="log-line log-dim">Ningún mensaje recibido todavía.</span>`
            : this._messages.map((m) => html`<span class="log-line">📥 ${m}</span>`)}
        </div>
        <div class="demo-actions">
          <button class="oc-button" @click=${this._toggle}>
            ${this._listening ? 'Desconectar receptor' : 'Reconectar receptor'}
          </button>
        </div>
      </div>
    `;
  }
}

@customElement('demo-channels')
export class DemoChannels extends LitElement {
  @state()
  private _log: LogLine[] = [];

  createRenderRoot() {
    return this;
  }

  private _onLog = (text: string, tone: Tone) => {
    this._log = [...this._log, { text, tone }];
  };

  render() {
    return html`
      <div>
        <div class="counter-stage">
          <oc-demo-station .onLog=${this._onLog}></oc-demo-station>
          <oc-demo-receiver .onLog=${this._onLog}></oc-demo-receiver>
        </div>
        <p style="margin:12px 0 6px;font-weight:700;color:var(--oc-color-primary)">Secuencia en vivo</p>
        <div class="demo-log">
          ${this._log.length === 0
            ? html`<span class="log-line log-dim">Escribe un mensaje y pulsa "Emitir".</span>`
            : this._log.map(
                (line, i) =>
                  html`<span class="log-line log-${line.tone}">${i + 1}. ${line.text}</span>`,
              )}
        </div>
      </div>
    `;
  }
}
