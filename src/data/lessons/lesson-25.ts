import type { Lesson } from '../types';

export const lesson25: Lesson = {
  id: 'testing-mocks',
  index: 24,
  title: 'Testing con mocks',
  subtitle: 'describe/it/expect y mocks: probar aislado, rápido y sin red.',
  topic: 'plataforma',
  sections: [
    {
      type: 'intro',
      text: 'Los tests te dicen si tu código sigue funcionando cuando cambias algo. Un test unitario ejecuta una pieza (una función, un componente) y comprueba que hace lo que promete. Los MOCKS entran cuando esa pieza depende de algo externo (una API, un módulo, un timer): en lugar de tocar el mundo real, lo SUSTITUYES por una versión falsa y controlada. En esta lección usarás Vitest (el runner moderno que encaja con Vite), pero los conceptos valen para Jest o cualquier otro.',
    },
    {
      type: 'problem',
      text: 'Un test que llama a una API real es lento, no determinista y frágil: depende de que el servidor esté arriba, de la red y de los datos. Un test que escribe en una base de datos de verdad puede estropearla. Los mocks resuelven eso: la función se prueba con respuestas fijas que tú decides, en milisegundos, sin abrir puertos ni esperar a nadie. Probar con mocks es la diferencia entre "los tests funcionan en mi máquina" y "los tests funcionan siempre".',
    },
    {
      type: 'text',
      title: 'La estructura de un test',
      text: 'Todo runner se apoya en el mismo trío: `describe` (agrupa), `it` o `test` (define un caso) y `expect` (comprueba). El patrón clásico de cada test es: ARRANGE (prepara), ACT (ejecuta), ASSERT (comprueba).',
    },
    {
      type: 'code',
      sample: {
        title: 'El primer test unitario con Vitest',
        lang: 'ts',
        code: `// calculadora.ts — el código que se prueba
export function sumar(a: number, b: number): number {
  return a + b;
}

export function esPar(n: number): boolean {
  return n % 2 === 0;
}

// calculadora.test.ts — el test
import { describe, it, expect } from 'vitest';
import { sumar, esPar } from './calculadora';

describe('calculadora', () => {
  it('suma dos números', () => {
    // ACT + ASSERT
    expect(sumar(2, 3)).toBe(5);
  });

  it('dice si un número es par', () => {
    expect(esPar(4)).toBe(true);
    expect(esPar(7)).toBe(false);
  });

  // Un "cajón de casos": mismo test, varios datos
  it.each([
    [2, 3, 5],
    [0, 0, 0],
    [-1, 1, 0],
  ])('suma %i + %i = %i', (a, b, esperado) => {
    expect(sumar(a, b)).toBe(esperado);
  });
});`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`describe(\'calculadora\', ...)` → agrupa los tests de una unidad. En la consola se ve como una sección.',
        '`it(\'hace tal cosa\', ...)` → un caso concreto. Si falla, el mensaje te dice QUÉ falló.',
        '`expect(x).toBe(y)` → la aserción. Hay muchas: `toEqual` (objetos), `toBeTruthy`, `toHaveLength`, `toContain`...',
        '`it.each([...])` → repite el mismo test con varios datos. Es la forma limpia de probar "cajones" de casos.',
        'Filosofía: un test falla por UNA razón. Si preparas bien el estado, cada caso comprueba una cosa.',
      ],
    },
    {
      type: 'text',
      title: 'Qué es un mock (y qué no es)',
      text: 'Un mock es una función o módulo falso que registra cómo se le llama y devuelve lo que tú quieras. Tres piezas: `vi.fn()` crea la función falsa, `vi.mock()` sustituye un módulo entero, y `vi.spyOn()` espía un método de un objeto real. Después compruebas con `expect(fn).toHaveBeenCalledWith(...)` qué le pasó tu código.',
    },
    {
      type: 'code',
      sample: {
        title: 'vi.fn(): la función falsa que registra llamadas',
        lang: 'ts',
        code: `import { describe, it, expect, vi } from 'vitest';

// El código que queremos probar
function saludarSiPuede(saludar: (nombre: string) => string, nombre: string) {
  if (nombre) {
    return saludar(nombre);
  }
  return 'sin nombre';
}

describe('mocks con vi.fn', () => {
  it('llama al mock con el argumento correcto', () => {
    const saludar = vi.fn().mockReturnValue('¡hola!'); // respuesta fija
    const resultado = saludarSiPuede(saludar, 'Ana');

    expect(resultado).toBe('¡hola!');
    expect(saludar).toHaveBeenCalled();                 // sí se llamó
    expect(saludar).toHaveBeenCalledWith('Ana');        // con 'Ana'
  });

  it('responde distinto según el argumento', () => {
    const fn = vi.fn((x: number) => x * 2); // implementación real
    expect(fn(2)).toBe(4);
    expect(fn(10)).toBe(20);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`vi.fn()` → crea una función que no hace nada por defecto, pero que REGISTRA cada llamada y sus argumentos.',
        '`mockReturnValue(\'¡hola!\')` → decide la respuesta fija. También `mockResolvedValue(...)` para promesas y `mockRejectedValue(...)` para errores.',
        '`expect(fn).toHaveBeenCalledWith(\'Ana\')` → el superpoder de los mocks: no solo compruebas el resultado, compruebas cómo te llamaron.',
        'Puedes pasar una implementación: `vi.fn((x) => x * 2)` actúa de verdad, pero sigue registrando llamadas.',
      ],
    },
    {
      type: 'text',
      title: 'Mockear lo externo: fetch y módulos',
      text: 'El caso más común: una función que llama a `fetch`. No quieres red real; quieres simular la respuesta del servidor. Con `vi.mock` sustituyes `globalThis.fetch` en ese test, y con `vi.spyOn` interceptas métodos de objetos existentes.',
    },
    {
      type: 'code',
      sample: {
        title: 'Mockear fetch y un módulo',
        lang: 'ts',
        code: `// servicios.js — el código real
export async function cargarUsuarios() {
  const respuesta = await fetch('/api/usuarios');
  if (!respuesta.ok) throw new Error('HTTP ' + respuesta.status);
  return respuesta.json();
}

// servicios.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cargarUsuarios } from './servicios';

describe('cargarUsuarios con fetch mockeado', () => {
  beforeEach(() => {
    // Sustituir fetch: cada test decide su respuesta
    vi.stubGlobal('fetch', vi.fn());
  });

  it('devuelve los usuarios en caso de éxito', async () => {
    const falsoFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, nombre: 'Ana' }],
    });
    vi.stubGlobal('fetch', falsoFetch);

    const usuarios = await cargarUsuarios();

    expect(usuarios).toEqual([{ id: 1, nombre: 'Ana' }]);
    expect(falsoFetch).toHaveBeenCalledWith('/api/usuarios');
  });

  it('lanza error si la respuesta no es ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );

    await expect(cargarUsuarios()).rejects.toThrow('HTTP 500');
  });
});`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`vi.stubGlobal(\'fetch\', vi.fn())` → reemplaza el fetch global DENTRO del test y lo restaura solo al terminar.',
        '`mockResolvedValue({ ok: true, json: async () => [...] })` → el "servidor falso" devuelve lo que quieras, sin red.',
        '`expect(fn).toHaveBeenCalledWith(\'/api/usuarios\')` → comprueba que tu código pidió exactamente esa URL.',
        '`rejects.toThrow(\'HTTP 500\')` → prueba la rama de error: lo que en producción sería un fallo, aquí es solo otra respuesta.',
        '`beforeEach` prepara el estado antes de cada test para que no se "contagien" entre sí.',
      ],
    },
    {
      type: 'table',
      title: 'Las piezas de Vitest (las mismas en Jest)',
      caption: 'Qué usar para cada situación',
      headers: ['Herramienta', 'Qué hace', 'Cuándo'],
      rows: [
        ['describe / it / expect', 'Estructura y aserciones', 'Todos los tests'],
        ['vi.fn()', 'Crea una función falsa que registra llamadas', 'Inyectar dependencias y callbacks'],
        ['vi.mock(\'módulo\')', 'Sustituye un módulo entero por uno falso', 'Módulos que tocan red, DB o hardware'],
        ['vi.spyOn(obj, \'metodo\')', 'Espía un método real (puede seguir llamando al original)', 'Métodos de objetos y timers'],
        ['vi.stubGlobal(\'fetch\', fn)', 'Reemplaza un global (fetch, setTimeout...)', 'APIs del navegador'],
        ['vi.useFakeTimers()', 'Controla el reloj: avanzas el tiempo a mano', 'Timers, debounce, animaciones'],
        ['mockResolvedValue / mockRejectedValue', 'Respuestas fijas para promesas', 'Async/await'],
      ],
    },
    {
      type: 'text',
      title: 'Un truco más: fake timers y espías',
      text: 'Con `vi.useFakeTimers()` el reloj deja de correr de verdad: tú avanzas el tiempo con `vi.advanceTimersByTime(ms)` o esperas todo con `vi.runAllTimers()`. Y con `vi.spyOn` puedes verificar que se llamó a un método real sin romperlo. Ejemplo: probar un "debounce" que espera 300ms.',
    },
    {
      type: 'code',
      sample: {
        title: 'Probar un debounce con fake timers',
        lang: 'ts',
        code: `// debounce.js
export function debounce(funcion, esperaMs) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => funcion(...args), esperaMs);
  };
}

// debounce.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('espera a que dejes de llamar antes de ejecutar', () => {
    const ejecutada = vi.fn();
    const lanzar = debounce(ejecutada, 300);

    lanzar();
    lanzar();
    lanzar();

    expect(ejecutada).not.toHaveBeenCalled(); // aún no ha pasado el tiempo

    vi.advanceTimersByTime(300);              // avanzamos el reloj
    expect(ejecutada).toHaveBeenCalledTimes(1); // solo UNA vez
  });
});`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`vi.useFakeTimers()` → congela el reloj: `setTimeout` no se ejecuta solo, tú lo controlas.',
        '`vi.advanceTimersByTime(300)` → adelanta 300ms de golpe y dispara lo que vencía.',
        '`expect(ejecutada).not.toHaveBeenCalled()` antes del tiempo → demuestra que el debounce retrasa.',
        'Resultado: el test corre en milisegundos reales, aunque el código hable de segundos.',
      ],
    },
    {
      type: 'note',
      text: 'Conexión con Open Cells: los canales se prueban igual: en lugar de una API real, publicas en un canal mockeado y compruebas que los suscriptores reciben el dato esperado. Es el patrón que verás en cualquier proyecto con Open Cells: `vi.mock` a los servicios de red, `subscribe` real al canal, y `expect` sobre lo que llegó.',
    },
    {
      type: 'demo',
      title: 'Pruébalo: un mini test runner con mocks',
      description: 'Una demo que ejecuta en tu navegador tests reales con mocks: una función con `vi.fn` y una llamada a "fetch" simulado. Pulsa "Ejecutar tests" y mira pasar cada caso.',
      component: 'demo-testing',
      howTo: [
        'Pulsa "Ejecutar tests": cada `it` corre con su mock y se pinta en verde (pasa) o rojo (falla).',
        'En el primer bloque, cambia el argumento esperado para ver fallar el test (toHaveBeenCalledWith).',
        'En el bloque de fetch, elige la respuesta del "servidor falso" y mira si el test pasa o falla.',
        'Fíjate: ningún test toca la red de verdad; todo es un mock.',
      ],
    },
    {
      type: 'summary',
      points: [
        'Estructura: `describe` agrupa, `it` define el caso, `expect` comprueba.',
        'Un mock es una versión falsa y controlada de algo externo (API, módulo, timer).',
        '`vi.fn()` crea la función falsa; registra llamadas y devuelve respuestas fijas.',
        '`vi.mock`, `vi.spyOn` y `vi.stubGlobal(\'fetch\', fn)` sustituyen lo externo.',
        'Fake timers controlan el reloj; `mockResolvedValue`/`mockRejectedValue` manejan promesas.',
      ],
    },
  ],
};
