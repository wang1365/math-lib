export type Guide = {
  slug: string
  hasLesson?: boolean
  title: string
  summary: string
  level: string
  resourceIds: string[]
  sections: {
    heading: string
    body: string[]
  }[]
}

const zhGuides: Guide[] = [
  {
    slug: 'calculus-roadmap',
    hasLesson: true,
    title: '微积分自学路线：从函数到积分应用',
    summary: '包含准备度自测、分步例题、练习与答案解析的四章原创单元，串联极限、导数和积分。',
    level: '入门到中级',
    resourceIds: ['openstax-precalculus', '3b1b', 'pauls-notes', 'openstax-calculus'],
    sections: [
      {
        heading: '先补齐函数语言',
        body: [
          '微积分不是从求导公式开始，而是从函数、图像、变化率和极限语言开始。学习前应能熟练理解一次函数、二次函数、指数函数、对数函数和三角函数的图像。',
          '建议先用 Desmos 观察函数变换：平移、伸缩、复合和反函数。这一步能降低后面理解导数和积分时的抽象成本。'
        ]
      },
      {
        heading: '先建立极限、导数与积分的联系',
        body: [
          '极限描述“靠近”的趋势，导数描述瞬时变化，积分描述累积。先掌握这些基础，再在后续阶段学习级数。',
          '每学一个计算规则，都要配一个图像解释和一个实际例子，例如速度、面积、边际成本或概率密度。'
        ]
      },
      {
        heading: '推荐练习方式',
        body: [
          '不要只刷机械题。每个主题至少做三类题：概念判断、标准计算、应用建模。',
          '如果题目做错，记录错误属于代数变形、概念误解还是符号使用问题，这比单纯增加题量更有效。'
        ]
      }
    ]
  },
  {
    slug: 'linear-algebra-roadmap',
    title: '线性代数学习路线：矩阵计算背后的结构',
    summary: '从向量、矩阵到线性变换，帮助学习者把计算步骤和几何意义连接起来。',
    level: '大学基础',
    resourceIds: ['3b1b', 'libretexts-linear', 'mit'],
    sections: [
      {
        heading: '把矩阵看作变换',
        body: [
          '线性代数的关键不是记住行列式公式，而是理解矩阵如何移动、拉伸、旋转或压缩空间。',
          '学习矩阵乘法时，可以把每个矩阵理解成一次线性变换，矩阵相乘就是连续做两次变换。'
        ]
      },
      {
        heading: '核心概念顺序',
        body: [
          '建议按向量与线性组合、矩阵乘法、线性方程组、基与维数、行列式、特征值与特征向量的顺序学习。',
          '每个概念都应同时掌握三种视角：代数计算、几何解释、应用场景。'
        ]
      },
      {
        heading: '常见误区',
        body: [
          '不要把行列式只当成公式，它描述面积或体积的缩放比例。',
          '不要把特征值只当成解方程，它描述某些方向在变换后仍保持方向不变。'
        ]
      }
    ]
  },
  {
    slug: 'choosing-math-resources',
    title: '如何选择数学学习资源：课程、视频、教材和工具的搭配',
    summary: '给自学者的资源选择框架，避免在大量数学资源中反复切换却没有稳定进展。',
    level: '所有阶段',
    resourceIds: ['khan', 'openstax-algebra', 'merlot'],
    sections: [
      {
        heading: '先确定学习目标',
        body: [
          '同一个数学主题可以服务于考试、科研、工程应用或兴趣探索。目标不同，资源选择也不同。',
          '考试目标更需要体系化教材和题目反馈；兴趣探索可以先看可视化视频；工程应用则要尽快结合工具和项目。'
        ]
      },
      {
        heading: '搭配主线与补充资源',
        body: [
          '先选一本教材或一门课程作为主线。每学完一个小节，做题检验理解；卡住时再找视频、图像或工具补充解释。',
          '视频适合理解动机和图像，教材适合建立严谨结构，练习用于暴露漏洞，工具用于验证猜想。'
        ]
      },
      {
        heading: '判断资源质量',
        body: [
          '好的资源会解释概念为什么成立，而不只是列出步骤。',
          '如果一个资源没有例题、练习、前置知识说明或错误纠正路径，它更适合作为补充材料，而不是主线课程。'
        ]
      }
    ]
  },
  {
    slug: 'algebra-foundations', hasLesson: true, title: '代数基础补习路线：从方程到函数', summary: '通过诊断题定位薄弱环节，用四章原创讲解、例题与答案解析巩固方程、图像和函数。', level: '高中基础',
    resourceIds: ['khan', 'ck12-flexmath', 'math-is-fun', 'openstax-algebra'],
    sections: [
      { heading: '先找出真正卡住的环节', body: ['用几个方程与图像题检查负数运算、分数、比例和一次方程。若这些步骤不稳，先回到对应小节练习。', '做题时记录错误原因：计算、符号、建立方程，还是无法解释图像。针对原因补习比从头重看整门课更有效。'] },
      { heading: '按方程、图像、函数推进', body: ['先练一次方程和不等式，再把解与数轴、坐标图联系起来。接着学习斜率、截距与函数符号。', '能够用文字解释直线斜率与截距后，再进入二次函数、多项式和指数函数。每个新主题都画图并尝试解释图像变化。'] },
      { heading: '每周做一次迁移检查', body: ['不要只做重复题。尝试用同一个概念解一道文字题、一张图像题和一道符号计算题。', '如果三种表达方式不能互相转换，先继续巩固当前主题，再进入下一章。'] },
    ],
  },
  {
    slug: 'statistics-foundations', title: '统计学入门路线：从数据到推断', summary: '先学如何阅读数据，再逐步理解概率、抽样和统计结论。', level: '高中到大学入门',
    resourceIds: ['openstax-statistics', 'openintro-statistics', 'statquest', 'mathigon-polypad'],
    sections: [
      { heading: '先描述数据，不急着做检验', body: ['从数据来源、变量类型、图表和分布开始。解释中位数、均值与离群值分别告诉了你什么。', '遇到一个图表时，先问样本来自哪里、坐标轴如何设置、是否遗漏了重要分组。'] },
      { heading: '把概率和抽样连起来', body: ['用简单试验理解条件概率和独立性，再比较总体、样本与抽样误差。', '在计算置信区间或 p 值前，先用自己的话说清楚问题、假设和数据是如何收集的。'] },
      { heading: '用真实问题检查结论', body: ['每学一个方法，找一个小数据集，写下计算结果、它支持的结论及其局限。', '特别注意相关不等于因果，统计显著性也不自动代表实际影响很大。'] },
    ],
  }
]

