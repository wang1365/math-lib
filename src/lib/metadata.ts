import type { Metadata } from 'next'
import { localPath, siteCopy } from './site-copy'

const sections = {
  home: { en: ['OnlyMath — Find the right math resource for your next step', 'Explore math lessons, videos, courses, and tools organized by topic and learning goal.'], zh: ['OnlyMath — 找到适合自己的数学资源', '按主题和学习目标探索数学课程、视频、练习与工具。'], path: '/' },
  resources: { en: ['Math Learning Resources | OnlyMath', 'Compare math learning resources by topic, format, cost, and the learners they suit.'], zh: ['数学学习资源 | OnlyMath', '按主题、形式和费用比较数学学习资源。'], path: '/resources' },
  branches: { en: ['Math Topics | OnlyMath', 'Explore algebra, geometry, precalculus, calculus, statistics, and linear algebra.'], zh: ['数学主题 | OnlyMath', '探索代数、几何、预备微积分、微积分、统计和线性代数。'], path: '/branches' },
  tools: { en: ['Math Tools | OnlyMath', 'Find a basic calculator, graphing calculator, and interactive geometry tools.'], zh: ['数学工具 | OnlyMath', '查找基础计算器、绘图工具和交互式几何工具。'], path: '/tools' },
  calculator: { en: ['Basic Calculator | OnlyMath', 'A simple calculator for addition, subtraction, multiplication, and division.'], zh: ['基础计算器 | OnlyMath', '支持加减乘除的基础计算器。'], path: '/calculator' },
  examples: { en: ['Math Formula Guides | OnlyMath', 'Learn when to use common formulas with short worked examples.'], zh: ['数学公式指南 | OnlyMath', '通过简短例题理解常见数学公式的使用场景。'], path: '/examples' },
} as const

export type Section = keyof typeof sections

export function pageMetadata(locale: string, section: Section): Metadata {
  const item = sections[section]
  const [title, description] = locale.startsWith('zh') ? item.zh : item.en
  const canonical = localPath(locale, item.path)
  return {
    title, description,
    alternates: { canonical, languages: { en: localPath('en', item.path), 'zh-CN': localPath('zh-CN', item.path) } },
    openGraph: { title, description, url: canonical, siteName: siteCopy(locale).brand, type: 'website', locale: locale.replace('-', '_'), images: [{ url: '/api/og', width: 1200, height: 630, alt: 'OnlyMath math learning resources' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/api/og'] },
  }
}
