import type { Lesson } from '../types';

export const lesson06: Lesson = {
  id: 'estado-y-rxjs',
  index: 5,
  title: 'Estado y comunicación (publish / subscribe)',
  subtitle: 'La lección más importante del curso.',
  topic: 'opencells',
  sections: [
    {
      type: 'intro',
      text: 'En una app con varios componentes, tarde o temprano necesitas que se pasen datos: el carrito actualizado en un sitio, el nombre de usuario en otro, el resultado de una búsqueda en un tercero. Open Cells resuelve esto con un patrón clásico: publicar y suscribirse (publish / subscribe) a canales, implementado con RxJS por debajo.',
    },
    {
      type: 'problem',
      text: 'El primer impulso de todo el mundo es pasar datos de componente a componente por propiedades y eventos. Eso funciona en apps pequeñas, pero cuando crece se convierte en un espagueti: propiedades atravesando cinco componentes, eventos rebotando hacia arriba... y el estado de la app queda repartido por todas partes sin saber quién es el dueño. Necesitas un sitio central donde guardar estado y una forma de avisar cuando cambia, sin acoplar los componentes entre sí.',
    },
    {
      type: 'text',
      title: 'La analogía de la emisora de radio',
      text: 'Imagina que cada "canal" es una emisora de radio con una frecuencia. Un componente es la emisora: emite un programa (publica un mensaje) en su frecuencia. Otros componentes son receptores: sintonizan esa frecuencia (se suscriben) y reciben el programa en tiempo real. Lo bonito es que la emisora y el receptor no se conocen: no tienen ninguna referencia el uno al otro. Solo comparten la frecuencia, es decir, el nombre del canal.',
    },
    {
      type: 'text',
      title: 'Las tres palabras clave',
      text: 'Un componente puede publicar un dato en un canal y otros componentes pueden escuchar ese canal. Así no necesitas que los componentes estén conectados directamente entre sí. Las tres piezas son: `publish` (enviar un valor a un canal), `subscribe` (empezar a escuchar un canal y reaccionar a sus valores) y `unsubscribe` (dejar de escucharlo).',
    },
    {
      type: 'code',
      sample: {
        title: 'Publicar, suscribirse y desuscribirse',
        lang: 'ts',
        code: `// El componente que EMITE (la emisora)
onButtonClick() {
  this.pageController.publish('liked-recipes', recipeList);
}

// El componente que ESCUCHA (el receptor)
connectedCallback() {
  super.connectedCallback();
  this.pageController.subscribe('liked-recipes', (recipes) => {
    this._recipes = recipes; // me llega el último valor publicado
    this.requestUpdate();
  });
}

// Cuando el componente se desconecta, corta la suscripción
disconnectedCallback() {
  this.pageController.unsubscribe('liked-recipes');
  super.disconnectedCallback();
}`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`publish(\'liked-recipes\', recipeList)` → envía `recipeList` al canal llamado `liked-recipes`. Cualquier componente suscrito a ese canal recibirá el valor.',
        '`subscribe(\'liked-recipes\', callback)` → el componente empieza a escuchar el canal. Cada vez que se publique un valor nuevo, el `callback` se ejecuta con ese valor.',
        'Dato importante: Open Cells conserva el ÚLTIMO valor publicado en cada canal. Si te suscribes después de que se haya publicado algo, el callback se ejecuta inmediatamente con ese último valor (no te pierdes el estado actual). Esto es lo que hace que sea un "estado", y no solo eventos sueltos.',
        '`unsubscribe(\'liked-recipes\')` → dejas de escuchar. A partir de ahí, los nuevos valores no te llegan. Hacerlo cuando el componente se desconecta evita fugas de memoria y "receptores fantasma".',
        'Los componentes no se conocen entre sí: el emisor y el receptor solo comparten el nombre del canal. Puedes cambiar un componente sin tocar el otro.',
      ],
    },
    {
      type: 'note',
      text: 'Detalle técnico: por debajo, los canales de Open Cells son Subjects de RxJS (concretamente ReplaySubject que guarda el último valor). No necesitas saber RxJS para usar publish/subscribe, pero si ya lo conoces, entenderás que "canal" ≈ "Subject" y que el valor publicado es el que llega a los suscriptores. En la lección siguiente veremos los canales con más detalle.',
    },
    {
      type: 'demo',
      title: 'Pruébalo: un contador desacoplado',
      description:
        'Aquí hay DOS componentes separados que NO se conocen. El de la izquierda publica el valor del contador en el canal `counter`. El de la derecha está suscrito a ese canal y se actualiza solo. No hay ninguna referencia entre ellos: solo comparten el nombre del canal.',
      component: 'demo-counter',
      howTo: [
        'Pulsa "+" y "-" en el publicador: el receptor (a la derecha) se actualiza solo.',
        'Pulsa "Desuscribir receptor": a partir de ese momento, el receptor deja de escuchar y muestra un aviso, aunque el publicador siga emitiendo.',
        'Pulsa "Volver a suscribir" para reactivarlo. Fíjate que al volver, recibe el último valor publicado.',
      ],
    },
    {
      type: 'summary',
      points: [
        'publish envia un valor a un canal; subscribe lo escucha; unsubscribe deja de escucharlo.',
        'Los canales guardan el último valor: suscribirte tarde no te hace perder el estado.',
        'Los componentes que comparten un canal NO necesitan conocerse entre sí.',
        'Es la forma de manejar el estado global de una app Open Cells.',
      ],
    },
  ],
};
