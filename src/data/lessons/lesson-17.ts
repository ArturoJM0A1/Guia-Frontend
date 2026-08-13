import type { Lesson } from '../types';

export const lesson17: Lesson = {
  id: 'bootstrap',
  index: 16,
  title: 'Bootstrap',
  subtitle: 'Grid, componentes, utilidades y diseño responsive con clases.',
  topic: 'frameworks',
  sections: [
    {
      type: 'intro',
      text: 'Bootstrap es el framework de CSS más usado de la web: una hoja de estilos (y algo de JavaScript para interacciones) que te da diseño listo con solo añadir clases al HTML. No necesitas escribir casi ningún CSS: pones `class="btn btn-primary"` y ya tienes un botón con estilo. En esta lección verás sus 4 pilares: el sistema de grid, los componentes, las utilidades y el diseño responsive.',
    },
    {
      type: 'problem',
      text: 'Escribir CSS desde cero para cada botón, menú, tarjeta o modal de una web es repetitivo y propenso a inconsistencias: cada proyecto termina con su propio "framework" casero de estilos copiado y pegado. Bootstrap responde dándote un sistema completo, probado y consistente: tú solo combinas clases, y el resultado es uniforme y responsive por defecto.',
    },
    {
      type: 'text',
      title: 'Grid system — container, row, col',
      text: 'El grid de Bootstrap divide la pantalla en 12 columnas y construye el layout con tres piezas anidadas: `container` (centra y limita el ancho), `row` (una fila) y `col` (una columna). Con `col-6` ocupas la mitad, con `col-4` un tercio, con `col-12` el ancho completo. Las columnas de una fila suman 12.',
    },
    {
      type: 'code',
      sample: {
        title: 'La estructura básica del grid',
        lang: 'html',
        code: `<div class="container">
  <div class="row">
    <div class="col-4">Un tercio</div>
    <div class="col-4">Un tercio</div>
    <div class="col-4">Un tercio</div>
  </div>
  <div class="row">
    <div class="col-6">Mitad</div>
    <div class="col-6">Mitad</div>
  </div>
</div>

<!-- Sin tamaño: col se reparte a partes iguales -->
<div class="row">
  <div class="col">A</div>
  <div class="col">B</div>
  <div class="col">C</div>
</div>`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`container` → el contenedor: limita el ancho (hasta 1320px en xl) y lo centra. Hay variantes `container-fluid` (ancho completo) y `container-sm/md/lg/xl/xxl` (ancho máx. según breakpoint).',
        '`row` → la fila: pone las columnas una al lado de la otra con el espaciado entre ellas (los "gutters").',
        '`col-4` → columna que ocupa 4 de las 12 fracciones. Las clases `col-1` a `col-12` cubren todas las divisiones.',
        '`col-6` → media fila. Dos `col-6` llenan la fila; el grid reflowa automáticamente.',
        '`col` sin número → se reparte el ancho sobrante a partes iguales entre las columnas de la fila.',
      ],
    },
    {
      type: 'text',
      title: 'Components — botones, navbar, cards, modals, alerts',
      text: 'Bootstrap incluye piezas de UI listas para usar. Las añades al HTML y, en algunos casos (navbar plegable, modals, alerts desechables), Bootstrap JS les da interacción. Así se ven las más comunes:',
    },
    {
      type: 'code',
      sample: {
        title: 'Botones y alert',
        lang: 'html',
        code: `<button class="btn btn-primary">Botón principal</button>
<button class="btn btn-success">Éxito</button>
<button class="btn btn-outline-secondary">Contorno</button>

<div class="alert alert-danger" role="alert">
  ⚠️ Este es un aviso importante.
</div>

<!-- Alert desechable (requiere Bootstrap JS) -->
<div class="alert alert-info alert-dismissible fade show" role="alert">
  Puedes cerrarme con la ×
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>`,
      },
    },
    {
      type: 'code',
      sample: {
        title: 'Card y Modal',
        lang: 'html',
        code: `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Título de la tarjeta</h5>
    <p class="card-text">El contenido de una tarjeta: imagen, texto y acciones.</p>
    <a href="#" class="btn btn-primary">Acción</a>
  </div>
</div>

<!-- El modal se abre con data-bs-toggle (Bootstrap JS) -->
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#miModal">
  Abrir modal
</button>

<div class="modal fade" id="miModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Mi modal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">El contenido del modal.</div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button class="btn btn-primary">Guardar</button>
      </div>
    </div>
  </div>
</div>`,
      },
    },
    {
      type: 'code',
      sample: {
        title: 'Navbar (responsive: se pliega en móvil)',
        lang: 'html',
        code: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Mi App</a>
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="menu">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link active" href="#">Inicio</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Sobre mí</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Contacto</a></li>
      </ul>
    </div>
  </div>
</nav>`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`btn` + modificador de color (`btn-primary`, `btn-success`, `btn-outline-*`) → botones con estilos listos.',
        '`alert alert-*` → avisos con colores semánticos (danger, warning, success, info). Con `alert-dismissible` y `btn-close` se pueden cerrar.',
        '`card` → contenedor de contenido con `card-body`, `card-title` y `card-text`. Solo HTML: las tarjetas no necesitan JS.',
        '`modal` → la ventana flotante: la abre un botón con `data-bs-toggle="modal"` y se compone de header, body y footer.',
        '`navbar navbar-expand-lg` → la barra de navegación: en pantallas menores a `lg` se convierte en un menú plegable (el botón `navbar-toggler`). Ese "lg" ya te está hablando del sistema responsive.',
      ],
    },
    {
      type: 'text',
      title: 'Utilities — d-flex, m-3, p-2, text-center',
      text: 'Las utilidades son clases de una sola propiedad: una por clase, con un nombre corto y un valor. `d-flex` activa flexbox, `m-3` añade margen, `p-2` padding, `text-center` centra el texto. Combinándolas construyes layouts finos sin escribir ni una línea de CSS. El patrón es siempre: `propiedad-prefijo-valor`.',
    },
    {
      type: 'table',
      title: 'Utilidades que vas a usar a diario',
      caption: 'Lectura de las clases: prefijo + breakpoint (opcional) + valor',
      headers: ['Clase', 'Propiedad CSS', 'Valores típicos'],
      rows: [
        ['d-flex', 'display: flex', 'none, block, flex, grid, inline-flex'],
        ['m-3 / mx-2 / mt-4', 'margin (todas / x / top)', '0 a 5 y auto'],
        ['p-2 / px-3 / pb-4', 'padding (todas / x / bottom)', '0 a 5'],
        ['text-center', 'text-align: center', 'start, center, end'],
        ['justify-content-between', 'justify-content: space-between', 'start, center, end, between'],
        ['align-items-center', 'align-items: center', 'start, center, end, stretch'],
        ['gap-2', 'gap (espacio entre hijos flex)', '0 a 5'],
        ['rounded / shadow', 'border-radius / box-shadow', 'rounded-pill, shadow-lg, shadow-sm'],
      ],
    },
    {
      type: 'code',
      sample: {
        title: 'Un layout fino solo con utilidades',
        lang: 'html',
        code: `<div class="d-flex justify-content-between align-items-center p-3">
  <div>
    <h4 class="mb-0">Perfil de Ana</h4>
    <span class="text-secondary">Desarrolladora web</span>
  </div>
  <div class="d-flex gap-2">
    <button class="btn btn-outline-secondary btn-sm">Editar</button>
    <button class="btn btn-danger btn-sm">Borrar</button>
  </div>
</div>

<p class="text-center text-uppercase mt-4">Texto centrado y en mayúsculas</p>

<div class="mx-auto mt-4 p-2 rounded shadow text-center" style="max-width: 300px;">
  Caja centrada con margen automático (mx-auto) y esquinas redondeadas
</div>`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`d-flex justify-content-between align-items-center` → una barra flex: los hijos se reparten entre los extremos y quedan centrados en vertical. Tres clases, cero CSS.',
        '`m-3`, `p-3`, `mt-4`, `mb-0`, `mx-auto` → márgenes y paddings. `mx-auto` centra horizontalmente (autos). La escala 0-5 equivale a .25rem por paso.',
        '`text-center text-uppercase` → alineación y transformación del texto.',
        '`gap-2` → espacio entre los hijos flex sin tocar márgenes.',
        '`rounded shadow` → esquinas redondeadas y sombra: utilidades de "forma".',
        'Regla mental: escribe la propiedad con su inicial (`d`=display, `m`=margin, `p`=padding, `text`=text-align).',
      ],
    },
    {
      type: 'text',
      title: 'Responsive design — sm, md, lg, xl, xxl',
      text: 'Casi todas las clases de Bootstrap se pueden prefijar con un breakpoint: `col-md-6`, `d-none d-md-flex`, `p-lg-4`. La clase base (sin prefijo) aplica siempre; la prefijada aplica desde ese ancho en adelante. Así construyes un layout que cambia según la pantalla sin media queries. Los breakpoints en px: sm ≥576, md ≥768, lg ≥992, xl ≥1200, xxl ≥1400.',
    },
    {
      type: 'table',
      title: 'Los breakpoints de Bootstrap',
      caption: 'Los cinco puntos de corte, de menor a mayor ancho',
      headers: ['Breakpoint', 'Prefijo', 'Ancho mínimo', 'Dispositivo típico'],
      rows: [
        ['Extra small', '(ninguno)', '< 576px', 'Móviles en vertical'],
        ['Small', 'sm', '≥ 576px', 'Móviles grandes en horizontal'],
        ['Medium', 'md', '≥ 768px', 'Tablets'],
        ['Large', 'lg', '≥ 992px', 'Portátiles / tablets grandes'],
        ['Extra large', 'xl', '≥ 1200px', 'Escritorio'],
        ['Extra extra large', 'xxl', '≥ 1400px', 'Pantallas grandes'],
      ],
    },
    {
      type: 'code',
      sample: {
        title: 'El patrón "mobile first": col-12 → col-md-6 → col-xl-3',
        lang: 'html',
        code: `<div class="row">
  <!-- Móvil: 1 columna · Tablet: 2 · Escritorio: 4 -->
  <div class="col-12 col-md-6 col-xl-3">Tarjeta 1</div>
  <div class="col-12 col-md-6 col-xl-3">Tarjeta 2</div>
  <div class="col-12 col-md-6 col-xl-3">Tarjeta 3</div>
  <div class="col-12 col-md-6 col-xl-3">Tarjeta 4</div>
</div>

<!-- Utilidades responsive -->
<div class="d-flex flex-column flex-md-row justify-content-between">
  <!-- En móvil apilado (columna), en md en fila -->
  <span>Izquierda</span>
  <span>Derecha</span>
</div>

<p class="text-center text-lg-start">
  Centrado en móvil, alineado a la izquierda desde lg.
</p>`,
      },
    },
    {
      type: 'explain',
      title: 'Qué está pasando',
      points: [
        '`col-12 col-md-6 col-xl-3` → lee en orden de menor a mayor: siempre ancho completo; desde md, mitad; desde xl, un cuarto. Cuatro tarjetas pasan de 1 a 2 a 4 columnas.',
        'La base (sin prefijo) se aplica SIEMPRE, por eso el diseño empieza por el móvil ("mobile first").',
        '`flex-column flex-md-row` → las utilidades también responden: apilado en móvil, en fila desde md.',
        '`text-center text-lg-start` → un texto que cambia de alineación según el ancho.',
        'Con este patrón no escribes ni una media query: el prefijo ya lleva la condición dentro.',
      ],
    },
    {
      type: 'note',
      text: 'Conexión con Open Cells: Bootstrap es solo CSS y clases; no sabe nada de tu estado ni de tu navegación. En una app con Open Cells puedes usar Bootstrap para el estilo de tus páginas (clases `btn`, `card`, `row`, `col-*`) mientras Open Cells se encarga del routing, los canales y el ciclo de vida. Es la división clásica: Bootstrap viste, Open Cells conduce.',
    },
    {
      type: 'demo',
      title: 'Pruébalo: Bootstrap en vivo',
      description: 'Una demo que simula los 4 pilares de Bootstrap (grid, componentes, utilidades y responsive) construida con Lit. Cambia el "ancho de pantalla" para ver el grid y el menú reaccionar a los breakpoints.',
      component: 'demo-bootstrap',
      howTo: [
        'Usa los botones de breakpoint (sm / md / lg / xl) para "encoger" la pantalla y mira cómo las tarjetas pasan de 4 a 2 a 1 columna.',
        'En la zona de componentes, abre y cierra el modal y cierra la alerta.',
        'Fíjate en los bloques de utilidades: flexbox, márgenes, centrado y sombras, todo con clases.',
        'Abre el menú de la mini navbar en modo móvil: se convierte en un menú plegable.',
      ],
    },
    {
      type: 'summary',
      points: [
        'Grid: `container` > `row` > `col`; 12 columnas por fila (`col-4`, `col-6`...).',
        'Components: botones `btn btn-*`, `navbar`, `card`, `modal`, `alert` — UI lista con clases.',
        'Utilities: `d-flex`, `m-3`, `p-2`, `text-center`, `gap-2` — una propiedad por clase.',
        'Responsive: prefijos `sm md lg xl xxl`; `col-12 col-md-6 col-xl-3` es el patrón mobile-first.',
        'Bootstrap es solo CSS: el estado y el routing (lo de Open Cells) quedan intactos.',
      ],
    },
  ],
};
