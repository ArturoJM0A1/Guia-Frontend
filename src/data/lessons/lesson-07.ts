import type { Lesson } from '../types';

export const lesson07: Lesson = {
  id: 'channels',
  index: 6,
  title: 'Channels (canales)',
  subtitle: 'La "frecuencia" por la que viaja tu estado.',
  topic: 'opencells',
  sections: [
    {
      type: 'intro',
      text: 'Un canal es, literalmente, un nombre con un valor asociado que vive dentro de Open Cells. Es el espacio de comunicación entre componentes. Tú eliges el nombre (`counter`, `user`, `liked-recipes`...) y Open Cells se encarga de que todos los que usen ese mismo nombre estén conectados.',
    },
    {
      type: 'problem',
      text: 'Si los componentes hablaran directamente entre sí, necesitarían referencias, callbacks, listeners y una red de conexiones que es un infierno de mantener. Un canal intermedio rompe esa red: el que publica no sabe (ni le importa) quién escucha, y el que escucha no sabe quién emite. El canal es el único punto en común.',
    },
    {
      type: 'text',
      title: 'Qué ocurre, paso a paso, cuando publicas',
      text: 'Vamos a seguir el viaje de un valor, por ejemplo un contador, desde que un componente lo publica hasta que otro lo recibe:',
    },
    {
      type: 'text',
      title: 'Paso 1 — Se publica',
      text: 'Un componente llama a `publish(\'counter\', value)`. Open Cells busca el canal llamado `counter` (si no existía, lo crea en ese momento) y deposita ahí el valor. Ese valor queda guardado como el último estado del canal.',
    },
    {
      type: 'text',
      title: 'Paso 2 — Se notifica',
      text: 'Open Cells avisa a todos los componentes que están suscritos a `counter`. Cada uno ejecuta su callback con el valor recién publicado. Si nadie está suscrito, el valor simplemente se queda guardado en el canal, esperando a que alguien se suscriba (entonces lo recibirá al instante).',
    },
    {
      type: 'text',
      title: 'Paso 3 — El componente reacciona',
      text: 'Cada suscriptor decide qué hacer con el valor: guardarlo en una propiedad, repintarse, llamar a una función... El emisor no controla nada de esto. Esa separación es la que mantiene tu código desacoplado.',
    },
    {
      type: 'code',
      sample: {
        title: 'Publicar y suscribirse al mismo canal',
        lang: 'ts',
        code: `// Componente emisor
class CounterPublisher extends LitElement {
  pageController = new ElementController(this);

  increment() {
    const current = this._getValueFromWherever();
    this.pageController.publish('counter', current + 1);
  }
}

// Componente receptor (en otra parte de la app, sin conocerse)
class CounterDisplay extends LitElement {
  pageController = new ElementController(this);

  connectedCallback() {
    super.connectedCallback();
    this.pageController.subscribe('counter', (value) => {
      console.log('Me ha llegado el valor:', value);
      this._value = value;
    });
  }

  disconnectedCallback() {
    this.pageController.unsubscribe('counter');
    super.disconnectedCallback();
  }
}`,
      },
    },
    {
      type: 'explain',
      title: 'Repasando el ejemplo',
      points: [
        '`publish(\'counter\', value)` → escribe el valor en el canal `counter`. Los canales de usuario no tienen prefijos especiales: usan el nombre tal cual.',
        '`subscribe(\'counter\', callback)` → se engancha al canal. Si el canal no existía, Open Cells lo crea en ese momento. El callback recibe el valor publicado.',
        '`unsubscribe(\'counter\')` → suelta el enganche. El componente deja de recibir novedades de ese canal.',
        'Da igual el orden: si un componente se suscribe DESPUÉS de que otro publicara, igualmente recibe el último valor publicado, porque el canal lo conserva.',
      ],
    },
    {
      type: 'text',
      title: 'Canales privados: Open Cells también usa canales',
      text: 'Open Cells usa este mismo mecanismo por dentro para cosas suyas. Por ejemplo, cada página tiene un canal privado (de solo lectura para ti) llamado `__oc_page_<nombreDeLaPágina>` con el que avisa cuando la página entra o sale en pantalla. Y existe un canal privado global, `__oc_app`, que publica el contexto de la aplicación (página actual y anterior). Lo verás en las lecciones de ciclo de vida y app context. No intentes publicar en canales privados: Open Cells lo bloquea con un aviso.',
    },
    {
      type: 'demo',
      title: 'Pruébalo: una mini emisora de radio',
      description:
        'Escribe un mensaje y pulsa "Emitir". La emisora lo publica en el canal `chat`. El receptor (que está "sintonizado") lo muestra en su lista, como un receptor de radio recoge la señal. El log te enseña la secuencia exacta: primero se publica, luego se recibe.',
      component: 'demo-channels',
      howTo: [
        'Escribe un mensaje y pulsa "Emitir" (o la tecla Enter).',
        'Mira el log: verás el paso "publicado en channel: chat" y justo después "recibido en el receptor".',
        'Pulsa "Desconectar receptor" y emite otro mensaje: el log muestra que se publicó, pero el receptor no lo recibió. ¡Eso es unsubscribe funcionando!',
      ],
    },
    {
      type: 'summary',
      points: [
        'Un canal es un nombre que conecta a quien publica con quien escucha.',
        'Los valores quedan guardados en el canal hasta la siguiente publicación.',
        'El flujo es: publicar → notificar a los suscriptores → cada uno reacciona.',
        'Puedes suscribirte cuando quieras y siempre recibirás el último estado.',
        'Open Cells usa canales privados (`__oc_...`) para su funcionamiento interno.',
      ],
    },
  ],
};
