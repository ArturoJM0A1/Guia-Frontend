import type { Lesson } from '../types';

export const lesson15: Lesson = {
  id: 'react-hooks',
  index: 14,
  title: 'React: los hooks más usados',
  subtitle: 'useState, useEffect, useContext y useRef, explicados con ejemplos.',
  topic: 'frameworks',
  sections: [
    {
      type: 'intro',
      text: 'React es una librería (no un framework completo) para construir interfaces: tú escribes funciones que describen "cómo debería verse la UI", y React se encarga de actualizar el DOM cuando cambian los datos. Los hooks son funciones que se llaman dentro de un componente para "engancharse" a las capacidades de React: estado, efectos secundarios, contexto y referencias. Son el equivalente a los controllers de Open Cells: el puente entre tu componente y el "motor".',
    },
    {
      type: 'problem',
      text: 'En las versiones antiguas de React, un componente con estado tenía que ser una clase con métodos `this.setState` y una maraña de ciclo de vida. Los hooks llegaron para que el estado y los efectos se escriban en funciones simples. El reto de aprenderlos es entender CUÁNDO usar cada uno, porque son pocos y muy poderosos. Esta lección cubre los cuatro que te vas a encontrar en el 90% de los componentes.',
    },
    {
      type: 'text',
      title: 'useState: manejar estado',
      text: '`useState(valorInicial)` devuelve un par: el valor actual y una función para cambiarlo. Cuando llamas a esa función con el nuevo valor, el componente se vuelve a renderizar con el estado actualizado. Piensa en ello como "una cajita de estado con su botón de actualizar".',
    },
    {
      type: 'code',
      sample: {
        title: 'Un contador con useState',
        lang: 'jsx',
        code: `import { useState } from 'react';

export default function Contador() {
  // Destructuring: valor actual + función para actualizarlo
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Has pulsado {contador} veces</p>
      <button onClick={() => setContador(contador + 1)}>
        +1
      </button>
    </div>
  );
}`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`const [contador, setContador] = useState(0)` → desestructuración: `contador` vale el estado actual (empieza en 0) y `setContador` es la única forma de cambiarlo.',
        '`setContador(contador + 1)` → pide un re-render con el nuevo valor. No modifica la variable: crea un estado nuevo.',
        'Regla de oro: NUNCA escribas `contador++` o `contador = ...` directamente. El estado solo cambia a través del "setter".',
        'Si quieres depender del valor anterior: `setContador(prev => prev + 1)` (forma funcional, a prueba de races).',
      ],
    },
    {
      type: 'text',
      title: 'useEffect: efectos secundarios (APIs, suscripciones)',
      text: '`useEffect(fn, deps)` ejecuta la función después de cada render, para cosas que tienen efectos fuera del componente: llamadas a APIs, suscripciones, timers, "sincronizar" con algo externo. El segundo argumento controla cuándo se re-ejecuta: `[]` solo al montar, `[dato]` cuando `dato` cambie, y sin array en cada render.',
    },
    {
      type: 'code',
      sample: {
        title: 'Cargar datos de una API al montar el componente',
        lang: 'jsx',
        code: `import { useState, useEffect } from 'react';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Se ejecuta una sola vez (deps vacías), al montar
    fetch('https://api.ejemplo.com/usuarios')
      .then((respuesta) => respuesta.json())
      .then(setUsuarios);
  }, []);

  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>{usuario.nombre}</li>
      ))}
    </ul>
  );
}`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`useEffect(callback, [])` → el callback corre tras el primer render. Las dependencias vacías dicen "solo una vez", como un `onPageEnter` que se dispara al entrar.',
        '`fetch(...)` → ejemplo de efecto secundario: algo que no es parte de "pintar", sino de buscar datos fuera.',
        'La devolución de una función dentro del effect es el "cleanup": `useEffect(() => { ...; return () => limpiar(); }, [])`. Se usa para desuscribirse o parar timers, igual que el `disconnectedCallback` o el `unsubscribe` de Open Cells.',
        'Regla práctica: si tu componente no hace nada con el exterior (sin API, sin timers, sin listeners), probablemente no necesita `useEffect`.',
      ],
    },
    {
      type: 'text',
      title: 'useContext: consumir contexto global',
      text: 'Cuando varios componentes necesitan el mismo dato (tema, idioma, usuario), pasarlo "de padre a hijo" por propiedades se vuelve un dolor conocido como "prop drilling". `Context` crea un valor global, y `useContext` permite leerlo en cualquier componente sin pasar por los intermedios. Es el pariente lejano de los canales de Open Cells: un dato compartido sin acoplar componentes.',
    },
    {
      type: 'code',
      sample: {
        title: 'Un tema global con createContext + useContext',
        lang: 'jsx',
        code: `import { createContext, useContext, useState } from 'react';

const TemaContext = createContext('claro');

function Boton() {
  const tema = useContext(TemaContext); // leo el contexto desde aquí
  return <button className={'tema-' + tema}>Soy un botón {tema}</button>;
}

export default function App() {
  const [tema, setTema] = useState('claro');

  return (
    <TemaContext.Provider value={tema}>
      <Boton /> {/* no hace falta pasar 'tema' por props */}
      <button onClick={() => setTema(tema === 'claro' ? 'oscuro' : 'claro')}>
        Cambiar tema
      </button>
    </TemaContext.Provider>
  );
}`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`createContext(\'claro\')` → crea el "contenedor" con un valor por defecto.',
        '`<TemaContext.Provider value={tema}>` → envuelve el árbol y ofrece el valor a quien lo pida.',
        '`useContext(TemaContext)` → dentro de `Boton`, devuelve el valor actual. Cuando cambia, el botón se re-renderiza.',
        'Comparación honesta con Open Cells: un canal público es "casi lo mismo, sin árbol de proveedores". React necesita el Provider; Open Cells solo un nombre de canal.',
        'Cuidado con abusar: para estado que solo necesita un componente y su hijo, un simple `useState` basta.',
      ],
    },
    {
      type: 'text',
      title: 'useRef: referencias y valores persistentes',
      text: '`useRef(initialValue)` te da un objeto con una propiedad `.current`. Tiene dos usos clásicos: apuntar a un elemento del DOM (para enfocar, medir, animar) y guardar valores que NO deben disparar re-renders (como un temporizador o un contador interno). Cambiar `ref.current` no vuelve a pintar el componente.',
    },
    {
      type: 'code',
      sample: {
        title: 'Enfocar un input con useRef',
        lang: 'jsx',
        code: `import { useRef } from 'react';

export default function EnfocarInput() {
  const inputRef = useRef(null);

  const enfocar = () => {
    // Apunta al elemento <input> real del DOM
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={enfocar}>Enfocar el input</button>
    </>
  );
}`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`useRef(null)` → crea una caja con `.current = null` que sobrevive a los re-renders.',
        '`ref={inputRef}` → React conecta la caja al elemento real: `inputRef.current` es el `<input>` del DOM.',
        '`inputRef.current?.focus()` → operamos directamente con el elemento, sin necesidad de re-render.',
        'El `?` evita fallar si el elemento aún no existe. Es el equivalente a "acceder al nodo real", cosa que en Open Cells/Lit haces con un `@query` o con selectores.',
        'Segundo uso: `const id = useRef(0)` y `id.current++` para valores que no deben repintar.',
      ],
    },
    {
      type: 'table',
      title: 'Los 4 hooks de un vistazo',
      caption: 'Cuándo usar cada uno',
      headers: ['Hook', 'Para qué', 'Analogía en este curso'],
      rows: [
        ['useState', 'Guardar y actualizar estado local del componente', 'Un canal privado local a un solo componente'],
        ['useEffect', 'Efectos secundarios: APIs, suscripciones, timers', 'onPageEnter + unsubscribe'],
        ['useContext', 'Compartir un valor global sin pasarlo por props', 'Un canal global (publish/subscribe)'],
        ['useRef', 'Referencia a elementos DOM o valores que no repintan', 'querySelector + variable estática'],
      ],
    },
    {
      type: 'note',
      text: 'Conexión con Open Cells: los hooks y los controllers resuelven el mismo problema (estado y efectos en componentes) con enfoques distintos. En React el estado local vive en `useState` y el compartido en Context/Redux; en Open Cells el estado vive en canales y los componentes lo leen con `subscribe`. Si entiendes un patrón, el otro te resulta familiar.',
    },
    {
      type: 'demo',
      title: 'Pruébalo: los cuatro hooks, en vivo',
      description: 'Una demo que simula useState, useEffect, useRef y useContext con Lit (que hace de "traductor"): los mismos conceptos, la sintaxis de este curso.',
      component: 'demo-react-hooks',
      howTo: [
        'Bloque 1 (useState): pulsa +1 y Reset. Cada cambio de estado repinta la vista.',
        'Bloque 2 (useEffect): al cargar la página, los datos llegan solos un instante después — como una llamada a API al montar.',
        'Bloque 3 (useRef): pulsa "Enfocar el input" y mira dónde aterriza el foco, sin repintar.',
        'Bloque 4 (useContext): cambia el tema; el dato compartido llega a todos los bloques que lo lean.',
      ],
    },
    {
      type: 'summary',
      points: [
        '`useState` → estado local: `const [valor, setValor] = useState(inicial)`.',
        '`useEffect(fn, deps)` → efectos secundarios; `[]` = al montar, retorno = cleanup.',
        '`useContext` → valor global sin prop drilling; se lee con el hook y se ofrece con Provider.',
        '`useRef` → referencia al DOM o valores que no disparan re-renders.',
        'Regla mental: setState pinta, useEffect sincroniza, Context comparte, ref toca el DOM.',
      ],
    },
  ],
};
