/**
 * Editorial comparison of specific public offerings, not a first-hand course review.
 * Dates belong to this review only; do not reuse them for unreviewed catalog entries.
 * Source and access notes are recorded in docs/resource-sourcing.md.
 */
export const comparisonReviewedAt = '2026-10-08'

type Bilingual = { en: string; zh: string }
type Source = { label: Bilingual; url: string }
type ComparisonEntry = {
  id: string
  name: Bilingual
  stage: Bilingual
  bestFor: Bilingual
  prerequisites: Bilingual
  structure: Bilingual
  practice: Bilingual
  feedback: Bilingual
  access: Bilingual
  nextStep: Bilingual
  start: Source
  sources: Source[]
}

const entries: ComparisonEntry[] = [
  {
    id: 'khan-algebra-1',
    name: { en: 'Khan Academy Algebra 1', zh: 'Khan Academy 代数 1' },
    stage: { en: 'Build your algebra foundation', zh: '补好代数基础' },
    bestFor: { en: 'Choose this if short lessons and scored practice help you keep going.', zh: '适合喜欢短课、希望通过练习评分了解进度的人。' },
    prerequisites: { en: 'Our starting recommendation: be able to work with fractions and negative numbers. If these are still difficult, review arithmetic before the equation units.', zh: '本站建议：先能计算分数和负数；如果这些仍有困难，进入方程单元前先复习算术。' },
    structure: { en: 'Videos and articles organized into units, from expressions and linear equations to functions, exponents, and quadratics. This course does not teach derivatives.', zh: '按单元组织视频和文章，从代数式、一次方程进阶到函数、指数和二次方程。本课程不讲导数。' },
    practice: { en: 'Skill exercises, quizzes, unit tests, and a course challenge. Use the assessments to find gaps rather than only watching videos.', zh: '有知识点练习、测验、单元测试和课程挑战。建议用测评寻找薄弱点，不要只看视频。' },
    feedback: { en: 'Answer-based scoring and skill-mastery levels; practice includes hints. This is automated feedback, not a teacher reviewing your written reasoning.', zh: '按答案评分并显示知识点掌握程度，练习提供提示。属于自动反馈，不是老师批改书面推理。' },
    access: { en: 'Core lessons and practice are free. An account saves progress. Optional Khanmigo tutoring has separate access and subscription terms; it is not needed for this path.', zh: '基础课程和练习免费，账户用于保存进度。可选的 Khanmigo 辅导有独立的访问与订阅条件，本路径无需使用。' },
    nextStep: { en: 'Start with Algebra foundations, then Solving equations & inequalities. Continue to functions and quadratics before filling precalculus gaps.', zh: '先学“代数基础”，再学“方程与不等式”。之后学习函数、二次方程，再补齐预备微积分知识。' },
    start: { label: { en: 'Open Algebra foundations', zh: '打开代数基础单元' }, url: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:foundation-algebra' },
    sources: [
      { label: { en: 'Algebra 1 course and unit list', zh: '代数 1 课程与单元目录' }, url: 'https://www.khanacademy.org/math/algebra' },
      { label: { en: 'How mastery levels work', zh: '掌握程度的评分方式' }, url: 'https://support.khanacademy.org/hc/en-us/articles/5548760867853--How-do-Khan-Academy-s-Mastery-levels-work' },
      { label: { en: 'Algebra practice and hint design', zh: '代数练习与提示设计说明' }, url: 'https://support.khanacademy.org/hc/en-us/articles/360030697472-Content-Updates-Math-Special-Edition-July-2019' },
      { label: { en: 'Free access and account features', zh: '免费访问与账户功能' }, url: 'https://support.khanacademy.org/hc/en-us/articles/202487450-How-do-I-set-up-a-new-user-account' },
      { label: { en: 'Separate Khanmigo access terms', zh: 'Khanmigo 独立访问条件' }, url: 'https://support.khanacademy.org/hc/en-us/articles/14583967053069-Why-do-I-need-to-pay-to-use-Khanmigo' },
    ],
  },
  {
    id: 'openstax-elementary-algebra',
    name: { en: 'OpenStax Elementary Algebra 2e', zh: 'OpenStax《初等代数》第 2 版' },
    stage: { en: 'Build your algebra foundation', zh: '补好代数基础' },
    bestFor: { en: 'Choose this if you want small written steps and room to work on paper.', zh: '适合希望阅读细分步骤、用纸笔慢慢练习的人。' },
    prerequisites: { en: 'Builds on prealgebra; Chapter 1 reviews whole numbers, integers, fractions, and decimals. Use the section readiness questions to decide what to revisit.', zh: '以预代数为基础，第 1 章复习自然数、整数、分数和小数。可通过各节的预备题判断需要回头复习什么。' },
    structure: { en: 'A one-semester textbook with worked examples, linear equations, graphs, polynomials, factoring, rational expressions, roots, and quadratics. It stops before calculus.', zh: '一学期的教材，包含例题、一次方程、图像、多项式、因式分解、有理式、根式和二次方程，尚未进入微积分。' },
    practice: { en: 'Try It questions, section exercises, chapter reviews, and practice tests. The public key covers all Try It questions and odd-numbered exercises and review/test questions.', zh: '有 Try It 随堂题、节后练习、章末复习和模拟测试。公开答案包含全部 Try It 题，以及练习、复习和测试的奇数题。' },
    feedback: { en: 'Self-check against the answer key and worked examples. The book itself does not score your work or diagnose a wrong algebra step.', zh: '对照答案和例题自行检查。教材本身不会评分，也不会判断你哪一步代数变形出错。' },
    access: { en: 'Web and PDF editions are free; print is a separate purchase. Some instructor-only resources need a verified instructor account.', zh: '网页版和 PDF 免费，纸质版需另购。部分教师专用资料需要已验证的教师账户。' },
    nextStep: { en: 'Try the readiness questions in §2.1, then solve an odd-numbered set without the key. Return to Chapter 1 if the arithmetic blocks you.', zh: '先做第 2.1 节的预备题，再不看答案完成一组奇数题。如果算术成为障碍，回到第 1 章。' },
    start: { label: { en: 'Open §2.1: solving equations', zh: '打开第 2.1 节：解方程' }, url: 'https://openstax.org/books/elementary-algebra-2e/pages/2-1-solve-equations-using-the-subtraction-and-addition-properties-of-equality' },
    sources: [
      { label: { en: 'Book scope, access, and answer coverage', zh: '教材范围、访问方式与答案覆盖' }, url: 'https://openstax.org/books/elementary-algebra-2e/pages/preface' },
      { label: { en: 'Chapter 2 learning sequence', zh: '第 2 章学习顺序' }, url: 'https://openstax.org/books/elementary-algebra-2e/pages/2-introduction' },
      { label: { en: 'Chapter 2 review exercises', zh: '第 2 章复习练习' }, url: 'https://openstax.org/books/elementary-algebra-2e/pages/2-review-exercises' },
    ],
  },
  {
    id: 'openstax-first-derivatives',
    name: { en: 'OpenStax Calculus Volume 1', zh: 'OpenStax《微积分》第 1 册' },
    stage: { en: 'After algebra and functions', zh: '掌握代数与函数之后' },
    bestFor: { en: 'Choose this for a textbook-led first encounter with limits and derivatives.', zh: '适合希望通过系统教材首次学习极限和导数的人。' },
    prerequisites: { en: 'Our readiness advice: handle function notation, graphs, factoring, and fractions fluently. The full course also uses trigonometric, exponential, and logarithmic functions.', zh: '本站建议：先熟练掌握函数符号、图像、因式分解和分式运算。完整课程还会用到三角、指数和对数函数。' },
    structure: { en: 'Chapter 1 reviews functions and graphs; Chapter 2 develops limits; Chapter 3 introduces derivatives. Later chapters cover applications and integration.', zh: '第 1 章复习函数与图像，第 2 章学习极限，第 3 章引入导数；后续章节讲应用与积分。' },
    practice: { en: 'Worked examples, checkpoints, and section exercises. Public answers cover all checkpoints and odd-numbered exercises/review questions, not every problem.', zh: '有例题、Checkpoint 检查题和节后练习。公开答案覆盖全部检查题及练习、复习的奇数题，不是每道题都有公开答案。' },
    feedback: { en: 'Self-marking with the answer key and examples. Reading a correct solution will not reveal whether you can reproduce the reasoning independently.', zh: '通过答案和例题自行批改。看懂正确解答，还不能说明你能独立重现推理。' },
    access: { en: 'Free web/PDF textbook; print costs extra. Instructor answer materials have restricted access. No enrolled course or personal grading is included in the textbook.', zh: '网页版和 PDF 免费，纸质版另收费。教师答案资料有访问限制。教材不包含正式课程注册或个人作业批改。' },
    nextStep: { en: 'Check §1.1 functions first, study Chapter 2 limits, then use §3.1 to connect a difference quotient with a tangent slope before memorizing rules.', zh: '先检查第 1.1 节的函数基础，再学第 2 章极限，随后通过第 3.1 节理解差商与切线斜率的联系，之后再记求导法则。' },
    start: { label: { en: 'Open §3.1: defining the derivative', zh: '打开第 3.1 节：导数的定义' }, url: 'https://openstax.org/books/calculus-volume-1/pages/3-1-defining-the-derivative' },
    sources: [
      { label: { en: 'Book scope, access, and answer coverage', zh: '教材范围、访问方式与答案覆盖' }, url: 'https://openstax.org/books/calculus-volume-1/pages/preface' },
      { label: { en: '§1.1: review of functions', zh: '第 1.1 节：函数复习' }, url: 'https://openstax.org/books/calculus-volume-1/pages/1-1-review-of-functions' },
      { label: { en: '§2.2: the limit of a function', zh: '第 2.2 节：函数的极限' }, url: 'https://openstax.org/books/calculus-volume-1/pages/2-2-the-limit-of-a-function' },
    ],
  },
  {
    id: 'pauls-calculus-1',
    name: { en: 'Paul’s Online Math Notes: Calculus I', zh: 'Paul’s Online Math Notes：微积分 I' },
    stage: { en: 'After algebra and functions', zh: '掌握代数与函数之后' },
    bestFor: { en: 'Choose this for a focused written explanation and step-by-step solutions to practice problems.', zh: '适合需要专题文字讲解，以及练习题分步解答的人。' },
    prerequisites: { en: 'The author explicitly assumes working algebra and trigonometry, but no previous calculus. The opening review is a refresher, not a from-zero algebra course.', zh: '作者明确要求具备代数和三角函数基础，但无需学过微积分。开篇复习用于回顾，不是从零开始的代数课。' },
    structure: { en: 'Lecture-style notes move from a prerequisite review to limits, derivatives, applications, and integrals. Notes and practice pages are separate.', zh: '讲义从先修知识复习开始，依次讲极限、导数、应用和积分。讲解与练习位于不同页面。' },
    practice: { en: 'The derivative-definition practice page links to individual solutions. Choose Practice Problems for self-study; the separate Assignment Problems omit answers.', zh: '导数定义练习页逐题链接到解答。自学请选择 Practice Problems；另设的 Assignment Problems 不提供答案。' },
    feedback: { en: 'Reveal a worked solution and compare each step yourself. The linked notes and practice pages do not automatically grade your attempt.', zh: '打开详细解答后，自己逐步比较。所链接的讲义和练习页不会自动批改你的作答。' },
    access: { en: 'The author provides free online notes and downloadable versions of most pages. Public reading and the linked practice solutions do not require course enrollment.', zh: '作者免费提供在线讲义，大多数页面可下载。阅读公开内容和所链接的练习解答无需注册课程。' },
    nextStep: { en: 'After reviewing limits, read The Definition of the Derivative and attempt a few Practice Problems before opening their solutions. If algebra dominates your errors, return to the foundation options.', zh: '复习极限后，阅读“导数的定义”，先独立完成几道 Practice Problems 再看解答。如果错误主要来自代数，先回到基础资源。' },
    start: { label: { en: 'Open derivative-definition practice', zh: '打开导数定义练习' }, url: 'https://tutorial.math.lamar.edu/Problems/CalcI/DefnOfDerivative.aspx' },
    sources: [
      { label: { en: 'Calculus I scope and prerequisites', zh: '微积分 I 范围与先修要求' }, url: 'https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx' },
      { label: { en: 'The Definition of the Derivative notes', zh: '导数定义讲义' }, url: 'https://tutorial.math.lamar.edu/Classes/CalcI/DefnOfDerivative.aspx' },
      { label: { en: 'Practice versus assignments; free access', zh: '练习与作业的区别、免费访问说明' }, url: 'https://tutorial.math.lamar.edu/' },
    ],
  },
]

export function getResourceComparison(locale: string) {
  const language = locale.startsWith('zh') ? 'zh' : 'en'
  return entries.map(entry => ({
    id: entry.id,
    name: entry.name[language],
    stage: entry.stage[language],
    bestFor: entry.bestFor[language],
    prerequisites: entry.prerequisites[language],
    structure: entry.structure[language],
    practice: entry.practice[language],
    feedback: entry.feedback[language],
    access: entry.access[language],
    nextStep: entry.nextStep[language],
    start: { label: entry.start.label[language], url: entry.start.url },
    sources: entry.sources.map(source => ({ label: source.label[language], url: source.url })),
  }))
}
