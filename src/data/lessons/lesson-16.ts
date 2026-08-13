import type { Lesson } from '../types';

export const lesson16: Lesson = {
  id: 'angular-directivas',
  index: 15,
  title: 'Angular: directivas y data binding',
  subtitle: '*ngIf/@if, *ngFor/@for, [ngClass], [ngStyle] y el binding de datos.',
  topic: 'frameworks',
  sections: [
    {
      type: 'intro',
      text: 'Angular es un framework completo (TypeScript, módulos, inyección de dependencias, router propio) para construir aplicaciones. Su forma de trabajar con la vista es peculiar: el HTML de tus componentes se extiende con "directivas", instrucciones que el framework entiende y convierte en lógica. En esta lección verás las directivas que vas a usar casi todos los días, y el sistema de data binding que conecta el template con tu componente.',
    },
    {
      type: 'problem',
      text: 'El HTML por sí solo no sabe "repetir un bloque para cada elemento de una lista" ni "mostrar u ocultar según una condición" ni "poner una clase solo si algo es verdad". Tendrías que hacerlo a mano con JavaScript y selectores, llenando el código de `if (algo) { elemento.classList.add(...) }`. Las directivas de Angular llevan esa lógica al template de forma declarativa: escribes "qué" quieres, y Angular se encarga del "cómo".',
    },
    {
      type: 'text',
      title: 'Estructurales vs de atributo',
      text: 'Hay dos familias. Las directivas ESTRUCTURALES (van con un asterisco `*`) cambian la estructura del DOM: añaden o quitan elementos. Son `*ngIf`, `*ngFor`, `*ngSwitch`. Las directivas de ATRIBUTO (entre corchetes `[...]`) cambian el comportamiento o aspecto de un elemento existente sin crear ni borrar nada: `[ngClass]`, `[ngStyle]`. Angular moderno (v17+) está reemplazando las estructurales por la nueva sintaxis `@if`/`@for`, que no necesita importar nada.',
    },
    {
      type: 'text',
      title: '*ngIf y @if: mostrar u ocultar',
      text: 'Muestras un bloque solo cuando una condición es verdadera. La forma clásica usa `*ngIf`; la moderna usa el bloque `@if` (sin asterisco, sin imports). Ambos añaden/quitan el elemento del DOM, no solo lo esconden con CSS.',
    },
    {
      type: 'code',
      sample: {
        title: 'ngIf (clásico) y @if (Angular moderno)',
        lang: 'html',
        code: `<!-- Angular moderno (v17+) -->
@if (usuario) {
  <p>Hola, {{ usuario.nombre }}</p>
} @else {
  <p>No hay sesión iniciada.</p>
}

<!-- Angular clásico -->
<p *ngIf="usuario">Hola, {{ usuario.nombre }}</p>
<p *ngIf="!usuario">No hay sesión iniciada.</p>

<!-- La condición es cualquier expresión de TypeScript:
     *ngIf="carrito.length > 0", @if (esAdmin && !cargando), etc. -->`,
      },
    },
    {
      type: 'text',
      title: '*ngFor y @for: recorrer listas',
      text: 'Repites un bloque por cada elemento de un array. En la versión moderna, `@for` exige `track`, que sirve para que Angular identifique cada item cuando la lista cambia (lo mismo que `key` en React). En la clásica, `*ngFor` guarda el índice en `let i = index`.',
    },
    {
      type: 'code',
      sample: {
        title: 'ngFor (clásico) y @for (Angular moderno)',
        lang: 'html',
        code: `<!-- Angular moderno -->
<ul>
  @for (item of items; track item.id) {
    <li>{{ item.nombre }}</li>
  } @empty {
    <li>La lista está vacía.</li>
  }
</ul>

<!-- Angular clásico -->
<ul>
  <li *ngFor="let item of items; let i = index">
    {{ i + 1 }}. {{ item.nombre }}
  </li>
</ul>`,
      },
    },
    {
      type: 'text',
      title: '[ngClass], [ngStyle] y el binding de clases',
      text: 'Cambiar el aspecto según el estado es tan común que Angular tiene directivas específicas. `[ngClass]` añade/quita clases a partir de un objeto (`{ clase: condición }`). `[ngStyle]` hace lo mismo con estilos inline. Y el binding `[class.nombre]` enciende o apaga UNA clase concreta con una condición.',
    },
    {
      type: 'code',
      sample: {
        title: 'Clases y estilos dinámicos',
        lang: 'html',
        code: `<!-- [ngClass]: añade 'activo' si estaActivo, 'is-error' si hay errores -->
<div [ngClass]="{ activo: estaActivo, 'is-error': errores > 0 }">
  Contenido
</div>

<!-- [ngStyle]: estilos calculados desde el componente -->
<div [ngStyle]="{
  'background-color': colorFondo,
  'font-size.px': tamanoFuente
}">
  Texto con estilo dinámico
</div>

<!-- [class.nombre]: UNA clase activada por una condición -->
<button [class.seleccionado]="esLaOpcionElegida">
  Opción
</button>

<!-- Equivale al ngClass de un solo flag -->
<div [class.activo]="estaActivo">...</div>`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`[ngClass]="{ activo: estaActivo }"` → Angular añade `activo` cuando `estaActivo` es true y la quita cuando es false. Limpia la clase solita, sin `classList` manual.',
        '`[ngStyle]="{ \'background-color\': colorFondo }"` → pasa valores del componente a propiedades CSS inline. Los sufijos `.px`, `.em`... indican unidad.',
        '`[class.seleccionado]="condicion"` → la forma más legible cuando solo hay una clase condicional. La llave `[class]` con un string también existe: `[class]="miClase"`.',
        'Todo lo que va entre llaves es una expresión de TypeScript del componente: puede venir de propiedades, métodos o cualquier cálculo.',
      ],
    },
    {
      type: 'text',
      title: 'Data binding: conectar componente y template',
      text: 'El binding es el puente de datos entre la clase del componente y su plantilla. Hay cuatro direcciones: interpolación ({{ }}), property binding ([propiedad]), event binding ((evento)) y two-way binding ([(ngModel)]). Entender cuál usar es la mitad de Angular.',
    },
    {
      type: 'table',
      title: 'Los cuatro tipos de binding',
      caption: 'Dirección del flujo de datos',
      headers: ['Tipo', 'Sintaxis', 'Dirección', 'Ejemplo'],
      rows: [
        ['Interpolación', '{{ expresion }}', 'Componente → template (texto)', '{{ usuario.nombre }}'],
        ['Property binding', '[propiedad]="valor"', 'Componente → template (propiedad/atributo)', '[disabled]="!formularioValido"'],
        ['Event binding', '(evento)="metodo($event)"', 'Template → componente', '(click)="guardar()"'],
        ['Two-way binding', '[(ngModel)]="propiedad"', 'Ambas direcciones', '[(ngModel)]="nombre"'],
      ],
    },
    {
      type: 'code',
      sample: {
        title: 'Los cuatro bindings en acción',
        lang: 'html',
        code: `<!-- componente.ts
export class PerfilComponent {
  nombre = 'Ana';
  edad = 30;
  guardado = false;

  guardar() {
    this.guardado = true;
  }
} -->

<!-- plantilla.html -->
<p>Hola, {{ nombre }} · tienes {{ edad }} años</p>

<input [value]="nombre" (input)="nombre = $event.target.value">

<button (click)="guardar()" [disabled]="guardado">
  {{ guardado ? 'Guardado ✓' : 'Guardar' }}
</button>

<!-- Two-way con ngModel (requiere FormsModule) -->
<input [(ngModel)]="nombre" placeholder="Escribe tu nombre">`,
      },
    },
    {
      type: 'explain',
      title: 'Descifrando el ejemplo',
      points: [
        '`{{ nombre }}` → interpolación: muestra el valor y se actualiza al cambiar. Es como `${...}` de los templates Lit.',
        '`[value]="nombre"` → property binding: empuja el valor de la propiedad hacia el input.',
        '`(input)="nombre = $event.target.value"` → event binding: reacción del template al componente. `$event` es el evento DOM.',
        '`[disabled]="guardado"` → un binding en acción práctica: el botón se desactiva solo cuando `guardado` es true.',
        '`[(ngModel)]="nombre"` → la "banana in a box": dos direcciones en una sintaxis. Es el hermano moderno del `{{...}}` de Polymer.',
        'Fíjate: los bindings de Angular y los templates de Lit comparten la misma idea —el componente es la fuente de verdad y el template la refleja.',
      ],
    },
    {
      type: 'note',
      text: 'Conexión con Open Cells: Angular centraliza el estado con servicios e inyección de dependencias; Open Cells lo centraliza con canales. Las directivas de Angular y los controllers de Open Cells no compiten: ambos tratan de "no esparcir la lógica por el HTML". Si vienes de Angular, piensa en un canal como un "servicio reactivo que además guarda el último valor".',
    },
    {
      type: 'demo',
      title: 'Pruébalo: las directivas de Angular, en vivo',
      description: 'Una demo que simula @if/@for, [ngClass]/[class.nombre] y el data binding con Lit: la misma lógica declarativa, la sintaxis de este curso.',
      component: 'demo-angular-directives',
      howTo: [
        'Bloque 1 (@if): inicia y cierra sesión. El bloque aparece y desaparece del DOM.',
        'Bloque 2 (@for): añade y quita elementos de la lista (el × de cada fila es el track en acción).',
        'Bloque 3 ([class.nombre]): elige A o B y mira cómo la clase `seleccionada` se enciende y se apaga.',
        'Bloque 4 (data binding): cambia el estado y mira la interpolación actualizarse sola.',
      ],
    },
    {
      type: 'summary',
      points: [
        'Estructurales: `*ngIf`/`@if` (mostrar) y `*ngFor`/`@for` (recorrer).',
        'Atributo: `[ngClass]` (varias clases), `[class.nombre]` (una clase), `[ngStyle]` (estilos).',
        'Interpolación `{{ }}`, property `[prop]`, evento `(evt)`, two-way `[(ngModel)]`.',
        'La versión moderna usa `@if`/`@for` sin asterisco y sin imports.',
        'Todo lo que va entre llaves/corchetes es TypeScript del componente: la fuente de verdad.',
      ],
    },
  ],
};
