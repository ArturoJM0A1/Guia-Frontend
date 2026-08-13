import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { CodeSample } from '../data/types.js';

@customElement('oc-code-block')
export class CodeBlock extends LitElement {
  @property({ type: Object })
  sample: CodeSample = { title: '', lang: 'ts', code: '' };

  @state()
  private _copied = false;

  private _copyTimer: number | undefined;

  static styles = css`
    .code-block {
      margin: 18px 0;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid #1e293b;
      background: #0f172a;
    }

    .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 8px 14px;
      background: #1e293b;
      border-bottom: 1px solid #334155;
    }

    .code-title {
      color: #cbd5e1;
      font-size: 0.85rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .code-lang {
      color: #94a3b8;
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      flex-shrink: 0;
    }

    .copy-btn {
      appearance: none;
      border: 1px solid #475569;
      background: transparent;
      color: #cbd5e1;
      border-radius: 6px;
      padding: 5px 12px;
      font-size: 0.8rem;
      cursor: pointer;
      flex-shrink: 0;
    }

    .copy-btn:hover {
      background: #334155;
    }

    .copy-btn.copied {
      color: #06332e;
      background: #4fd1c5;
      border-color: #4fd1c5;
    }

    pre {
      margin: 0;
      padding: 18px;
      overflow-x: auto;
    }

    pre code {
      font-family: var(--oc-font-mono);
      font-size: 0.86rem;
      line-height: 1.55;
      color: #e2e8f0;
      display: block;
      white-space: pre;
    }

    .tok-kw { color: #c792ea; font-weight: 600; }
    .tok-str { color: #c3e88d; }
    .tok-com { color: #7f8ea3; font-style: italic; }
    .tok-num { color: #f78c6c; }
    .tok-fn { color: #82aaff; }
    .tok-tag { color: #f07178; }
  `;

  private _escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  private _highlight(code: string): string {
    const escaped = this._escapeHtml(code);
    const tokenRegex = new RegExp(
      [
        '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/|#[^\\n]*|<!--[\\s\\S]*?-->)',
        '("([^"\\\\]|\\\\.)*"|\'([^\'\\\\]|\\\\.)*\'|`([^`\\\\]|\\\\.)*`)',
        '(&lt;\\/?[a-zA-Z][\\w-]*|\\/?&gt;)',
        '\\b(import|export|const|let|var|function|return|class|extends|super|if|else|for|while|do|new|async|await|from|this|static|get|set|type|interface|enum|default|as|of|in|switch|case|break|typeof|void|null|undefined|true|false|throw|try|catch|finally|yield|delete|instanceof|package|public|private|protected|readonly)\\b',
        '\\b(\\d+(?:\\.\\d+)?)\\b',
        '([a-zA-Z_$][\\w$]*)(?=\\()',
      ].join('|'),
      'g',
    );
    return escaped.replace(tokenRegex, (match, com, str, tag, kw, num, fn) => {
      if (com) return `<span class="tok-com">${com}</span>`;
      if (str) return `<span class="tok-str">${str}</span>`;
      if (tag) return `<span class="tok-tag">${tag}</span>`;
      if (kw) return `<span class="tok-kw">${kw}</span>`;
      if (num) return `<span class="tok-num">${num}</span>`;
      if (fn) return `<span class="tok-fn">${fn}</span>`;
      return match;
    });
  }

  private async _copy() {
    try {
      await navigator.clipboard.writeText(this.sample.code);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = this.sample.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    this._copied = true;
    window.clearTimeout(this._copyTimer);
    this._copyTimer = window.setTimeout(() => {
      this._copied = false;
    }, 1500);
  }

  render() {
    return html`
      <div class="code-block">
        <div class="code-header">
          <span class="code-title">${this.sample.title}</span>
          <div style="display:flex;align-items:center;gap:10px">
            <span class="code-lang">${this.sample.lang}</span>
            <button class="copy-btn ${this._copied ? 'copied' : ''}" @click=${this._copy}>
              ${this._copied ? 'Copiado ✓' : 'Copiar'}
            </button>
          </div>
        </div>
        <pre><code>${unsafeHTML(this._highlight(this.sample.code))}</code></pre>
      </div>
    `;
  }
}
