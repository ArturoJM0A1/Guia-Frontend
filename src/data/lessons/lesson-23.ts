import type { Lesson } from '../types';

export const lesson23: Lesson = {
  id: 'wrappers',
  index: 22,
  title: 'Wrappers (objetos envoltorio)',
  subtitle: 'Por qué "hola".toUpperCase() funciona: String, Number y Boolean.',
  topic: 'plataforma',
  sections: [
    {
      type: 'intro',
      text: 'Los tipos primitivos de JavaScript (string, number, boolean) NO tienen métodos ni propiedades... y sin embargo puedes escribir `"hola".toUpperCase()` o `(3.14).toFixed(1)`. ¿Cómo? Porque JavaScript los envuelve temporalmente en su objeto "wrapper": `String`, `Number` y `Boolean`. Esa envoltura es un Wrapper, y es la razón de que los primitivos parezcan tener métodos.',
    },
    {
      type: 'problem',
      text: 'Cuando entiendes los wrappers dejas de tener dos confusiones clásicas: por qué `"hola".length` funciona (parece contradictorio) y qué pasa cuando usas `new String("hola")` (crea un OBJETO, no un string, y eso trae bugs raros).',
    },
    {
      type: 'code',
      sample: {
        title: 'Primitivos vs wrappers',
        lang: 'js',
        code: `// Los primitivos "parecen" tener métodos
"hola".toUpperCase();          // 'HOLA'
"hola".length;                 // 4
(3.14159).toFixed(2);          // '3.14'
(255).toString(16);            // 'ff'

// Qué pasa por dentro: JS crea un wrapper temporal
const envuelto = new String('hola'); // objeto String, NO un string
typeof envuelto;               // 'object'  ← ojo
envuelto.length;               // 4 (el método vive en el wrapper)

// El primitivo no es un objeto: no puedes añadirle propiedades
const nombre = 'ana';
nombre.apellido = 'garcía';
console.log(nombre.apellido);  // undefined (se descarta la envoltura)

// Sin embargo, a un wrapper real sí
const objeto = new String('ana');
objeto.apellido = 'garcía';
console.log(objeto.apellido);  // 'garcía' (esto es un objeto de verdad)`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`"hola".toUpperCase()` → JavaScript crea un `String` temporal, llama al método y descarta el wrapper. El primitivo no cambia.',
        '`new String(\'hola\')` → crea un OBJETO. Es casi siempre un error: `typeof` da `object`, las comparaciones fallan y las propiedades no son las de un string.',
        'Regla práctica: usa SIEMPRE los primitivos (`\'hola\'`, `42`, `true`). Los constructores `new String/Number/Boolean` se evitan.',
        'Los wrappers también aportan utilidades ESTÁTICAS (sin instanciar): `Number.isNaN`, `Number.parseInt`, `String.fromCharCode`...',
      ],
    },
    {
      type: 'code',
      sample: {
        title: 'Los métodos estáticos que sí usarás',
        lang: 'js',
        code: `// Number: parsear y comprobar (sin crear objetos)
Number.parseInt('42');       // 42 (string → entero)
Number.parseFloat('3.14');   // 3.14
Number.isNaN(NaN);           // true (la forma correcta de comprobarlo)
Number.isInteger(3);         // true
Number.isFinite(1 / 0);      // false (Infinity no es un número válido)

// String: los helpers estáticos
String.fromCharCode(65);     // 'A'
'hola mundo'.split(' ');     // ['hola', 'mundo']
'  x  '.trim();              // 'x'
'ana'.repeat(3);             // 'anaanaana'
'a,b,c'.replaceAll(',', '|'); // 'a|b|c'

// Boolean: el wrapper solo se usa como función de conversión
Boolean(0);        // false
Boolean('');       // false
Boolean('hola');   // true
Boolean([]);       // true (¡un array vacío es truthy!)
!!'texto';         // true — el truco de la doble negación`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`Number.isNaN(x)` → la forma fiable de comprobar NaN (el global `isNaN` convierte antes y engaña).',
        '`Boolean(valor)` y `!!valor` → convierten a booleano siguiendo las reglas de "truthy/falsy".',
        'Recuerda los falsy: `0`, `\'\'`, `null`, `undefined`, `NaN`, `false`. Todo lo demás es truthy (incluidos `[]` y `{}`).',
        'Los métodos de instancia (`toUpperCase`, `trim`, `split`) viven en el wrapper, pero se usan sobre el primitivo sin enterarte.',
      ],
    },
    {
      type: 'note',
      text: 'Conexión con Open Cells: cuando un canal recibe datos de un servidor, vienen como strings y primitivos; antes de usarlos sueles pasarlos por los métodos de los wrappers (`parseInt`, `trim`, `Number(...)`). Saber que son wrappers te evita el bug de comparar `1 === "1"` o esperar métodos que no existen.',
    },
    {
      type: 'summary',
      points: [
        'Los primitivos no tienen métodos; JS los envuelve temporalmente en `String`, `Number` y `Boolean`.',
        'Evita `new String()`, `new Number()`, `new Boolean()`: crean objetos, no primitivos.',
        'Usa los estáticos: `Number.parseInt`, `Number.isNaN`, `Number.isInteger`, `String.fromCharCode`.',
        'Truthy/falsy: falsy son `0`, `\'\'`, `null`, `undefined`, `NaN`, `false`.',
        'Regla: primitivos para datos, wrappers solo para sus métodos y conversiones.',
      ],
    },
  ],
};
