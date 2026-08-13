import type { Lesson } from '../types';

export const lesson22: Lesson = {
  id: 'clonacion-de-objetos',
  index: 21,
  title: 'Clonación de objetos',
  subtitle: 'Copia superficial vs copia profunda: structuredClone, spread y JSON.',
  topic: 'plataforma',
  sections: [
    {
      type: 'intro',
      text: 'En JavaScript, los objetos (y los arrays) se guardan por REFERENCIA: si haces `const b = a`, no copias el objeto, haces que `b` apunte al mismo. Cambiar `b` cambia `a`. Para evitar esto, hay que CLONAR: crear una copia independiente. Hay dos niveles: copia superficial (shallow) y copia profunda (deep).',
    },
    {
      type: 'problem',
      text: 'Este es uno de los errores más comunes: copiar "a mano" para no tocar el original y descubrir que el original cambió igualmente. Por ejemplo, al ordenar una lista o al editar un formulario, si no clonas, modificas el estado original y reintroduces bugs difíciles de rastrear.',
    },
    {
      type: 'code',
      sample: {
        title: 'Referencia vs clon',
        lang: 'js',
        code: `const original = { nombre: 'Ana', edad: 34 };
const referencia = original;   // NO copia: apunta al mismo objeto

referencia.edad = 99;
console.log(original.edad);    // 99 ← ¡se cambió el original!

// CLON superficial con spread: copia independiente (nivel 1)
const copia = { ...original };
copia.edad = 30;
console.log(original.edad);    // 99 (intacto)
console.log(copia.edad);       // 30

// Object.assign: la forma clásica (equivalente al spread)
const otra = Object.assign({}, original);

// Arrays también se clonan con spread o slice
const lista = [1, 2, 3];
const copiaLista = [...lista];
// const copiaLista = lista.slice();  // equivalente`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`const referencia = original` → comparten memoria: es UNA referencia, no una copia.',
        '`{ ...original }` → copia superficial: clona el primer nivel. Los objetos ANIDADOS siguen compartidos.',
        '`Object.assign({}, obj)` → la versión clásica del spread.',
        '`[...array]` o `array.slice()` → lo mismo para arrays.',
      ],
    },
    {
      type: 'text',
      title: 'El límite de la copia superficial',
      text: 'La copia superficial clona el primer nivel, pero si el objeto tiene objetos dentro, esos SÍ se comparten. Para clonarlo todo hace falta una copia profunda. La forma moderna y fiable es `structuredClone`.',
    },
    {
      type: 'code',
      sample: {
        title: 'Copia profunda con structuredClone',
        lang: 'js',
        code: `const perfil = {
  nombre: 'Ana',
  direccion: { ciudad: 'Madrid', cp: 28001 },
  preferencias: ['web', 'móvil'],
};

// Superficial: la dirección sigue siendo LA MISMA
const superficial = { ...perfil };
superficial.direccion.ciudad = 'Barcelona';
console.log(perfil.direccion.ciudad); // 'Barcelona' ← compartida

// Profunda: todo es nuevo, independiente
const profundo = structuredClone(perfil);
profundo.direccion.ciudad = 'Sevilla';
console.log(perfil.direccion.ciudad); // 'Barcelona' ← intacta

// La alternativa JSON (trampa para todos: solo sirve para datos simples)
const porJson = JSON.parse(JSON.stringify(perfil));
// ⚠️ Pierde Date, Map, Set, funciones y undefined. structuredClone no.`,
      },
    },
    {
      type: 'table',
      title: 'Cómo clonar según lo que tengas',
      caption: 'La decisión rápida',
      headers: ['Situación', 'Herramienta', 'Tipo'],
      rows: [
        ['Array de datos simples', '[...array] o array.slice()', 'Superficial'],
        ['Objeto de un nivel', '{ ...obj } o Object.assign({}, obj)', 'Superficial'],
        ['Objeto con objetos/arrays dentro', 'structuredClone(obj)', 'Profunda'],
        ['Solo datos JSON (sin Date/Map/Set)', 'JSON.parse(JSON.stringify(obj))', 'Profunda'],
      ],
    },
    {
      type: 'note',
      text: 'Conexión con Open Cells: cuando publiques un estado nuevo en un canal, la buena práctica es clonar: `this.pageController.publish(\'canal\', { ...datos, campo: nuevo })`. Así los suscriptores reciben una versión nueva y no comparten referencias con la que muta.',
    },
    {
      type: 'summary',
      points: [
        '`const b = a` NO copia: es una referencia al mismo objeto.',
        'Copia superficial: `{ ...obj }`, `[...array]`, `slice()`, `Object.assign`.',
        'Copia profunda: `structuredClone(obj)` — clona todo, incluso anidado.',
        '`JSON.parse(JSON.stringify())` clona profundo pero pierde Date, Map, Set y funciones.',
        'Clona siempre que vayas a editar un objeto que no quieres mutar.',
      ],
    },
  ],
};
