import type { Lesson } from '../types';

export const lesson21: Lesson = {
  id: 'vectores',
  index: 20,
  title: 'Vectores',
  subtitle: 'Arrays como vectores: listas de datos con operaciones en bloque.',
  topic: 'plataforma',
  sections: [
    {
      type: 'intro',
      text: 'Un vector es una lista de valores del mismo tipo, todos con el mismo nombre y diferenciados por un índice. En JavaScript, un vector ES un `Array`: la estructura de datos más usada. Piensa en él como "una columna de datos" (una lista de números, de nombres, de objetos) sobre la que aplicas operaciones en bloque, no de uno en uno.',
    },
    {
      type: 'problem',
      text: 'Sin la idea de vector, operarías con variables sueltas: `n1`, `n2`, `n3`... y cada suma, búsqueda o promedio sería copiar y pegar código. Con un vector, una sola variable contiene todos los datos y una sola función (map, filter, reduce) los procesa todos.',
    },
    {
      type: 'text',
      title: 'Crear y recorrer un vector',
      text: 'Un vector se crea con corchetes `[...]` y se recorre con un bucle `for...of` (solo valores) o `for...in` con índice. El índice empieza en 0.',
    },
    {
      type: 'code',
      sample: {
        title: 'Crear, acceder y recorrer',
        lang: 'js',
        code: `// Crear un vector (array) de números
const notas = [8, 9, 7, 10, 6];

notas[0];            // 8 (primera posición)
notas.length;        // 5
notas[notas.length - 1]; // 6 (última)

// Recorrerlo
for (const nota of notas) {
  console.log(nota);
}

// Con índice, para usar la posición
for (let i = 0; i < notas.length; i++) {
  console.log(i, notas[i]);
}

// Vectores vacíos y llenados después
const etiquetas = [];
etiquetas.push('a', 'b', 'c');`,
      },
    },
    {
      type: 'text',
      title: 'Operaciones típicas de vectores',
      text: 'Como los vectores son arrays, las operaciones "de vector" se escriben con los métodos que ya conoces: `map` (transformar), `filter` (seleccionar), `reduce` (resumir) y `find` (buscar). Por eso se dice que se procesan "en bloque".',
    },
    {
      type: 'code',
      sample: {
        title: 'Sumar, filtrar y escalar',
        lang: 'js',
        code: `const numeros = [1, 2, 3, 4, 5];

// Suma de todos los elementos (el "vector suma")
const suma = numeros.reduce((acc, n) => acc + n, 0); // 15

// Promedio
const media = suma / numeros.length; // 3

// Producto escalar: multiplicar cada elemento por una constante
const dobles = numeros.map((n) => n * 2); // [2,4,6,8,10]

// Filtrar: quedarse con los pares
const pares = numeros.filter((n) => n % 2 === 0); // [2,4]

// Buscar el primer mayor que 3
const mayor = numeros.find((n) => n > 3); // 4

// Dos vectores de la misma longitud: suma elemento a elemento
const a = [1, 2, 3];
const b = [4, 5, 6];
const sumaVectores = a.map((valor, i) => valor + b[i]); // [5,7,9]

// Producto punto (suma de los productos elemento a elemento)
const productoPunto = a.reduce((acc, valor, i) => acc + valor * b[i], 0); // 32`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`reduce` suma todos los elementos: 0 es el valor inicial.',
        '`map((valor, i) => ...)` recibe el índice `i` como segundo parámetro: así puedes combinar dos vectores por posición.',
        '`filter` devuelve un vector nuevo con los que cumplen la condición; el original no se toca.',
        'Un vector puede contener cualquier cosa: números, strings, objetos, e incluso otros vectores (eso se llama matriz, un vector de vectores).',
      ],
    },
    {
      type: 'note',
      text: 'Conexión con Open Cells: casi todo estado es un vector: las tareas de una lista, los resultados de una búsqueda, los mensajes de un canal. El patrón es el mismo que verás en cada página: `estado` es un array y `map` lo pinta.',
    },
    {
      type: 'summary',
      points: [
        'Un vector es un array: `[8, 9, 7]`, índice desde 0, `.length` cuenta.',
        '`for...of` recorre valores; `map`/`filter`/`reduce` lo procesan en bloque.',
        '`map((v, i) => ...)` da acceso al índice para combinar vectores.',
        'Un vector de vectores es una matriz (array de arrays).',
      ],
    },
  ],
};