const enGuides: Guide[] = [
  {
    slug: 'calculus-roadmap',
    hasLesson: true,
    title: 'A Calculus Roadmap: From Functions to Applications',
    summary: 'An original four-chapter unit with a readiness check, worked examples, practice, and explained answers on limits, derivatives, and integrals.',
    level: 'Beginner to intermediate',
    resourceIds: ['openstax-precalculus', '3b1b', 'pauls-notes', 'openstax-calculus'],
    sections: [
      {
        heading: 'Start with the language of functions',
        body: [
          'Calculus does not start with derivative rules. It starts with functions, graphs, rates of change, and limits.',
          'Before learning derivatives, make sure you can read linear, quadratic, exponential, logarithmic, and trigonometric graphs.'
        ]
      },
      {
        heading: 'Build limits, derivatives, and integrals first',
        body: [
          'Limits describe approaching behavior, derivatives describe instantaneous change, and integrals describe accumulation. Study series later, after these foundations are secure.',
          'Pair every rule with a graph and an application such as velocity, area, marginal cost, or probability density.'
        ]
      },
      {
        heading: 'Practice deliberately',
        body: [
          'For each topic, solve concept questions, standard computations, and applied modeling problems.',
          'When you miss a problem, record whether the error came from algebra, concept confusion, or notation.'
        ]
      }
    ]
  },
  {
    slug: 'linear-algebra-roadmap',
    title: 'A Linear Algebra Roadmap: Structure Behind Matrix Computation',
    summary: 'A guide to connect vectors, matrices, systems, determinants, and eigenvectors with geometric meaning.',
    level: 'College foundation',
    resourceIds: ['3b1b', 'libretexts-linear', 'mit'],
    sections: [
      {
        heading: 'See matrices as transformations',
        body: [
          'The central idea is not memorizing determinant formulas, but seeing how matrices move, stretch, rotate, or compress space.',
          'Matrix multiplication is best understood as applying one linear transformation after another.'
        ]
      },
      {
        heading: 'Recommended concept order',
        body: [
          'Study vectors and linear combinations, matrix multiplication, linear systems, bases and dimension, determinants, then eigenvalues and eigenvectors.',
          'For every concept, keep three views connected: algebraic computation, geometric interpretation, and application.'
        ]
      },
      {
        heading: 'Common traps',
        body: [
          'A determinant is not only a formula; it measures area or volume scaling.',
          'An eigenvector is not only a solution artifact; it is a direction that stays on the same line after transformation.'
        ]
      }
    ]
  },
  {
    slug: 'choosing-math-resources',
    title: 'How to Choose Math Learning Resources',
    summary: 'A framework for combining courses, videos, textbooks, exercises, and tools without constantly switching resources.',
    level: 'All levels',
    resourceIds: ['khan', 'openstax-algebra', 'merlot'],
    sections: [
      {
        heading: 'Define the goal first',
        body: [
          'The same topic can serve exams, research, engineering, or curiosity. The goal changes the best resource choice.',
          'Exam goals need structured courses and feedback; exploration benefits from visual videos; applied goals need tools and projects sooner.'
        ]
      },
      {
        heading: 'Choose a main path and supporting tools',
        body: [
          'Choose one textbook or course as your main path. Try problems after each small section, then use a video, diagram, or tool when you need another explanation.',
          'Videos explain motivation, textbooks build structure, exercises expose gaps, and tools help test conjectures.'
        ]
      },
      {
        heading: 'Evaluate quality',
        body: [
          'Strong resources explain why ideas work, not only what steps to follow.',
          'If a resource lacks examples, exercises, prerequisites, or error-correction paths, treat it as a supplement rather than the main path.'
        ]
      }
    ]
  },
  {
    slug: 'algebra-foundations', hasLesson: true, title: 'Rebuild Algebra: From Equations to Functions', summary: 'An original four-chapter unit that diagnoses gaps, explains equations and functions, and checks understanding with practice and worked answers.', level: 'High school foundation',
    resourceIds: ['khan', 'ck12-flexmath', 'math-is-fun', 'openstax-algebra'],
    sections: [
      { heading: 'Find the actual gap first', body: ['Use a few equation and graph questions to check signed numbers, fractions, ratios, and linear equations. If one step is shaky, practice that step before moving on.', 'Record whether each mistake came from arithmetic, notation, translating words into an equation, or reading a graph. A targeted review is usually more useful than replaying an entire course.'] },
      { heading: 'Move from equations to graphs to functions', body: ['Practice linear equations and inequalities, then connect solutions to number lines and coordinate graphs. Next, learn slope, intercepts, and function notation.', 'Once you can explain slope and intercepts in words, move to quadratics, polynomials, and exponentials. Sketch each new family and describe how its graph changes.'] },
      { heading: 'Check transfer each week', body: ['Use the same idea in a word problem, a graph question, and a symbolic calculation instead of repeating only one exercise type.', 'If you cannot move between those representations, strengthen the current topic before opening the next chapter.'] },
    ],
  },
  {
    slug: 'statistics-foundations', title: 'Start Statistics: From Data to Inference', summary: 'Learn to read data before moving into probability, sampling, and statistical claims.', level: 'High school to college',
    resourceIds: ['openstax-statistics', 'openintro-statistics', 'statquest', 'mathigon-polypad'],
    sections: [
      { heading: 'Describe data before testing claims', body: ['Begin with data sources, variable types, graphs, and distributions. Explain what a mean, median, and outlier each tell you.', 'For any chart, ask where the sample came from, how the axes were drawn, and whether important groups were omitted.'] },
      { heading: 'Connect probability to sampling', body: ['Use simple experiments to understand conditional probability and independence, then distinguish a population from a sample and sampling error.', 'Before computing a confidence interval or p-value, state the question, the assumptions, and how the data were collected in plain language.'] },
      { heading: 'Use a real question to check the conclusion', body: ['With each new method, use a small data set and write down the result, what it supports, and what it cannot establish.', 'Keep correlation separate from causation, and distinguish statistical significance from practical importance.'] },
    ],
  }
]

export function getGuides(locale: string) {
  return locale === 'zh-CN' || locale === 'zh-TW' ? zhGuides : enGuides
}
