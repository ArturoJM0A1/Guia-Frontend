import type { Lesson } from '../types';

export const lesson18: Lesson = {
  id: 'vanilla-js',
  index: 17,
  title: 'Vanilla JavaScript',
  subtitle: 'DOM, eventos, arrays, asincronía y ES6+: lo que hay debajo de todo.',
  topic: 'plataforma',
  sections: [
    {
      type: 'intro',
      text: 'Vanilla JavaScript es el JavaScript de toda la vida, sin frameworks: el que el navegador entiende directamente. Todo lo que has visto en el curso (Lit, Open Cells, Angular, React) son capas construidas encima de esto. Si dominas estas cinco herramientas —DOM, eventos, arrays, asincronía y ES6+—, ningún framework te va a parecer magia, porque todos usan exactamente esto por debajo.',
    },
    {
      type: 'problem',
      text: 'Sin vanilla JS, una página es estática: no puede leer lo que hay en el HTML, no puede reaccionar a clics, no puede pedir datos al servidor ni actualizarse. Los frameworks existen precisamente para que no escribas esta mecánica a mano, pero cuando algo falla (un binding, un render, una actualización), el error está SIEMPRE en estas primitivas. Entenderlas es el bono de seguridad de cualquier desarrollador.',
    },
    {
      type: 'text',
      title: 'DOM — querySelector, createElement, appendChild',
      text: 'El DOM (Document Object Model) es el árbol de nodos que el navegador crea a partir de tu HTML. Con JavaScript puedes buscar nodos, crear nodos nuevos y colocarlos en el árbol. Esas tres operaciones —buscar, crear, insertar— son la base de TODO renderizado.',
    },
    {
      type: 'code',
      sample: {
        title: 'Buscar, crear e insertar elementos',
        lang: 'js',
        code: `// 1 · BUSCAR un elemento del DOM
const lista = document.querySelector('#mi-lista');
const boton = document.querySelector('.btn-add');

// 2 · CREAR un elemento nuevo
const item = document.createElement('li');
item.textContent = 'Nuevo elemento';
item.classList.add('item');

// 3 · INSERTARLO en el árbol
lista.appendChild(item);

// También puedes insertar HTML directo (ojo: string, no elemento)
lista.innerHTML += '<li>Otra forma</li>';

// querySelectorAll devuelve todos los que coincidan (NodeList)
document.querySelectorAll('.item').forEach((el) => {
  console.log(el.textContent);
});`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`document.querySelector(\'#mi-lista\')` → busca el primer elemento que coincide con el selector CSS (id, clase, etiqueta...). `querySelectorAll` devuelve todos.',
        '`document.createElement(\'li\')` → crea un nodo en memoria, todavía no visible. Puedes configurarlo (textContent, classList, atributos).',
        '`lista.appendChild(item)` → coloca el nodo al final de `lista`. Es cuando "aparece" en pantalla.',
        '`innerHTML` → alternativa rápida que parsea un string, pero con cuidado: si el string viene del usuario, riesgo de XSS.',
        'Estas tres operaciones son las que internamente hacen los frameworks: Lit "parchea" este árbol cuando el estado cambia.',
      ],
    },
    {
      type: 'text',
      title: 'Eventos — addEventListener, click, submit',
      text: 'Los eventos son la forma de "escuchar" la interacción: un clic, un teclado, el envío de un formulario, un cambio de tamaño. `addEventListener(tipo, función)` registra un manejador que se llama cuando el evento ocurre.',
    },
    {
      type: 'code',
      sample: {
        title: 'Escuchar clics y formularios',
        lang: 'js',
        code: `const boton = document.querySelector('#guardar');

// 1 · Un clic
boton.addEventListener('click', (event) => {
  console.log('¡Clic!', event.target);
});

// 2 · Un formulario (cuidado: hay que prevenir el recargo)
const formulario = document.querySelector('#login');

formulario.addEventListener('submit', (event) => {
  event.preventDefault(); // frenar el envío tradicional de la página

  const datos = new FormData(formulario);
  console.log('Login:', datos.get('usuario'));
});

// 3 · Eliminar un listener cuando ya no hace falta
function alEscalar() {
  console.log('ventana: ' + window.innerWidth);
}
window.addEventListener('resize', alEscalar);
window.removeEventListener('resize', alEscalar); // adiós, listener

// También se puede con la propiedad on* (uno por elemento)
boton.onclick = () => console.log('con onclick');`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`addEventListener(\'click\', fn)` → la forma recomendada: permite varios manejadores y quitarlos con `removeEventListener`.',
        '`event.preventDefault()` → imprescindible en formularios: sin ello la página se recarga y pierdes tu JS.',
        '`new FormData(formulario)` → lee los campos del formulario sin recorrer el DOM a mano.',
        '`event.target` → el elemento concreto sobre el que se disparó el evento.',
        'El patrón "listen + handler" es lo que después envuelven Lit con `@click`, React con `onClick` y Angular con `(click)`.',
      ],
    },
    {
      type: 'text',
      title: 'Arrays y objetos — map, filter, reduce, destructuring',
      text: 'La programación con datos se apoya en transformar listas. JavaScript trae tres métodos estrella que devuelven arrays nuevos sin tocar el original (`map` transforma, `filter` selecciona, `reduce` resume), y una sintaxis para "desempaquetar" valores (`destructuring`) tanto de objetos como de arrays.',
    },
    {
      type: 'code',
      sample: {
        title: 'map, filter, reduce y destructuring',
        lang: 'js',
        code: `const usuarios = [
  { nombre: 'Ana', edad: 34, activo: true },
  { nombre: 'Luis', edad: 27, activo: false },
  { nombre: 'María', edad: 41, activo: true },
];

// map — transformar cada elemento (no modifica el original)
const nombres = usuarios.map((u) => u.nombre); // ['Ana','Luis','María']

// filter — quedarse con los que cumplen una condición
const activos = usuarios.filter((u) => u.activo);

// reduce — reducir toda la lista a un solo valor
const edadTotal = usuarios.reduce((acumulado, u) => acumulado + u.edad, 0);
const edadMedia = edadTotal / usuarios.length; // 34

// find — el primero que cumpla (o undefined)
const ana = usuarios.find((u) => u.nombre === 'Ana');

// Destructuring de objetos y arrays
const { nombre, edad } = ana;
const [primero, segundo] = nombres; // 'Ana', 'Luis'
const { nombre: nick, ...resto } = ana; // renombrar + el resto`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`map` → aplica una función a cada elemento y devuelve una lista del mismo tamaño, transformada. Es lo que usa Lit para pintar listas (`items.map(item => html\\`...\\`)`).',
        '`filter` → devuelve solo los elementos para los que la condición da true. No modifica el array original.',
        '`reduce(acumulador, elemento, valorInicial)` → "pliega" la lista en un solo resultado. El 0 inicial es clave: sin él fallaría con arrays vacíos.',
        '`find` → el primer elemento que cumpla la condición o `undefined`. Útil para buscar por id.',
        '`const { nombre, edad } = obj` → destructuring: extrae propiedades del objeto a variables. Con arrays usa corchetes: `const [a, b] = arr`.',
        '`{ nombre: nick, ...resto }` → renombra al extraer y recoge el resto con el operador spread/rest `...`.',
      ],
    },
    {
      type: 'text',
      title: 'Asincronía — Promise, async/await, fetch',
      text: 'Pedir datos a un servidor, esperar un timer o leer un archivo son operaciones que NO bloquean: JavaScript las lanza y sigue. Las `Promise` representan "un valor que llegará más tarde (o fallará)". `async/await` es azúcar para trabajar con promesas como si fueran síncronas. Y `fetch` es la forma nativa de hacer peticiones HTTP.',
    },
    {
      type: 'code',
      sample: {
        title: 'fetch + async/await',
        lang: 'js',
        code: `// Una Promise en su forma más simple
const promesa = new Promise((resolve, reject) => {
  setTimeout(() => resolve('¡listo!'), 1000);
});
promesa.then((valor) => console.log(valor)); // ¡listo!

// async/await: espera dentro de una función async
async function cargarUsuarios() {
  const respuesta = await fetch('https://api.ejemplo.com/usuarios');

  if (!respuesta.ok) {
    throw new Error('Error HTTP: ' + respuesta.status);
  }

  const datos = await respuesta.json(); // el body como objeto
  return datos;
}

// Quien llama usa try/catch, igual que con código síncrono
try {
  const usuarios = await cargarUsuarios();
  console.log(usuarios.length);
} catch (error) {
  console.error('No se pudo cargar:', error);
}

// Varias peticiones en paralelo
const [a, b] = await Promise.all([
  fetch('/api/a').then((r) => r.json()),
  fetch('/api/b').then((r) => r.json()),
]);`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`new Promise((resolve, reject))` → construye una promesa. `resolve` la cumple, `reject` la rompe.',
        '`.then(valor => ...)` → se ejecuta cuando la promesa se cumple. `.catch` captura el fallo.',
        '`async function` → marca una función como asíncrona: siempre devuelve una promesa.',
        '`await` → pausa la función hasta que la promesa se resuelva, sin bloquear el resto de la página. Solo funciona dentro de `async`.',
        '`fetch(url)` → devuelve una promesa. Ojo: `respuesta.ok` es la señal de error real; fetch no falla en 404.',
        '`Promise.all([...])` → lanza varias a la vez y espera todas. Aquí entra el destructuring de nuevo.',
        'Los canales de Open Cells son asíncronos por esto mismo: `publish` avisa, los suscriptores reaccionan cuando pueden.',
      ],
    },
    {
      type: 'text',
      title: 'ES6+ — let/const, arrow functions, módulos, spread/rest',
      text: 'ES6 (ECMAScript 2015) y sus sucesores renovaron el lenguaje. Son el "dialecto moderno" que usan Lit, Open Cells y cualquier proyecto actual. Cuatro piezas te cubren el 90% del código que verás:',
    },
    {
      type: 'code',
      sample: {
        title: 'El JavaScript moderno en una página',
        lang: 'js',
        code: `// 1 · let / const (adiós, var)
const PI = 3.14159;   // no puede reasignarse
let contador = 0;     // sí puede reasignarse
contador += 1;

// 2 · Arrow functions
const suma = (a, b) => a + b;
const duplica = (n) => n * 2;        // un solo parámetro: sin paréntesis
const saluda = () => 'hola';          // sin parámetros: paréntesis vacíos
const conCuerpo = (x) => {
  const y = x * 2;
  return y;
};

// 3 · Módulos (import / export)
// exportar desde otro archivo:
//   export function sumar(a, b) { return a + b; }
//   export const config = { debug: true };
// importar aquí:
//   import { sumar, config } from './util.js';
//   import todo from './util.js'; // export default

// 4 · Spread / Rest
const base = [1, 2, 3];
const copia = [...base, 4];          // [1,2,3,4] (spread en arrays)
const obj = { x: 1, y: 2 };
const extendido = { ...obj, y: 9 };  // {x:1, y:9} (spread en objetos)

function sumaTodo(...numeros) {      // rest: junta los argumentos en un array
  return numeros.reduce((acc, n) => acc + n, 0);
}
sumaTodo(1, 2, 3, 4); // 10

// 5 · Template literals (los backticks de Lit)
const nombre = 'Ana';
console.log(\`Hola \${nombre}, tienes \${edad} años\`);`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`const` / `let` → declaran en ámbito de bloque (a diferencia de `var`). `const` para lo que no se reasigna (el 95% de tus variables).',
        'Arrow functions `(a) => a + b` → función corta sin palabra `function`. Además heredan el `this` del contexto, lo que evita errores clásicos de callbacks.',
        '`import / export` → módulos: trocear el código en archivos y compartir piezas. Es el sistema que usa tu app (cada página es un módulo).',
        'Spread `...array` → expande un array u objeto en sitios donde van valores sueltos: copias inmutables `[...list]`, fusiones `{...a, ...b}`.',
        'Rest `...rest` → el mismo símbolo al revés: recoge varios valores en uno solo.',
        'Template literals `` `...${expr}` `` → strings con interpolación. Son exactamente la base de los templates de Lit (`html\\`...\\``).',
      ],
    },
    {
      type: 'note',
      text: 'Conexión con Open Cells: no hay que elegir entre vanilla JS y Open Cells. Open Cells es 100% vanilla JavaScript moderno (ES6+) por debajo: sus páginas son Custom Elements (DOM), sus canales funcionan con suscripciones (eventos), su estado son objetos y arrays (map/filter/reduce) y su routing es asíncrono (Promise/fetch). Dominar esta lección es dominar el "debajo" de todo lo demás.',
    },
    {
      type: 'demo',
      title: 'Pruébalo: las 5 herramientas en vivo',
      description: 'Una demo construida con vanilla JS puro (Lit solo como envoltorio) que muestra las 5 piezas: DOM, eventos, transformaciones de arrays, una llamada asíncrona simulada y sintaxis ES6+.',
      component: 'demo-vanilla-js',
      howTo: [
        'Añade tareas: verás createElement + appendChild creando nodos nuevos en el DOM.',
        'Prueba el filtro y el total: son map, filter y reduce sobre el array de tareas.',
        'Pulsa "Cargar datos (fetch simulado)": una Promise con retardo "trae" datos del exterior.',
        'Abre la consola del navegador: la demo imprime ejemplos de destructuring y spread/rest.',
      ],
    },
    {
      type: 'summary',
      points: [
        'DOM: `querySelector`, `createElement`, `appendChild` — buscar, crear, insertar.',
        'Eventos: `addEventListener` (y `preventDefault` en formularios).',
        'Arrays: `map` transforma, `filter` selecciona, `reduce` resume, `find` busca; destructuring extrae.',
        'Asincronía: `Promise`, `async/await` y `fetch`; comprueba `respuesta.ok`.',
        'ES6+: `let/const`, arrow functions, `import/export`, spread/rest y template literals.',
      ],
    },
  ],
};
