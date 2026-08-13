import type { Lesson } from './types';
import { lesson01 } from './lessons/lesson-01';
import { lesson02 } from './lessons/lesson-02';
import { lesson03 } from './lessons/lesson-03';
import { lesson04 } from './lessons/lesson-04';
import { lesson05 } from './lessons/lesson-05';
import { lesson06 } from './lessons/lesson-06';
import { lesson07 } from './lessons/lesson-07';
import { lesson08 } from './lessons/lesson-08';
import { lesson09 } from './lessons/lesson-09';
import { lesson10 } from './lessons/lesson-10';
import { lesson11 } from './lessons/lesson-11';
import { lesson12 } from './lessons/lesson-12';
import { lesson13 } from './lessons/lesson-13';
import { lesson14 } from './lessons/lesson-14';
import { lesson15 } from './lessons/lesson-15';
import { lesson16 } from './lessons/lesson-16';
import { lesson17 } from './lessons/lesson-17';
import { lesson18 } from './lessons/lesson-18';
import { lesson19 } from './lessons/lesson-19';
import { lesson20 } from './lessons/lesson-20';
import { lesson21 } from './lessons/lesson-21';
import { lesson22 } from './lessons/lesson-22';
import { lesson23 } from './lessons/lesson-23';

export const lessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lesson08,
  lesson09,
  lesson10,
  lesson11,
  lesson12,
  lesson13,
  lesson14,
  lesson15,
  lesson16,
  lesson17,
  lesson18,
  lesson19,
  lesson20,
  lesson21,
  lesson22,
  lesson23,
];

export function getLessonById(id: string | undefined): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonByIndex(index: number): Lesson | undefined {
  return lessons.find((l) => l.index === index);
}
