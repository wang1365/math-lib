import { algebraLesson } from './guideLessons-algebra'
import { calculusLesson } from './guideLessons-calculus'
import type { LessonDiagramId } from './lessonDiagramModels'

export type LessonStep = { text: string; equation?: string }
export type LessonProblem = {
  id: string
  prompt: string
  equation?: string
  answer: string
  explanation: string
  commonMistake: string
  reviewChapterId: string
  diagram?: LessonDiagramId
}
export type LessonSource = {
  title: string
  url: string
  use: string
  language: string
  checkedAt: string
}
export type LessonChapter = {
  id: string
  title: string
  goal: string
  explanation: string[]
  example: {
    title: string
    prompt: string
    equation?: string
    steps: LessonStep[]
    conclusion: string
    diagram?: LessonDiagramId
  }
  pitfall: string
  practice: LessonProblem[]
  checkpoint: string
  sources: LessonSource[]
}
export type GuideLesson = {
  slug: string
  title: string
  summary: string
  level: string
  audience: string
  scope: string
  prerequisites: string[]
  goals: string[]
  studyPlan: string
  diagnosticIntro: string
  diagnostic: LessonProblem[]
  routes: { title: string; when: string; chapterId: string; action: string }[]
  chapters: LessonChapter[]
  masteryIntro: string
  mastery: LessonProblem[]
  masteryRule: string
  nextSteps: { title: string; body: string; href: string; linkLabel: string }[]
  editorialNote: string
}

export type LessonText = (en: string, zh: string) => string
export const guideLessonSlugs = ['algebra-foundations', 'calculus-roadmap'] as const

/** Only these two guides have complete original lessons. Other guides remain on the index. */
export function getGuideLesson(locale: string, slug: string): GuideLesson | undefined {
  const t: LessonText = (en, zh) => locale === 'zh-CN' ? zh : en
  if (slug === 'algebra-foundations') return algebraLesson(t)
  if (slug === 'calculus-roadmap') return calculusLesson(t)
  return undefined
}
