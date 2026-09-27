export const copy = {
  en: {
    brand: 'OnlyMath', home: 'Home', topics: 'Topics', resources: 'Resources', tools: 'Tools', calculator: 'Calculator', examples: 'Formula guides', menu: 'Open menu', closeMenu: 'Close menu', language: 'Language',
    tagline: 'A clearer way to learn math.', footer: 'Independent resource guides for curious learners. Find a useful next step, then get back to learning.', contact: 'Suggest a resource or correction', editorial: 'How we choose resources', editorialText: 'We describe who a resource suits, what it covers, and what to keep in mind. Listings are editorial, and we do not use unexplained star ratings.',
    homeEyebrow: 'A practical math learning guide', homeTitle: 'Find the right math resource for your next step.', homeLead: 'Explore lessons, videos, practice tools, and courses organized by topic and learning goal. See who each resource is best for before you open it.', browse: 'Browse resources', exploreTopics: 'Explore topics', learning: 'What are you learning?', learningLead: 'Start with a topic. Each guide points to the concepts and resources that matter most.', selected: 'Selected resources', selectedLead: 'A few useful places to start, with the tradeoffs made clear.', seeAll: 'See all resources', goals: 'Choose a way in', goalsLead: 'Whether you need practice or a deeper explanation, find a starting point that fits.', goal1: 'Rebuild the basics', goal1Text: 'Review algebra and geometry one concept at a time.', goal2: 'Understand the big idea', goal2Text: 'Use visual explanations to make abstract topics click.', goal3: 'Prepare for college math', goal3Text: 'Move from precalculus into calculus and linear algebra.',
    resourcesTitle: 'Math resources, organized around your goals.', resourcesLead: 'Compare what each resource offers, who it helps, and where it may fall short.', search: 'Search resources', searchPlaceholder: 'Search by name or need', topic: 'Topic', format: 'Format', allTopics: 'All topics', allFormats: 'All formats', clear: 'Clear filters', results: 'resources', noResults: 'No resources match these filters.', bestFor: 'Best for', keepInMind: 'Keep in mind', visit: 'Visit resource', free: 'Free', freePaid: 'Free / paid',
    topicsTitle: 'Explore math by topic.', topicsLead: 'Choose a subject to see a sensible starting point and relevant resources.', startingPoint: 'Where to start', recommended: 'Useful resources', viewResources: 'View matching resources',
    toolsTitle: 'Math tools that help you see and check your work.', toolsLead: 'Use our basic calculator for quick arithmetic, or open a specialist tool for graphing and geometry.', toolReady: 'Available here', toolExternal: 'External tool', openTool: 'Open tool', toolNote: 'We link to third-party tools directly so you know where a feature lives.',
    calcTitle: 'Basic Calculator', calcLead: 'Add, subtract, multiply, and divide. Use your keyboard or the buttons below.', calcError: 'Cannot divide by zero', calcTip: 'This calculator handles basic arithmetic. For graphing, use Desmos or GeoGebra.',
    examplesTitle: 'Math formulas in context.', examplesLead: 'A formula is more useful when you know when to use it. Start with these short explanations and worked examples.',
  },
  zh: {
    brand: 'OnlyMath', home: '首页', topics: '数学主题', resources: '学习资源', tools: '工具', calculator: '计算器', examples: '公式指南', menu: '打开菜单', closeMenu: '关闭菜单', language: '语言',
    tagline: '更清晰地学习数学。', footer: '为学习者整理独立的数学资源指南，帮你找到下一步。', contact: '推荐资源或提交纠错', editorial: '我们如何选择资源', editorialText: '每条资源说明适用对象、内容和局限。推荐基于编辑判断，不使用缺乏说明的星级评分。',
    homeEyebrow: '实用的数学学习指南', homeTitle: '找到适合你下一步的数学资源。', homeLead: '按主题和学习目标探索课程、视频、练习工具。在打开资源前，先了解它适合谁。', browse: '浏览资源', exploreTopics: '探索主题', learning: '你正在学习什么？', learningLead: '从一个主题开始，找到关键概念与对应资源。', selected: '精选资源', selectedLead: '从这些资源开始，并了解各自的优点与限制。', seeAll: '查看全部资源', goals: '选择学习方式', goalsLead: '需要练习或深入讲解，都可以找到起点。', goal1: '补齐基础', goal1Text: '逐个知识点复习代数和几何。', goal2: '理解核心概念', goal2Text: '通过可视化讲解理解抽象知识。', goal3: '准备大学数学', goal3Text: '从预备微积分过渡到微积分和线性代数。',
    resourcesTitle: '按学习目标整理的数学资源。', resourcesLead: '比较资源的内容、适用对象和局限，找到合适的一项。', search: '搜索资源', searchPlaceholder: '按名称或学习需求搜索', topic: '主题', format: '形式', allTopics: '全部主题', allFormats: '全部形式', clear: '清除筛选', results: '项资源', noResults: '没有符合条件的资源。', bestFor: '适合', keepInMind: '需要注意', visit: '访问资源', free: '免费', freePaid: '免费／付费',
    topicsTitle: '按主题探索数学。', topicsLead: '选择一个学科，了解从何入手和可用资源。', startingPoint: '从这里开始', recommended: '可用资源', viewResources: '查看相关资源',
    toolsTitle: '帮助你观察和检查结果的数学工具。', toolsLead: '用站内基础计算器快速计算，或打开专业绘图与几何工具。', toolReady: '站内可用', toolExternal: '外部工具', openTool: '打开工具', toolNote: '第三方工具会直接链接到其官网，便于你了解功能所在。',
    calcTitle: '基础计算器', calcLead: '支持加减乘除，可使用键盘或下方按钮。', calcError: '不能除以零', calcTip: '本计算器只支持基础四则运算。绘图可使用 Desmos 或 GeoGebra。',
    examplesTitle: '结合情境理解数学公式。', examplesLead: '了解公式何时适用，再通过简短示例学习使用。',
  }
} as const

export function siteCopy(locale: string) {
  return locale.startsWith('zh') ? copy.zh : copy.en
}

export function localPath(locale: string, path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return locale === 'en' ? normalized : `/${locale}${normalized === '/' ? '' : normalized}`
}

export function resourceFormat(format: string, locale: string) {
  if (!locale.startsWith('zh')) return format
  return ({ Course: '课程', Video: '视频', Practice: '练习', Tool: '工具' } as Record<string, string>)[format] || format
}

export function resourceLevel(level: string, locale: string) {
  if (!locale.startsWith('zh')) return level
  return ({ Beginner: '入门', Intermediate: '进阶', Advanced: '高级', 'All levels': '各级别' } as Record<string, string>)[level] || level
}
