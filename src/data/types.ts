export interface CodeSample {
  /** Título corto que describe qué hace este trozo de código */
  title: string;
  /** Lenguaje: 'ts' | 'js' | 'html' | 'css' | 'bash' */
  lang: string;
  /** El código real */
  code: string;
}

export type LessonSection =
  | {
      type: 'intro';
      title?: string;
      /** Texto en formato sencillo (se renderiza como párrafo) */
      text: string;
    }
  | {
      type: 'problem';
      /** "¿Qué problema resuelve?" */
      text: string;
    }
  | {
      type: 'text';
      title?: string;
      text: string;
    }
  | {
      type: 'code';
      sample: CodeSample;
    }
  | {
      type: 'explain';
      title?: string;
      /** Explicación del código, punto por punto, en lenguaje sencillo */
      points: string[];
    }
  | {
      type: 'table';
      title?: string;
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: 'demo';
      title: string;
      description: string;
      /** Tag name del componente web que se renderiza como demo */
      component: string;
      /** Instrucciones para usar la demo */
      howTo?: string[];
    }
  | {
      type: 'note';
      text: string;
    }
  | {
      type: 'summary';
      /** Resumen final en puntos */
      points: string[];
    };

export type LessonTopic = 'opencells' | 'plataforma' | 'frameworks';

export interface Lesson {
  /** Identificador usado en la URL (/lesson/:lessonId) */
  id: string;
  /** Posición en el curso (0 basado) */
  index: number;
  title: string;
  subtitle: string;
  /** Grupo del menú: núcleo de Open Cells, plataforma web u otros frameworks */
  topic: LessonTopic;
  sections: LessonSection[];
}
