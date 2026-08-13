import type { Lesson } from '../types';

export const lesson11: Lesson = {
  id: 'arquitectura-completa',
  index: 10,
  title: 'Arquitectura completa',
  subtitle: 'Todas las piezas, funcionando juntas.',
  topic: 'opencells',
  sections: [
    {
      type: 'intro',
      text: 'Hasta aquí hemos visto cada pieza por separado. Ahora toca el momento de conectar el puzzle: ver cómo el `index.html`, `startApp`, las rutas, las páginas, los controllers y los canales trabajan juntos para que una SPA funcione. Cuando entiendas este flujo, habrás entendido Open Cells.',
    },
    {
      type: 'problem',
      text: 'El problema era: "¿cómo construyo una app de una sola página ordenada, con navegación real y estado compartido, sin reinventar la rueda?". La respuesta de Open Cells es: un flujo claro donde cada pieza tiene un solo trabajo, y las piezas se comunican por contratos pequeños (rutas por nombre, estado por canales).',
    },
    {
      type: 'code',
      sample: {
        title: 'El flujo de una petición de página, de principio a fin',
        lang: 'bash',
        code: `index.html                      # el documento único de la SPA
   │  contiene <app-index id="app-content">
   ▼
startApp({ routes, mainNode })   # Open Cells despierta
   │  crea router + canales
   ▼
routes (src/router/routes.ts)    # el mapa: path + name + component + action
   │  la URL coincide con un path
   ▼
page (web component)             # action hace import() de la página
   │  el componente se define y se monta en #app-content
   ▼
controller (PageController)      # la página obtiene su control remoto
   │  recibe params, conoce onPageEnter / onPageLeave
   ▼
publish / subscribe              # la página habla con el resto del mundo
   │  lee estado, publica estado, navega
   ▼
estado (canales con RxJS)        # el estado vive en canales, no en las páginas`,
      },
    },
    {
      type: 'explain',
      title: 'Cómo trabajan juntas las piezas',
      points: [
        '`index.html` → es el punto de entrada. Carga la hoja de estilos, define el nodo raíz (`app-content`) y el script que arranca todo.',
        '`startApp()` → inicializa el router y los canales, y se queda "escuchando" la URL. A partir de aquí, Open Cells manda.',
        '`routes` → cuando la URL cambia, el router la compara con cada `path`. La primera que coincide gana, y ejecuta su `action` para cargar el código de la página.',
        '`page` → una vez cargado el módulo, el componente de la página está definido y Open Cells lo monta dentro del nodo `mainNode`. La página ya está en pantalla.',
        '`controller` → la página crea su `PageController` al construirse. Ese controller le da acceso a los canales, a la navegación y a los hooks de entrada/salida. También le llegan los `params` de la URL.',
        '`publish / subscribe` → con eso la página lee y escribe el estado. Si dos páginas comparten un canal, una puede publicar y la otra leer, aunque no se conozcan.',
        '`estado` → el estado vive en los canales (objetos RxJS que guardan el último valor). Las páginas solo son "ventanas" que reflejan y actualizan ese estado. Eso es lo que hace que la app sea consistente.',
      ],
    },
    {
      type: 'text',
      title: 'Un ejemplo real recorriendo el flujo',
      text: 'Imagina una app de recetas. El usuario está en la portada (`/`) y pulsa una categoría. La URL cambia a `#!/category/pasta`. El router ve que coincide con la ruta `category`, ejecuta su `action` (carga `category-page`), monta la página y le entrega `params = { category: \'pasta\' }`. La página, en su `onPageEnter`, consulta el canal `categories` (donde la portada publicó la lista) y se suscribe al canal `recipes` para mostrar los platos. Si el usuario guarda una receta como favorita, publica en el canal `liked-recipes`, y la insignia del carrito (suscrita a ese canal) se actualiza sola. Una sola URL, tres componentes coordinados por canales, y ninguno de ellos se conoce entre sí.',
    },
    {
      type: 'demo',
      title: 'Pruébalo: el mapa en vivo de esta app',
      description:
        'Este panel es la prueba de que todo el flujo funciona junts en la aplicación que tienes delante: muestra la ruta actual (router), el contexto de la app (app context) y los eventos de ciclo de vida de las páginas (lifecycle). Todo conectado por canales.',
      component: 'demo-architecture',
      howTo: [
        'Navega entre lecciones y páginas demo mientras observas cómo se actualizan los tres bloques.',
        'El bloque "eventos de ciclo de vida" acumula cada entrada y salida de página registrada por esta app.',
      ],
    },
    {
      type: 'summary',
      points: [
        'El flujo completo: index.html → startApp → routes → page → controller → publish/subscribe → estado.',
        'Cada pieza tiene un solo trabajo; se comunican por contratos pequeños (nombres de rutas y de canales).',
        'El estado vive en los canales; las páginas son ventanas que lo reflejan.',
        'Con esto ya tienes el mapa mental de Open Cells. El resto es práctica: cuanto más construyas, más natural te resultará.',
      ],
    },
  ],
};
