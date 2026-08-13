import type { Lesson } from '../types';

export const lesson20: Lesson = {
  id: 'typescript',
  index: 19,
  title: 'TypeScript',
  subtitle: 'interfaces, types y generics: tipos que se comprueban antes de ejecutar.',
  topic: 'plataforma',
  sections: [
    {
      type: 'intro',
      text: 'TypeScript es JavaScript + tipos: un superconjunto que añade anotaciones de tipos y las comprueba antes de ejecutar (en "tiempo de compilación"). Cuando haces `npm run build`, `tsc` (el compilador) revisa tus tipos y, si todo cuadra, emite JavaScript puro. Esta app está escrita en TypeScript: cada lección, página y demo que has visto declaran sus tipos. En esta lección: `interface`, `type` y los generics básicos.',
    },
    {
      type: 'problem',
      text: 'En JavaScript, un error de tipo solo aparece cuando el código se ejecuta (y a menudo solo en producción, con datos reales). `usuario.nombre` lanza "undefined is not a function" cuando alguien pasa un objeto que no era el esperado. TypeScript mueve esa detección a antes: si declaras que una función espera un `Usuario`, el compilador te avisa en tu editor antes de guardar el archivo. Menos bugs, y el editor te autocompleta las propiedades.',
    },
    {
      type: 'text',
      title: 'interface — el contrato de un objeto',
      text: 'Una `interface` describe la FORMA de un objeto: qué propiedades tiene y de qué tipo. Es un contrato: todo objeto que la cumpla es válido, esté escrito donde esté. Es la pieza que usan las librerías para tipar "una página", "un canal" o "una ruta".',
    },
    {
      type: 'code',
      sample: {
        title: 'Interfaces: el contrato de un objeto',
        lang: 'ts',
        code: `interface Usuario {
  nombre: string;
  edad: number;
  activo: boolean;
  // Propiedad opcional (puede no existir)
  email?: string;
  // Propiedad de solo lectura
  readonly id: string;
}

// Cualquier objeto con esa forma es un Usuario
const ana: Usuario = {
  id: 'u-1',
  nombre: 'Ana',
  edad: 34,
  activo: true,
  email: 'ana@mail.com', // opcional: puede omitirse
};

// Tipar funciones y arrays
function saludar(usuario: Usuario): string {
  return \`Hola, \${usuario.nombre}\`;
}

const usuarios: Usuario[] = [ana];

// Las interfaces se extienden
interface Admin extends Usuario {
  permisos: string[];
}

const admin: Admin = { ...ana, permisos: ['borrar', 'editar'] };`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`interface Usuario { ... }` → declara la forma del objeto. No genera código: solo existe para la comprobación.',
        '`nombre: string` → cada propiedad tiene su tipo: string, number, boolean...',
        '`email?: string` → el `?` la hace opcional. Sin él, TypeScript te obligaría a pasarla siempre.',
        '`readonly id: string` → no se puede reasignar después de crear el objeto.',
        '`function saludar(u: Usuario): string` → el parámetro y el retorno están tipados.',
        '`interface Admin extends Usuario` → herencia de contratos: Admin es Usuario y además tiene `permisos`.',
      ],
    },
    {
      type: 'text',
      title: 'type — uniones, alias y tipos literales',
      text: '`type` crea un "alias" para un tipo. Donde brilla es combinando tipos existentes: UNIONES (`A | B`, uno u otro), INTERSECCIONES (`A & B`, ambos) y TIPOS LITERALES (solo ciertos valores, como un enum más ligero). En muchos casos `type` e `interface` son intercambiables; la diferencia práctica: las interfaces se extienden fácilmente y los types combinan tipos.',
    },
    {
      type: 'code',
      sample: {
        title: 'Types: uniones, literales y alias',
        lang: 'ts',
        code: `// Alias: dar nombre a un tipo
type Id = string | number; // una unión
type Estado = 'activo' | 'inactivo' | 'pendiente'; // literal

const estado: Estado = 'activo';   // ✓
// const mal: Estado = 'apagado';  // ✗ Error: no es uno de los literales

// Unión: un valor que puede ser de varios tipos
function pintarId(id: Id) {
  return \`ID: \${id}\`;
}
pintarId(42);       // ✓
pintarId('u-1');    // ✓

// Tipos objeto con type (equivalente a interface)
type Coordenada = {
  x: number;
  y: number;
};

// Intersección: las dos cosas a la vez
type EnDispositivo = Usuario & { plataforma: 'web' | 'móvil' };

// Discriminación: un campo literal que distingue variantes
type Resultado =
  | { tipo: 'ok'; datos: string[] }
  | { tipo: 'error'; mensaje: string };

function mostrar(r: Resultado) {
  if (r.tipo === 'ok') {
    return r.datos.join(', '); // aquí TS sabe que es la variante 'ok'
  }
  return 'Error: ' + r.mensaje;
}`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`type Estado = \'activo\' | \'inactivo\'` → un tipo literal: solo admite esos strings. Cero bugs de "typo".',
        '`type Id = string | number` → unión: cualquiera de los dos.',
        '`type Coordenada = { ... }` → también puedes tipar objetos con type.',
        '`&` intersección: el tipo resultante tiene las propiedades de ambos.',
        'El patrón `{ tipo: \'ok\' } | { tipo: \'error\' }` es "unión discriminada": con un simple `if` sobre `tipo`, TypeScript sabe qué variante estás usando y autocompleta sus campos.',
      ],
    },
    {
      type: 'text',
      title: 'Generics — tipos que reciben parámetros',
      text: 'Un generic es un tipo que recibe OTRO tipo como parámetro. `Array<string>` ya lo es: "array de strings". Los genéricos te permiten escribir funciones y componentes que funcionan con cualquier tipo, SIN perder la comprobación. En esta app: `LessonSection`, `Map<string, number>`... todo son generics.',
    },
    {
      type: 'code',
      sample: {
        title: 'Generics básicos: funciones y tipos con <T>',
        lang: 'ts',
        code: `// <T> = "algún tipo, el que sea". La función devuelve el MISMO tipo
function primero<T>(lista: T[]): T | undefined {
  return lista[0];
}

primero([1, 2, 3]);          // T = number → number
primero(['a', 'b']);         // T = string → string
primero<Usuario>([ana]);     // T = Usuario → Usuario

// Tipos genéricos propios
type Resultado<T> =
  | { tipo: 'ok'; valor: T }
  | { tipo: 'error'; mensaje: string };

const r1: Resultado<number> = { tipo: 'ok', valor: 42 };
const r2: Resultado<string[]> = { tipo: 'ok', valor: ['a', 'b'] };

// Interfaces genéricas
interface Caja<T> {
  contenido: T;
}

const caja: Caja<Usuario> = { contenido: ana };

// Generics con límite (constraint): T debe tener .length
function longitud<T extends { length: number }>(x: T): number {
  return x.length;
}

longitud('hola');   // ✓ (string tiene length)
longitud([1, 2]);   // ✓ (array tiene length)
// longitud(42);    // ✗ Error: number no tiene length

// Map y Set con tipos, el día a día
const visitas = new Map<string, number>();
const etiquetas = new Set<string>();`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`function primero<T>(lista: T[]): T` → la T es un "placeholder": TypeScript lo infiere de la llamada. Devuelves lo que metes.',
        '`Resultado<T>` → el mismo patrón de la unión discriminada, pero genérico: puedes reutilizarlo para números, strings, usuarios...',
        '`interface Caja<T> { contenido: T }` → interfaces genéricas. Es exactamente cómo está tipado `Map<K, V>` y `Set<T>` en la librería estándar.',
        '`T extends { length: number }` → un constraint: "T tiene que ser un tipo que tenga la propiedad length". Limita qué tipos son válidos.',
        'Los generics son la razón por la que `lessons.find(l => l.id === id)` te devuelve un `Lesson` (y no un `unknown`).',
      ],
    },
    {
      type: 'table',
      title: 'interface vs type',
      caption: 'Cuándo elegir cada uno (en el día a día, son casi intercambiables)',
      headers: ['Situación', 'interface', 'type'],
      rows: [
        ['Describir la forma de un objeto', 'Sí — su fuerte', 'Sí'],
        ['Uniones (A | B)', 'No', 'Sí'],
        ['Tipos literales (\'activo\' | \'inactivo\')', 'No', 'Sí'],
        ['Objetos que se extienden mucho', 'Sí — extendible y se "funden"', 'Con &'],
        ['Alias simples (type Id = string | number)', 'No', 'Sí'],
        ['Tuplas y utilidades avanzadas', 'No', 'Sí'],
      ],
    },
    {
      type: 'note',
      text: 'Conexión con Open Cells: Open Cells está tipado con TypeScript. `PageController<T>`, `Channel<T>`, `Router`... Cuando llamas a `pageController.subscribe(\'canal\', fn)` el editor ya sabe qué forma tiene el dato de ese canal. Y tu propia app: `Lesson` y `LessonSection` (en `src/data/types.ts`) son interfaces con uniones discriminadas — el patrón que acabas de ver en esta lección.',
    },
    {
      type: 'demo',
      title: 'Pruébalo: los tipos en acción',
      description: 'Una demo que muestra interface, type y generics funcionando con datos reales: un objeto tipado, una unión discriminada que reacciona según su variante y un generic que sirve para varias formas.',
      component: 'demo-typescript',
      howTo: [
        'Mira la ficha: está tipada con una interface (obligatorias, opcionales y readonly).',
        'Cambia el estado del pedido: es una unión literal (`\'pendiente\' | \'enviado\' | \'entregado\'`).',
        'Prueba la unión discriminada: la tarjeta cambia según si el resultado es `ok` o `error`.',
        'El generic `primero<T>` recupera el primer elemento de cualquier lista y conserva su tipo.',
      ],
    },
    {
      type: 'summary',
      points: [
        '`interface` → el contrato de un objeto: propiedades, opcionales `?`, `readonly` y `extends`.',
        '`type` → alias, uniones (`|`), literales (`\'a\' | \'b\'`) e intersecciones (`&`).',
        'Unión discriminada: `{ tipo: \'ok\' } | { tipo: \'error\' }` y comprobar con `if`.',
        'Generics `<T>` → funciones y tipos que reciben otro tipo y conservan la comprobación.',
        '`tsc` comprueba los tipos en `npm run build`; los tipos desaparecen en el JavaScript final.',
      ],
    },
  ],
};
