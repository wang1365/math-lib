export type FormulaText = { en: string; zh: string }
export type FormulaStep = { text: FormulaText; formula?: string }
export type FormulaExample = {
  slug: string
  title: FormulaText
  topic: FormulaText
  formula: string
  use: FormulaText
  conditions: FormulaText[]
  reasoning: FormulaStep[]
  worked: { problem: FormulaText; steps: FormulaStep[] }
  check: FormulaStep
  pitfalls: FormulaText[]
  exercises: { prompt: FormulaText; formula?: string; answer: FormulaStep[] }[]
  guidePath: string
  guideLabel: FormulaText
  source: { title: string; url: string }
}

export const formulaExamples: FormulaExample[] = [
  {
    slug: 'pythagorean-theorem',
    title: { en: 'Pythagorean theorem', zh: '勾股定理' },
    topic: { en: 'Geometry', zh: '几何' },
    formula: 'a^2+b^2=c^2',
    use: {
      en: 'Find a missing side in a right triangle, or turn perpendicular horizontal and vertical distances into a straight-line distance.',
      zh: '求直角三角形中的未知边，或根据互相垂直的水平距离和竖直距离计算直线距离。',
    },
    conditions: [
      { en: 'The triangle must have a right angle. The two sides meeting at that angle are the legs a and b.', zh: '三角形必须有一个直角。构成直角的两条边是直角边 a 和 b。' },
      { en: 'c is the hypotenuse, opposite the right angle and longer than either leg. Use positive side lengths in the same unit.', zh: 'c 是直角所对的斜边，比任一直角边都长。边长取正数，且单位必须一致。' },
      { en: 'To test whether a triangle is right-angled, put its longest side in the c position. The converse says that equality guarantees a right angle.', zh: '判断一个三角形是否为直角三角形时，把最长边放在 c 的位置。由勾股定理的逆定理，等式成立就能确定它有直角。' },
    ],
    reasoning: [
      { text: { en: 'Arrange four identical right triangles inside a square of side a + b, with their hypotenuses surrounding a central square of side c. The acute angles of each triangle add to 90°, so the central corners are right angles.', zh: '把四个全等的直角三角形放入边长为 a + b 的正方形，使它们的斜边围成边长为 c 的中央正方形。每个三角形的两个锐角之和为 90°，所以中央图形的各个角都是直角。' } },
      { text: { en: 'Count the same area as the four triangles plus the central square.', zh: '用四个三角形和中央正方形的面积表示同一个总面积。' }, formula: '(a+b)^2=4\\left(\\frac{ab}{2}\\right)+c^2' },
      { text: { en: 'Expand both sides and cancel the matching 2ab terms.', zh: '展开等式两边，消去相同的 2ab。' }, formula: 'a^2+2ab+b^2=2ab+c^2' },
    ],
    worked: {
      problem: { en: 'A right triangle has legs 3 cm and 4 cm. Find its hypotenuse.', zh: '一个直角三角形的两条直角边分别为 3 厘米和 4 厘米，求斜边长。' },
      steps: [
        { text: { en: 'Label the unknown hypotenuse c. Both given lengths are legs, so add their squares.', zh: '把未知斜边记为 c。已知的两条边都是直角边，因此将它们的平方相加。' }, formula: 'c^2=3^2+4^2' },
        { text: { en: 'Square each number before adding.', zh: '先分别平方，再相加。' }, formula: 'c^2=9+16=25' },
        { text: { en: 'Take the positive square root because c is a length. The hypotenuse is 5 cm.', zh: '因为 c 表示长度，所以取正平方根。斜边长为 5 厘米。' }, formula: 'c=\\sqrt{25}=5' },
      ],
    },
    check: {
      text: { en: 'Substitute the result into the original relation. Also check that 5 is greater than both 3 and 4, and less than their sum 7.', zh: '把结果代回原关系式，并检查 5 大于 3 和 4，且小于两者之和 7。' },
      formula: '3^2+4^2=25=5^2',
    },
    pitfalls: [
      { en: 'Do not use a + b = c: the theorem relates squares of lengths, not the lengths themselves.', zh: '不能写成 a + b = c：定理描述的是边长的平方关系，而不是边长直接相加。' },
      { en: 'If a leg is missing, subtract its companion’s square from c² before taking the square root.', zh: '如果要求的是直角边，应先用 c² 减去另一条直角边的平方，再开平方。' },
      { en: 'A picture that looks right-angled is not enough. Use a given right angle, perpendicular directions, or a justified converse test.', zh: '图形看起来像直角三角形并不足够。需要题目给定直角、互相垂直的方向，或通过逆定理判断。' },
    ],
    exercises: [
      {
        prompt: { en: 'A 17 m support cable stretches from level ground to a vertical mast. Its ground anchor is 8 m from the mast. How high is the attachment point?', zh: '一条 17 米长的拉索从水平地面连接到竖直桅杆。地面固定点距桅杆 8 米，桅杆上的连接点有多高？' },
        answer: [
          { text: { en: 'The cable is the hypotenuse. Subtract to find the vertical leg; the attachment point is 15 m high.', zh: '拉索是斜边。用平方相减求竖直直角边，连接点高 15 米。' }, formula: 'h=\\sqrt{17^2-8^2}=\\sqrt{225}=15' },
        ],
      },
      {
        prompt: { en: 'A rectangular panel is 5 units wide and 7 units tall. Find its diagonal exactly, then to two decimal places.', zh: '一块长方形面板宽 5 个单位，高 7 个单位。求对角线的精确长度，并保留两位小数。' },
        answer: [
          { text: { en: 'The width and height meet at a right angle. Keep the radical until the final rounding step.', zh: '宽和高互相垂直。先保留根式，最后一步再取近似值。' }, formula: 'd=\\sqrt{5^2+7^2}=\\sqrt{74}\\approx 8.60' },
        ],
      },
      {
        prompt: { en: 'A triangle has sides 6, 8, and 11 units. Is it a right triangle? Explain rather than relying on a sketch.', zh: '一个三角形的三条边长分别为 6、8、11 个单位。它是直角三角形吗？请用计算说明。' },
        answer: [
          { text: { en: 'No. Test the longest side, 11, as the possible hypotenuse. The squares do not satisfy the theorem.', zh: '不是。把最长边 11 作为可能的斜边进行检验，平方关系不成立。' }, formula: '6^2+8^2=100\\ne121=11^2' },
        ],
      },
    ],
    guidePath: '/guides/algebra-foundations',
    guideLabel: { en: 'Build the algebra behind these steps', zh: '补齐计算所需的代数基础' },
    source: {
      title: 'OpenStax Prealgebra 2e, §9.3',
      url: 'https://openstax.org/books/prealgebra-2e/pages/9-3-use-properties-of-angles-triangles-and-the-pythagorean-theorem',
    },
  },
  {
    slug: 'quadratic-formula',
    title: { en: 'Quadratic formula', zh: '一元二次方程求根公式' },
    topic: { en: 'Algebra', zh: '代数' },
    formula: 'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}',
    use: {
      en: 'Solve a quadratic equation even when its factors are hard to spot. The discriminant also tells you how many real solutions to expect.',
      zh: '即使不容易看出因式，也能用它求解一元二次方程。判别式还能告诉你有多少个实数解。',
    },
    conditions: [
      { en: 'First write ax² + bx + c = 0, with real coefficients and a ≠ 0. If a = 0, the equation is not quadratic.', zh: '先整理成 ax² + bx + c = 0，其中系数都是实数，且 a ≠ 0。a = 0 时不是一元二次方程。' },
      { en: 'Let D = b² − 4ac. If D > 0 there are two distinct real roots; if D = 0 there is one repeated real root.', zh: '设 D = b² − 4ac。D > 0 时有两个不同的实根；D = 0 时有一个二重实根。' },
      { en: 'If D < 0, there are no real roots. Complex numbers extend the formula to that case, but these examples work over the real numbers.', zh: 'D < 0 时没有实根。引入复数后仍可使用求根公式，但这里的示例在实数范围内讨论。' },
    ],
    reasoning: [
      { text: { en: 'Start from ax² + bx + c = 0. Multiply by 4a and move the constant term to the right.', zh: '从 ax² + bx + c = 0 出发，两边乘以 4a，再把常数项移到右边。' }, formula: '4a^2x^2+4abx=-4ac' },
      { text: { en: 'Add b² to both sides to complete the square.', zh: '两边同时加上 b²，配成完全平方。' }, formula: '(2ax+b)^2=b^2-4ac' },
      { text: { en: 'When D ≥ 0, take both square-root branches, subtract b, and divide by 2a. This produces the formula above, including when a is negative.', zh: '当 D ≥ 0 时，取正负两个平方根，减去 b，再除以 2a，即得到上面的公式；a 为负数时也成立。' }, formula: '2ax+b=\\pm\\sqrt{D}' },
    ],
    worked: {
      problem: { en: 'Solve x² − 5x + 6 = 0 and check both answers.', zh: '求解 x² − 5x + 6 = 0，并检验两个答案。' },
      steps: [
        { text: { en: 'Read the signed coefficients from the standard form.', zh: '从标准形式中确定系数，注意保留符号。' }, formula: 'a=1,\\quad b=-5,\\quad c=6' },
        { text: { en: 'Compute the discriminant. It is positive, so expect two distinct real roots.', zh: '计算判别式。结果为正，因此应有两个不同的实根。' }, formula: 'D=(-5)^2-4(1)(6)=25-24=1' },
        { text: { en: 'Substitute into the formula, keeping the entire numerator over 2a.', zh: '代入公式，注意整个分子都要除以 2a。' }, formula: 'x=\\frac{5\\pm\\sqrt{1}}{2}=\\frac{5\\pm1}{2}' },
        { text: { en: 'Evaluate the plus and minus cases separately.', zh: '分别计算加号和减号对应的两个值。' }, formula: 'x_1=3,\\qquad x_2=2' },
      ],
    },
    check: {
      text: { en: 'Both values make the original expression zero. Their sum is 5 = −b/a and their product is 6 = c/a, giving another useful check.', zh: '两个值都使原式为零。它们的和为 5 = −b/a，积为 6 = c/a，也可用来辅助检验。' },
      formula: '\\begin{aligned}3^2-5(3)+6&=0\\\\2^2-5(2)+6&=0\\end{aligned}',
    },
    pitfalls: [
      { en: 'Read b with its sign: when b = −5, the numerator begins with −b = 5. Also, (−5)² = 25.', zh: 'b 必须连同符号一起读取：b = −5 时，分子中的 −b = 5。另外，(−5)² = 25。' },
      { en: 'Do not forget the minus branch or divide only the square-root term by 2a.', zh: '不要漏掉减号分支，也不要只把根号项除以 2a。' },
      { en: 'A negative discriminant means no real solution; it does not mean the roots are negative. A zero discriminant gives the same root twice.', zh: '判别式为负表示没有实数解，并不表示根是负数。判别式为零时，两个分支给出同一个根。' },
    ],
    exercises: [
      {
        prompt: { en: 'Solve this non-monic quadratic. Keep the negative root as a fraction.', zh: '求解下面这个二次项系数不为 1 的方程，负根用分数表示。' },
        formula: '2x^2-3x-2=0',
        answer: [
          { text: { en: 'The discriminant is 25. The denominator is 4, so the roots are 2 and −1/2.', zh: '判别式为 25，分母为 4，因此两个根是 2 和 −1/2。' }, formula: 'x=\\frac{3\\pm\\sqrt{25}}{4}=2\\quad\\text{or}\\quad-\\frac12' },
        ],
      },
      {
        prompt: { en: 'How many distinct real roots does this equation have? Find them.', zh: '下面的方程有几个不同的实根？求出它们。' },
        formula: 'x^2+6x+9=0',
        answer: [
          { text: { en: 'D = 36 − 36 = 0, so there is one distinct real root, −3, with multiplicity two. Factoring gives the same result.', zh: 'D = 36 − 36 = 0，因此只有一个不同的实根 −3，它是二重根。因式分解也得到同样的结果。' }, formula: '(x+3)^2=0\\quad\\Longrightarrow\\quad x=-3' },
        ],
      },
      {
        prompt: { en: 'Decide whether this equation has real roots. Explain with both the discriminant and a completed square.', zh: '判断下面的方程是否有实根，分别用判别式和配方说明。' },
        formula: 'x^2+2x+5=0',
        answer: [
          { text: { en: 'D = 4 − 20 = −16, so there are no real roots. The completed square is always positive for real x, confirming this.', zh: 'D = 4 − 20 = −16，所以没有实根。配方后的表达式对任意实数 x 都为正，也能验证这个结论。' }, formula: 'x^2+2x+5=(x+1)^2+4>0' },
        ],
      },
    ],
    guidePath: '/guides/algebra-foundations',
    guideLabel: { en: 'Follow the algebra foundations guide', zh: '继续学习代数基础指南' },
    source: {
      title: 'OpenStax Elementary Algebra 2e, §10.3',
      url: 'https://openstax.org/books/elementary-algebra-2e/pages/10-3-solve-quadratic-equations-using-the-quadratic-formula',
    },
  },
  {
    slug: 'derivative-power-rule',
    title: { en: 'Derivative power rule', zh: '幂函数求导法则' },
    topic: { en: 'Calculus', zh: '微积分' },
    formula: '\\frac{d}{dx}x^n=nx^{n-1}',
    use: {
      en: 'Find the instantaneous rate of change of a power function. For polynomials, combine it with the sum and constant-multiple rules to differentiate one term at a time.',
      zh: '求幂函数的瞬时变化率。对多项式，可结合求和法则和常数倍法则逐项求导。',
    },
    conditions: [
      { en: 'For positive integer n, the rule holds at every real x. Constant functions have derivative 0; treat f(x) = 1 directly rather than writing 0 · x⁻¹ at x = 0.', zh: '当 n 是正整数时，法则对任意实数 x 成立。常数函数的导数是 0；对 f(x) = 1 应直接求导，不要在 x = 0 处代入 0 · x⁻¹。' },
      { en: 'For a negative integer exponent, exclude x = 0. For any real exponent n, the rule is valid on x > 0.', zh: '负整数次幂需要排除 x = 0。对于任意实数指数 n，法则在 x > 0 时成立。' },
      { en: 'Some rational powers also allow negative inputs; check the particular function’s real domain. Behavior at x = 0 needs separate attention: √x is defined there but has no finite derivative there.', zh: '某些有理数次幂也允许负数输入，要检查具体函数的实数定义域。x = 0 处需要单独讨论：√x 在该点有定义，但没有有限导数。' },
    ],
    reasoning: [
      { text: { en: 'For f(x) = x³, begin with the difference quotient, using h ≠ 0.', zh: '以 f(x) = x³ 为例，先写出差商，其中 h ≠ 0。' }, formula: '\\frac{(x+h)^3-x^3}{h}=3x^2+3xh+h^2' },
      { text: { en: 'Let h approach zero. The terms containing h vanish, leaving 3x². The binomial expansion gives the same pattern for all positive integer powers.', zh: '令 h 趋近于零，含 h 的项趋于零，剩下 3x²。通过二项式展开，对所有正整数次幂都能得到同样的规律。' }, formula: 'f\'(x)=\\lim_{h\\to0}(3x^2+3xh+h^2)=3x^2' },
      { text: { en: 'For an arbitrary real n and x > 0, write xⁿ as e to the power n ln x. Once the chain rule and the derivatives of exp and ln are known, they justify the same result.', zh: '对于任意实数 n 和 x > 0，可把 xⁿ 写成以 e 为底、n ln x 为指数的形式。学过链式法则以及指数函数、对数函数的导数后，就能得到相同结果。' }, formula: '\\frac{d}{dx}e^{n\\ln x}=e^{n\\ln x}\\frac{n}{x}=nx^{n-1}' },
    ],
    worked: {
      problem: { en: 'For f(x) = x³, find the slope and tangent line at x = 2.', zh: '对于 f(x) = x³，求 x = 2 处的斜率和切线方程。' },
      steps: [
        { text: { en: 'Multiply by the exponent, then lower that exponent by one.', zh: '把指数作为系数，再将指数减一。' }, formula: 'f\'(x)=3x^{3-1}=3x^2' },
        { text: { en: 'Evaluate the derivative at x = 2 to obtain the slope.', zh: '把 x = 2 代入导函数，求得斜率。' }, formula: 'f\'(2)=3(2^2)=12' },
        { text: { en: 'Evaluate the original function to locate the point of tangency.', zh: '把 x = 2 代入原函数，确定切点。' }, formula: 'f(2)=8\\quad\\Longrightarrow\\quad (2,8)' },
        { text: { en: 'Use point-slope form. This line matches the function’s value and slope at the point.', zh: '使用直线的点斜式。这条直线在切点处与原函数有相同的函数值和斜率。' }, formula: 'y-8=12(x-2)\\quad\\Longrightarrow\\quad y=12x-16' },
      ],
    },
    check: {
      text: { en: 'The tangent line gives y = 8 at x = 2. A nearby secant slope is 12.0601 when h = 0.01, approaching 12 as h approaches zero. A numerical check supports the calculation but is not a proof.', zh: '切线方程在 x = 2 时给出 y = 8。取 h = 0.01 时，附近割线的斜率为 12.0601；当 h 趋近于零时，它趋近于 12。数值检验能辅助检查，但不能代替证明。' },
      formula: '\\frac{(2+h)^3-8}{h}=12+6h+h^2',
    },
    pitfalls: [
      { en: 'Subtract one from the exponent, not from the whole term: the derivative of x³ is 3x², not 3x³ − 1.', zh: '减一的是指数，不是整个式子：x³ 的导数是 3x²，而不是 3x³ − 1。' },
      { en: 'A composite expression needs the chain rule. For (2x + 1)³, multiply 3(2x + 1)² by the inner derivative 2.', zh: '复合函数还需要链式法则。对 (2x + 1)³ 求导时，要把 3(2x + 1)² 再乘以内层函数的导数 2。' },
      { en: 'The rule is for a constant exponent. It does not directly differentiate aˣ or xˣ. Also distinguish f(2), a function value, from f′(2), a slope.', zh: '这里的指数必须是常数，不能直接用此法则对 aˣ 或 xˣ 求导。也要区分函数值 f(2) 和斜率 f′(2)。' },
    ],
    exercises: [
      {
        prompt: { en: 'Differentiate this polynomial, then find its slope at x = −1.', zh: '对下面的多项式求导，再求 x = −1 处的斜率。' },
        formula: 'g(x)=2x^4-3x^2+5',
        answer: [
          { text: { en: 'Apply the constant-multiple rule term by term. The derivative of 5 is zero; then substitute −1.', zh: '逐项使用常数倍法则，常数 5 的导数为零，再代入 −1。' }, formula: 'g\'(x)=8x^3-6x,\\qquad g\'(-1)=-2' },
        ],
      },
      {
        prompt: { en: 'Rewrite the reciprocal as a power, differentiate, and state the domain of the function and its derivative.', zh: '把倒数写成幂的形式，求导，并说明原函数及导函数的定义域。' },
        formula: 'p(x)=\\frac{1}{x^2}',
        answer: [
          { text: { en: 'Use exponent −2. Both the function and its derivative are defined for every real x except 0.', zh: '使用指数 −2。原函数和导函数都在除 0 以外的所有实数上有定义。' }, formula: 'p(x)=x^{-2},\\qquad p\'(x)=-2x^{-3}=-\\frac{2}{x^3}' },
        ],
      },
      {
        prompt: { en: 'Find the derivative of √x at x = 9. Is the same derivative formula valid at x = 0?', zh: '求 √x 在 x = 9 处的导数。这个导数公式能用于 x = 0 吗？' },
        answer: [
          { text: { en: 'For positive x, use exponent 1/2. The derivative at 9 is 1/6.', zh: '当 x 为正数时，使用指数 1/2。在 x = 9 处的导数为 1/6。' }, formula: '\\frac{d}{dx}\\sqrt{x}=\\frac{1}{2\\sqrt{x}}\\quad(x>0)' },
          { text: { en: 'No finite derivative exists at 0: even the right-hand difference quotient grows without bound. A function can be defined at a point without having a finite derivative there.', zh: '在 0 处没有有限导数：即使只考虑右侧差商，它也会无限增大。函数在某点有定义，不代表该点存在有限导数。' }, formula: '\\frac{\\sqrt{h}-0}{h}=\\frac{1}{\\sqrt{h}}\\to+\\infty\\quad(h\\to0^+)' },
        ],
      },
    ],
    guidePath: '/guides/calculus-roadmap',
    guideLabel: { en: 'Continue with the calculus roadmap', zh: '继续学习微积分自学路线' },
    source: {
      title: 'OpenStax Calculus Volume 1, §3.3',
      url: 'https://openstax.org/books/calculus-volume-1/pages/3-3-differentiation-rules',
    },
  },
]
