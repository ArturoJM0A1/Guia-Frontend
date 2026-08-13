import type { Lesson } from '../types';

export const lesson19: Lesson = {
  id: 'estructuras-de-datos',
  index: 18,
  title: 'Estructuras de datos en JavaScript',
  subtitle: 'Array, Object, Map, Set y Stack/Queue: cómo guardar datos bien guardados.',
  topic: 'plataforma',
  sections: [
    {
      type: 'intro',
      text: 'Estructuras de datos es cómo guardas la información en memoria para poder usarla de forma eficiente. JavaScript trae cinco de serie: `Array` (listas ordenadas), `Object` (datos por clave), `Map` (clave/valor flexible), `Set` (valores únicos) y la pareja Stack/Queue (pilas y colas), que normalmente implementas sobre un `Array`. Elegir la estructura correcta hace que tu código sea más claro, más rápido y con menos bugs.',
    },
    {
      type: 'problem',
      text: 'Cuando no piensas en la estructura, acabas usando `Array` para todo: listas para cosas que son claves (y luego haces `find` sobre 10.000 elementos), arrays con valores repetidos que luego tienes que limpiar con `filter`... El código funciona, pero es lento y confuso. Saber qué estructura usa cada operación (y a qué velocidad) es lo que separa "funciona" de "funciona bien".',
    },
    {
      type: 'text',
      title: 'Array — listas ordenadas',
      text: 'El `Array` es la estructura más básica: valores en orden, cada uno con un índice numérico (0, 1, 2...). Sirve para todo lo que tiene un orden natural: una lista de tareas, un historial, las filas de una tabla. Se leen por índice (`arr[0]`) y se recorren con `for...of`, `forEach` o `map`.',
    },
    {
      type: 'code',
      sample: {
        title: 'Arrays: crear, leer, recorrer y añadir',
        lang: 'js',
        code: `const tareas = ['estudiar', 'comer', 'dormir'];

tareas[0];              // 'estudiar' (índice 0 = primero)
tareas.length;          // 3
tareas[tareas.length - 1]; // 'dormir' (último)

tareas.push('entrenar');  // añade al final
tareas.unshift('meditar'); // añade al principio
const ultimo = tareas.pop();     // quita y devuelve el último
const primero = tareas.shift();  // quita y devuelve el primero

// Recorrerlo
for (const tarea of tareas) console.log(tarea);
tareas.forEach((t, i) => console.log(i, t));

// Buscar
tareas.indexOf('comer'); // índice, o -1 si no está
tareas.includes('comer'); // true

// Cortar/copiar sin tocar el original
const copia = tareas.slice(0, 2);      // ['estudiar','comer']
const sinUltima = tareas.slice(0, -1); // todo menos la última`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`push`/`pop` añaden y quitan del FINAL; `unshift`/`shift` hacen lo mismo al PRINCIPIO.',
        '`slice` devuelve un array nuevo (copia), `splice` modifica el original. "slice no toca, splice sí".',
        '`indexOf`/`includes` buscan por valor; si tienes que buscar mucho, mejor un `Set` o un `Map`.',
        'El acceso por índice y el `push`/`pop` son instantáneos; `unshift`/`shift` son más lentos porque mueven todos los elementos.',
      ],
    },
    {
      type: 'text',
      title: 'Object — datos mediante clave/valor',
      text: 'El `Object` asocia claves (strings) con valores. Es la estructura para "una entidad con nombre y apellidos": un usuario, un pedido, un dato de configuración. Accedes por la clave: `usuario.nombre` o `usuario[\'nombre\']`.',
    },
    {
      type: 'code',
      sample: {
        title: 'Objetos: crear, leer, escribir y recorrer',
        lang: 'js',
        code: `const usuario = {
  nombre: 'Ana',
  edad: 34,
  activo: true,
};

usuario.nombre;           // 'Ana' (notación con punto)
usuario['edad'];          // 34 (notación con corchete)
usuario.email = 'ana@mail.com'; // añadir o cambiar
delete usuario.activo;    // borrar una clave

// Comprobar que existe una clave
'nombre' in usuario;            // true
Object.hasOwn(usuario, 'edad'); // true

// Recorrer claves y valores
for (const clave of Object.keys(usuario)) {
  console.log(clave, usuario[clave]);
}
Object.entries(usuario); // [['nombre','Ana'], ['edad',34], ...]
Object.values(usuario);  // ['Ana', 34, 'ana@mail.com']

// Copiar sin tocar el original (spread)
const copia = { ...usuario, edad: 35 };`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        'El objeto es "un mapa de claves a valores", pero con limitaciones: las claves son strings y hereda cosas de su prototipo.',
        '`in` y `Object.hasOwn` comprueban claves; `hasOwn` es más fiable porque no mira la herencia.',
        '`Object.keys/values/entries` devuelven arrays: la puerta de entrada a `map`/`filter`/`reduce` sobre objetos.',
        'Con `{ ...obj }` creas una copia; para claves dinámicas usa corchetes: `usuario[campo]`.',
      ],
    },
    {
      type: 'text',
      title: 'Map — colecciones clave/valor más flexibles',
      text: '`Map` es el "objeto mejorado": las claves pueden ser de CUALQUIER tipo (números, objetos, funciones), mantiene el orden de inserción, tiene tamaño (`size`) y sus métodos son uniformes (`get`, `set`, `has`, `delete`). Úsalo cuando el objeto no sea suficiente o cuando necesites claves no string.',
    },
    {
      type: 'code',
      sample: {
        title: 'Map: claves de cualquier tipo y métodos uniformes',
        lang: 'js',
        code: `const visitas = new Map();

// set / get / has / delete / size
visitas.set('lunes', 12);
visitas.set('martes', 8);
visitas.get('lunes');       // 12
visitas.has('miércoles');   // false
visitas.size;               // 2
visitas.delete('lunes');
visitas.clear();            // vacía todo

// Las claves pueden ser objetos (los Object NO pueden)
const boton1 = { id: 'btn-1' };
const boton2 = { id: 'btn-2' };
const conteo = new Map();
conteo.set(boton1, 3);   // este botón se pulsó 3 veces
conteo.set(boton2, 7);
conteo.get(boton1);      // 3

// Recorrer con for...of (clave, valor y pares)
for (const [clave, valor] of visitas) {
  console.log(clave, valor);
}
visitas.forEach((valor, clave) => console.log(clave, valor));`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`set(k, v)` guarda, `get(k)` lee, `has(k)` comprueba, `delete(k)` borra, `size` cuenta.',
        'Con claves-objeto evitas errores clásicos: en un `Object`, las claves se convierten en strings y `{id:1}` chocaría con `{id:2}`.',
        '`for (const [clave, valor] of map)` usa destructuring por pares.',
        'En código del mundo real, `Map` aparece en cachés, contadores por id, tablas de configuración... y los canales de Open Cells guardan suscripciones en estructuras así.',
      ],
    },
    {
      type: 'text',
      title: 'Set — valores únicos',
      text: '`Set` es una colección que NO admite duplicados. Es la respuesta directa a "quita los repetidos" y a "¿ya está esto aquí?". Igual que `Map`, mantiene el orden de inserción y tiene `size`.',
    },
    {
      type: 'code',
      sample: {
        title: 'Set: eliminar duplicados en una línea',
        lang: 'js',
        code: `const numeros = [1, 2, 2, 3, 3, 3, 4];

// Quitar duplicados en una línea: nuevo Set(...) y volver a array
const unicos = [...new Set(numeros)]; // [1, 2, 3, 4]

const etiquetas = new Set();

etiquetas.add('frontend');
etiquetas.add('frontend'); // no pasa nada: ya existe
etiquetas.add('backend');
etiquetas.size;            // 2

etiquetas.has('frontend'); // true (comprobación instantánea)
etiquetas.delete('backend');
etiquetas.has('frontend') ? 'sí' : 'no';

// Recorrer
for (const etiqueta of etiquetas) console.log(etiqueta);

// Un uso típico: saber si una tarea ya se marcó
const marcadas = new Set(['tarea-1', 'tarea-2']);
marcadas.add('tarea-3');
marcadas.has('tarea-1'); // true — sin buscar en un array`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`[...new Set(array)]` → el truco más famoso: elimina duplicados de un array.',
        '`has` es instantáneo (O(1)); en un array, `includes` recorre todo (O(n)). Para listas grandes de comprobaciones, `Set` gana.',
        '`add` con un valor repetido no hace nada: el `Set` garantiza unicidad.',
        'Se recorre igual que `Map`, pero aquí solo hay valores (sin claves).',
      ],
    },
    {
      type: 'text',
      title: 'Stack / Queue — pilas y colas',
      text: 'Una pila (Stack) es LIFO (Last In, First Out): lo último que entra es lo primero que sale. Piensa en una pila de platos. Una cola (Queue) es FIFO (First In, First Out): lo primero que entra es lo primero que sale. Piensa en la fila de la panadería. En JavaScript se implementan directamente sobre un `Array`.',
    },
    {
      type: 'code',
      sample: {
        title: 'Pila y cola con Array (push/pop y push/shift)',
        lang: 'js',
        code: `// PILA (LIFO): push para entrar, pop para salir
const pila = [];
pila.push('primera');   // entrada por arriba
pila.push('segunda');
pila.pop();             // 'segunda' — lo último en entrar sale primero
pila.pop();             // 'primera'

// COLA (FIFO): push para entrar, shift para salir
const cola = [];
cola.push('cliente-1'); // entrada por el final
cola.push('cliente-2');
cola.shift();           // 'cliente-1' — el primero en entrar sale primero
cola.shift();           // 'cliente-2'

// El clásico ejemplo de la pila: "deshacer" (undo)
const historial = [];
function ejecutar(accion) {
  historial.push(accion);
}
function deshacer() {
  return historial.pop();
}
ejecutar('escribir "hola"');
ejecutar('borrar palabra');
deshacer(); // 'borrar palabra' — se deshace lo último que se hizo`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        'Pila → `push`/`pop` (entran y salen por el MISMO lado). Es la estructura para "deshacer/undo", call stacks y evaluaciones.',
        'Cola → `push`/`shift` (entran por un lado, salen por el otro). Es la estructura para "lo atiendo en orden", como los timers de JavaScript y las colas de mensajes.',
        '`shift` es más lento que `pop` (mueve todo el array); si la cola crece mucho, se implementa con listas enlazadas o dos arrays.',
        'Open Cells usa estas ideas por debajo: los mensajes de los canales se entregan en orden (cola) y las rutas se procesan con el histórico de navegación (pila).',
      ],
    },
    {
      type: 'table',
      title: 'Resumen: cuándo usar cada estructura',
      caption: 'La decisión de un vistazo',
      headers: ['Estructura', 'Orden', 'Acceso', 'Úsala para…'],
      rows: [
        ['Array', 'Sí (índice)', 'Por índice numérico', 'Listas con orden: tareas, historial, filas'],
        ['Object', 'No garantizado', 'Por clave string', 'Entidades con nombre: usuario, pedido, config'],
        ['Map', 'Sí (inserción)', 'Por clave de cualquier tipo', 'Diccionarios, cachés, contadores, claves no string'],
        ['Set', 'Sí (inserción)', 'Comprobación de existencia', 'Valores únicos, quitar duplicados, marcar vistos'],
        ['Stack (pila)', 'LIFO', 'Solo el tope', 'Deshacer/undo, call stack, historial de navegación'],
        ['Queue (cola)', 'FIFO', 'Frente y final', 'Colas de tareas, mensajes, turnos'],
      ],
    },
    {
      type: 'note',
      text: 'Conexión con Open Cells: el estado de tu app vive en estas estructuras. El `Map` de canales→suscriptores, los `Set` para marcar páginas ya visitadas y los arrays de listas que pintas con `map` en cada página. Cuando leas el código de Open Cells y veas `new Map()`, `new Set()` o `push`/`shift`, ya sabes exactamente qué está haciendo.',
    },
    {
      type: 'demo',
      title: 'Pruébalo: las 5 estructuras en vivo',
      description: 'Una demo con las estructuras en acción: lista (array), ficha (object), diccionario (Map), duplicados (Set) y una pila + cola para manipular con botones.',
      component: 'demo-data-structures',
      howTo: [
        'En Pila (Stack): pulsa "push" para añadir arriba y "pop" para sacar. Sale siempre lo último en entrar.',
        'En Cola (Queue): pulsa "push" y luego "shift": sale siempre lo primero en entrar.',
        'En Set: añade valores repetidos y mira cómo no se duplican; usa "Comprobar" para ver `has`.',
        'En Map: guarda y lee contadores por id, y en Array/Object cambia valores con los botones.',
      ],
    },
    {
      type: 'summary',
      points: [
        '`Array` → lista ordenada por índice; `push`/`pop` (final) y `unshift`/`shift` (inicio).',
        '`Object` → datos por clave/valor; `{ ...obj }` copia, `Object.keys/entries` lo recorren.',
        '`Map` → clave/valor flexible (claves de cualquier tipo) con `set`/`get`/`has`/`delete`/`size`.',
        '`Set` → valores únicos; `[...new Set(arr)]` quita duplicados y `has` es instantáneo.',
        'Stack = `push`/`pop` (LIFO); Queue = `push`/`shift` (FIFO).',
      ],
    },
  ],
};
