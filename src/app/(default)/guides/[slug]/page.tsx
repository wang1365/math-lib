import { notFound } from 'next/navigation'
import GuideLessonContent from '@/app/components/GuideLessonContent'
import { getGuideLesson, guideLessonSlugs } from '@/lib/guideLessons'
import { buildPageMetadata } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() { return guideLessonSlugs.map(slug => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lesson = getGuideLesson('en', slug)
  if (!lesson) notFound()
  return buildPageMetadata({ title: `${lesson.title} | OnlyMath`, description: lesson.summary, path: `/guides/${slug}` })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lesson = getGuideLesson('en', slug)
  if (!lesson) notFound()
  return <GuideLessonContent locale="en" lesson={lesson} />
}
