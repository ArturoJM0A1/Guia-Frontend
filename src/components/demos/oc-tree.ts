import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

interface TreeNode {
  name: string;
  comment?: string;
  children?: TreeNode[];
}

const APP_TREE: TreeNode = {
  name: 'open-cells-app/',
  children: [
    { name: 'package.json', comment: '# dependencias y scripts (dev, build...)' },
    { name: 'tsconfig.json' },
    { name: 'index.html', comment: '# documento donde se monta la app' },
    { name: 'images/' },
    {
      name: 'src/',
      children: [
        {
          name: 'components/',
          comment: '# componentes de la app (incluido app-index)',
          children: [
            { name: 'app-index.ts', comment: '# arranca startApp y dibuja el marco' },
            { name: 'oc-code-block.ts', comment: '# componente para pintar código' },
            {
              name: 'demos/',
              comment: '# componentes de las demos de las lecciones',
              children: [
                { name: 'demo-counter.ts' },
                { name: 'demo-channels.ts' },
                { name: 'demo-routing.ts' },
                { name: 'oc-tree.ts' },
                { name: '...' },
              ],
            },
          ],
        },
        {
          name: 'pages/',
          comment: '# una carpeta por página',
          children: [
            { name: 'home/home-page.ts' },
            { name: 'lesson/lesson-page.ts' },
            { name: 'demo/demo-page.ts' },
            { name: 'not-found/not-found-page.ts' },
          ],
        },
        {
          name: 'data/',
          comment: '# el contenido del curso',
          children: [
            { name: 'lessons.ts', comment: '# el listado y los getters' },
            { name: 'types.ts' },
            { name: 'lessons/', children: [{ name: 'lesson-01.ts ... lesson-23.ts' }] },
          ],
        },
        { name: 'css/', comment: '# estilos globales', children: [{ name: 'main.css' }] },
        { name: 'router/', children: [{ name: 'routes.ts', comment: '# la configuración de rutas' }] },
      ],
    },
  ],
};

@customElement('oc-tree')
export class OcTree extends LitElement {
  @state()
  private _open = new Set<string>(['open-cells-app/', 'open-cells-app/src/']);

  createRenderRoot() {
    return this;
  }

  private _toggle(path: string) {
    const next = new Set(this._open);
    if (next.has(path)) {
      next.delete(path);
    } else {
      next.add(path);
    }
    this._open = next;
  }

  private _renderNode(node: TreeNode, path: string) {
    const currentPath = path + node.name;
    const isFolder = !!node.children;
    const isOpen = isFolder && this._open.has(currentPath);

    if (isFolder) {
      return html`
        <div class="tree-row folder" @click=${() => this._toggle(currentPath)}>
          <span class="expander">${isOpen ? '▾' : '▸'}</span>${node.name}
        </div>
        ${isOpen
          ? html`<div class="tree-children">
              ${node.children!.map((child) => this._renderNode(child, currentPath))}
            </div>`
          : ''}
      `;
    }

    return html`
      <div class="tree-row">
        <span class="expander"></span>${node.name}
        ${node.comment ? html`<span class="tree-comment"> ${node.comment}</span>` : ''}
      </div>
    `;
  }

  render() {
    return html`<div class="tree">${this._renderNode(APP_TREE, '')}</div>`;
  }
}
