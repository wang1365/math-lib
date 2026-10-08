import type { Metadata } from 'next'
import { buildPageMetadata } from './seo'

const sections = {
  home: { en: ['OnlyMath — Find the right math resource for your next step', 'Explore math lessons, videos, courses, and tools organized by topic and learning goal.'], zh: ['OnlyMath — 找到适合自己的数学资源', '按主题和学习目标探索数学课程、视频、练习与工具。'], path: '/' },
  resources: { en: ['Math Learning Resources | OnlyMath', 'Compare math learning resources by topic, format, cost, and the learners they suit.'], zh: ['数学学习资源 | OnlyMath', '按主题、形式和费用比较数学学习资源。'], path: '/resources' },
  branches: { en: ['Math Topics | OnlyMath', 'Explore algebra, geometry, precalculus, calculus, statistics, and linear algebra.'], zh: ['数学主题 | OnlyMath', '探索代数、几何、预备微积分、微积分、统计和线性代数。'], path: '/branches' },
  tools: { en: ['Math Tools | OnlyMath', 'Find a basic calculator, graphing calculator, and interactive geometry tools.'], zh: ['数学工具 | OnlyMath', '查找基础计算器、绘图工具和交互式几何工具。'], path: '/tools' },
  calculator: { en: ['Basic Calculator | OnlyMath', 'A simple calculator for addition, subtraction, multiplication, and division.'], zh: ['基础计算器 | OnlyMath', '支持加减乘除的基础计算器。'], path: '/calculator' },
  examples: { en: ['Math Formula Guides | OnlyMath', 'Understand the Pythagorean theorem, quadratic formula, and power rule with derivations, worked examples, pitfalls, and nine practice questions with answers.'], zh: ['数学公式指南 | OnlyMath', '通过推导、分步例题、常见误区及九道附解析练习，理解勾股定理、二次方程求根公式和幂函数求导法则。'], path: '/examples' },
  guides: { en: ['Math Learning Guides | OnlyMath', 'Start with an algebra or calculus diagnostic, learn through worked examples, and check your progress with original exercises and explained answers.'], zh: ['数学学习指南 | OnlyMath', '从代数或微积分诊断题出发，通过分步例题学习，再用原创练习与答案解析检查掌握程度。'], path: '/guides' },
} as const

export type Section = keyof typeof sections

export function pageMetadata(locale: string, section: Section): Metadata {
  const item = sections[section]
  const [title, description] = locale.startsWith('zh') ? item.zh : item.en
  return buildPageMetadata({ title, description, locale, path: item.path })
}
