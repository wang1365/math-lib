import { notFound } from 'next/navigation'
import GuideLessonContent from '@/app/components/GuideLessonContent'
import { getGuideLesson, guideLessonSlugs } from '@/lib/guideLessons'
import { buildPageMetadata } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() { return guideLessonSlugs.map(slug => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const lesson = getGuideLesson(locale, slug)
  if (!lesson) notFound()
  return buildPageMetadata({ title: `${lesson.title} | OnlyMath`, description: lesson.summary, locale, path: `/guides/${slug}` })
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const lesson = getGuideLesson(locale, slug)
  if (!lesson) notFound()
  return <GuideLessonContent locale={locale} lesson={lesson} />
}
