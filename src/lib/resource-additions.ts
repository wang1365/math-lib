import type { Resource } from './catalog'

// Editorial summaries are original. Links lead to the provider or collection owner.
// checkedAt records when the provider's description and access model were reviewed.
export const additionalResources: Resource[] = [
  {
    id: 'openstax-algebra', name: 'OpenStax College Algebra 2e', url: 'https://openstax.org/books/college-algebra-2e/pages/preface', format: 'Textbook', cost: 'Free', level: 'Intermediate', topics: ['algebra', 'precalculus'],
    summary: 'A chapter-based algebra text with examples and exercises on equations, functions, and graphs.', summaryZh: '按章节学习方程、函数与图像，配有例题和练习。',
    bestFor: 'Learners who want a stable reference alongside a class or self-study plan.', bestForZh: '需要配合课堂或自学计划使用系统教材的学习者。',
    caveat: 'Starts at college algebra; review earlier algebra skills first if needed.', caveatZh: '从大学代数切入；基础薄弱时应先补早期代数。', checkedAt: '2026-09-27',
  },
  {
    id: 'openstax-precalculus', name: 'OpenStax Precalculus 2e', url: 'https://openstax.org/books/precalculus-2e/pages/1-1-functions-and-function-notation', format: 'Textbook', cost: 'Free', level: 'Intermediate', topics: ['precalculus', 'algebra'],
    summary: 'A structured text beginning with functions and extending into the preparation needed for calculus.', summaryZh: '从函数出发，系统学习进入微积分前需要的知识。',
    bestFor: 'Following a full precalculus sequence with written examples and exercises.', bestForZh: '希望结合文字例题与练习完整学习预备微积分的人。',
    caveat: 'The full book is substantial; match chapters to the gaps you actually have.', caveatZh: '全书篇幅较大，建议按自身薄弱点选择章节。', checkedAt: '2026-09-27',
  },
  {
    id: 'openstax-calculus', name: 'OpenStax Calculus Volume 1', url: 'https://openstax.org/books/calculus-volume-1/pages/preface', format: 'Textbook', cost: 'Free', level: 'Intermediate', topics: ['calculus'],
    summary: 'A first calculus text covering functions, limits, derivatives, and integration.', summaryZh: '覆盖函数、极限、导数和积分的第一册微积分教材。',
    bestFor: 'Reading a complete explanation after an introductory video or lecture.', bestForZh: '听完入门讲解后，需要系统阅读和练习的人。',
    caveat: 'Comfort with algebra and trigonometry makes the early chapters much easier.', caveatZh: '先掌握代数和三角函数，前几章会更容易。', checkedAt: '2026-09-27',
  },
  {
    id: 'openstax-statistics', name: 'OpenStax Introductory Statistics 2e', url: 'https://openstax.org/books/introductory-statistics-2e/pages/preface', format: 'Textbook', cost: 'Free', level: 'Beginner', topics: ['statistics'],
    summary: 'An introductory statistics text with data, probability, inference, and practice.', summaryZh: '从数据、概率到统计推断，提供完整入门内容与练习。',
    bestFor: 'A course-like reference when learning statistics for the first time.', bestForZh: '首次学习统计学，需要类似课程教材结构的人。',
    caveat: 'Work through the examples; reading definitions alone will not build interpretation skills.', caveatZh: '需要动手做例题，仅阅读定义难以形成解释数据的能力。', checkedAt: '2026-09-27',
  },
  {
    id: 'ck12-flexmath', name: 'CK-12 FlexMath', url: 'https://flexmath.ck12.org/', format: 'Practice', cost: 'Free', level: 'Beginner', topics: ['algebra', 'geometry', 'precalculus', 'statistics'],
    summary: 'Concept-focused school math lessons organized across algebra, geometry, and more.', summaryZh: '按知识点组织的学校数学内容，覆盖代数、几何等主题。',
    bestFor: 'Reviewing one school-level concept before moving to harder exercises.', bestForZh: '先复习单个学校数学知识点，再做更难的练习。',
    caveat: 'The broad catalog requires you to choose a specific concept to stay focused.', caveatZh: '目录范围较广，建议先确定具体知识点。', checkedAt: '2026-09-27',
  },
  {
    id: 'pauls-notes', name: "Paul's Online Math Notes", url: 'https://tutorial.math.lamar.edu/', format: 'Notes', cost: 'Free', level: 'Intermediate', topics: ['algebra', 'precalculus', 'calculus'],
    summary: 'Free lecture-style notes with worked examples and practice for algebra and calculus.', summaryZh: '免费的代数与微积分讲义，包含例题和练习。',
    bestFor: 'Checking a specific method or working through a solution step by step.', bestForZh: '查阅具体方法，或逐步跟做例题。',
    caveat: 'Calculus notes assume working algebra and trigonometry knowledge.', caveatZh: '微积分部分预设读者已掌握代数和三角函数。', checkedAt: '2026-09-27',
  },
  {
    id: 'statquest', name: 'StatQuest Video Index', url: 'https://statquest.org/video_index.html', format: 'Video', cost: 'Free', level: 'Intermediate', topics: ['statistics'],
    summary: 'Short visual explanations of statistics, probability, regression, and related ideas.', summaryZh: '用视频解释统计、概率、回归等概念。',
    bestFor: 'Getting intuition before returning to textbook examples and data exercises.', bestForZh: '先建立直觉，再回到教材例题和数据练习。',
    caveat: 'The index spans advanced topics; start with Statistics Fundamentals.', caveatZh: '索引包含较高级主题，建议从统计基础开始。', checkedAt: '2026-09-27',
  },
  {
    id: 'mathigon-polypad', name: 'Mathigon Polypad', url: 'https://polypad.amplify.com/p', format: 'Tool', cost: 'Free', level: 'All levels', topics: ['geometry', 'algebra', 'statistics'],
    summary: 'A digital canvas with shapes, tiles, graphing, and other math manipulatives.', summaryZh: '可操作图形、数字卡片和图表的交互式数学画布。',
    bestFor: 'Testing a geometric or algebraic idea by moving objects yourself.', bestForZh: '通过拖动对象探索几何或代数关系。',
    caveat: 'Exploration helps intuition; write out the mathematical argument separately.', caveatZh: '交互有助于直觉，仍应独立写出数学论证。', checkedAt: '2026-09-27',
  },
  {
    id: 'openintro-statistics', name: 'OpenIntro Statistics', url: 'https://www.openintro.org/book/os/', format: 'Textbook', cost: 'Free', level: 'Beginner', topics: ['statistics'],
    summary: 'An introductory statistics book with supporting videos and learning materials.', summaryZh: '统计学入门教材，配有视频和辅助学习资料。',
    bestFor: 'Learning statistical reasoning with a full text and companion material.', bestForZh: '结合完整教材与辅助资料学习统计推理。',
    caveat: 'The PDF is free; printed copies and some optional materials may cost extra.', caveatZh: 'PDF 免费；纸质版及部分可选资料可能收费。', checkedAt: '2026-09-27',
  },
  {
    id: 'libretexts-linear', name: 'LibreTexts Linear Algebra Bookshelf', url: 'https://math.libretexts.org/Bookshelves/Linear_Algebra', format: 'Collection', cost: 'Free', level: 'Intermediate', topics: ['linear-algebra'],
    summary: 'A collection of open linear algebra texts and supplementary modules.', summaryZh: '汇集开放的线性代数教材与补充模块。',
    bestFor: 'Comparing explanations of the same concept across several texts.', bestForZh: '比较不同教材对同一线性代数概念的讲法。',
    caveat: 'Individual books differ in notation, difficulty, and reuse license.', caveatZh: '各教材的符号、难度和再利用许可可能不同。', checkedAt: '2026-09-27',
  },
  {
    id: 'aops-alcumus', name: 'AoPS Alcumus', url: 'https://artofproblemsolving.com/alcumus', format: 'Practice', cost: 'Free', level: 'Advanced', topics: ['algebra', 'geometry', 'precalculus', 'statistics'],
    summary: 'Adaptive problems across algebra, geometry, counting, and probability.', summaryZh: '涵盖代数、几何、计数与概率的自适应题目。',
    bestFor: 'Strong school-math learners who want challenging nonroutine practice.', bestForZh: '基础扎实、想练习更具挑战性题目的中学生。',
    caveat: 'Problems can be much harder than a standard class exercise; an account may be needed to track progress.', caveatZh: '题目可能远难于常规课堂练习；记录进度可能需要账户。', checkedAt: '2026-09-27',
  },
  {
    id: 'math-is-fun', name: 'Math Is Fun: Algebra', url: 'https://www.mathsisfun.com/algebra/', format: 'Notes', cost: 'Free', level: 'Beginner', topics: ['algebra', 'precalculus'],
    summary: 'Short illustrated explanations of school algebra, from basic notation to functions.', summaryZh: '用简短图文解释学校代数，从符号基础延伸到函数。',
    bestFor: 'A quick plain-language explanation before trying a practice set.', bestForZh: '做练习前快速阅读通俗解释。',
    caveat: 'It is a topic index rather than a paced course; choose a specific lesson.', caveatZh: '这是主题索引而非按进度安排的课程，建议挑选具体章节。', checkedAt: '2026-09-27',
  },
  {
    id: 'merlot', name: 'MERLOT', url: 'https://www.merlot.org/merlot/', format: 'Collection', cost: 'Free / paid', level: 'All levels', topics: ['algebra', 'geometry', 'precalculus', 'calculus', 'statistics', 'linear-algebra'],
    summary: 'An educator-led catalog of learning materials with search and discipline filters.', summaryZh: '由教育者维护的学习资料目录，可按学科检索。',
    bestFor: 'Discovering specialized activities or teaching material beyond a standard course.', bestForZh: '查找标准课程之外的专题活动或教学资料。',
    caveat: 'It indexes external resources; access terms and quality vary at the destination.', caveatZh: '条目指向外部资源，访问条件与质量因目标站点而异。', checkedAt: '2026-09-27',
  },
]
