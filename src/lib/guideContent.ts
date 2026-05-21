export type Guide = {
  slug: string
  title: string
  summary: string
  level: string
  sections: {
    heading: string
    body: string[]
  }[]
}

const zhGuides: Guide[] = [
  {
    slug: 'calculus-roadmap',
    title: '微积分自学路线：从函数到积分应用',
    summary: '一条适合高中后到大学初学者的微积分学习路线，强调概念、计算和应用的顺序。',
    level: '入门到中级',
    sections: [
      {
        heading: '先补齐函数语言',
        body: [
          '微积分不是从求导公式开始，而是从函数、图像、变化率和极限语言开始。学习前应能熟练理解一次函数、二次函数、指数函数、对数函数和三角函数的图像。',
          '建议先用 Desmos 观察函数变换：平移、伸缩、复合和反函数。这一步能降低后面理解导数和积分时的抽象成本。'
        ]
      },
      {
        heading: '按“极限-导数-积分-级数”推进',
        body: [
          '极限解决“靠近”的语言，导数解决瞬时变化，积分解决累积，级数解决用无限过程近似函数。',
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
    sections: [
      {
        heading: '先确定学习目标',
        body: [
          '同一个数学主题可以服务于考试、科研、工程应用或兴趣探索。目标不同，资源选择也不同。',
          '考试目标更需要体系化教材和题目反馈；兴趣探索可以先看可视化视频；工程应用则要尽快结合工具和项目。'
        ]
      },
      {
        heading: '资源搭配比例',
        body: [
          '建议采用“教材或课程 50%，练习 30%，可视化和工具 20%”的比例。',
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
  }
]

const enGuides: Guide[] = [
  {
    slug: 'calculus-roadmap',
    title: 'A Calculus Roadmap: From Functions to Applications',
    summary: 'A practical sequence for first-time calculus learners, connecting concepts, computation, and applications.',
    level: 'Beginner to intermediate',
    sections: [
      {
        heading: 'Start with the language of functions',
        body: [
          'Calculus does not start with derivative rules. It starts with functions, graphs, rates of change, and limits.',
          'Before learning derivatives, make sure you can read linear, quadratic, exponential, logarithmic, and trigonometric graphs.'
        ]
      },
      {
        heading: 'Use the sequence limits, derivatives, integrals, series',
        body: [
          'Limits describe approaching behavior, derivatives describe instantaneous change, integrals describe accumulation, and series describe infinite approximation.',
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
    sections: [
      {
        heading: 'Define the goal first',
        body: [
          'The same topic can serve exams, research, engineering, or curiosity. The goal changes the best resource choice.',
          'Exam goals need structured courses and feedback; exploration benefits from visual videos; applied goals need tools and projects sooner.'
        ]
      },
      {
        heading: 'Use a balanced resource mix',
        body: [
          'A useful split is 50% textbook or course, 30% exercises, and 20% visualization or tools.',
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
  }
]

export function getGuides(locale: string) {
  return locale === 'zh-CN' || locale === 'zh-TW' ? zhGuides : enGuides
}
