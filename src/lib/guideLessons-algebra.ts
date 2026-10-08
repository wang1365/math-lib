import type { GuideLesson, LessonText } from './guideLessons'

export function algebraLesson(t: LessonText): GuideLesson {
  return {
    slug: 'algebra-foundations',
    title: t('Rebuild Algebra: From Equations to Functions', '代数基础：从方程到函数'),
    summary: t('Find the step that is holding you back, repair it, and connect equations to graphs and real situations.', '找出真正卡住的步骤，针对性补齐，再把方程、图像和实际问题联系起来。'),
    level: t('Algebra 1 foundations', '代数入门基础'),
    audience: t('For learners reviewing introductory algebra or returning to math after a break.', '适合复习初等代数，或中断学习后重新开始的学习者。'),
    scope: t('This unit covers signed numbers, fractions, linear equations and inequalities, slope, and function notation. It is a foundation for further study, not a complete Algebra 1 course.', '本单元涵盖正负数、分数、一次方程与不等式、斜率和函数记号。这是后续学习的基础，不是一门完整的 Algebra 1 课程。'),
    prerequisites: [
      t('Multiply and divide whole numbers; recognize a numerator and denominator.', '会做整数乘除，能区分分子与分母。'),
      t('Read an ordered pair (x, y). Chapter 3 reviews how coordinates connect to a line.', '能辨认有序数对 (x, y)；第 3 章会复习坐标与直线的联系。'),
    ],
    goals: [
      t('Explain why an algebra step preserves equality, rather than relying on “moving a term.”', '能解释每一步为什么保持等式成立，而不只说“移项”。'),
      t('Solve a linear equation or inequality and check the result in its original form.', '能解一次方程或不等式，并代回原式检验。'),
      t('Build a linear model from two points, interpret its units, and evaluate function inputs.', '能由两点建立线性模型，解释单位，并根据函数输入求输出。'),
    ],
    studyPlan: t('Try the five diagnostic questions on paper before opening answers. Use the matching review links for mistakes. Study one chapter at a time: explain the example, attempt both practice questions, then return later for the three-question mastery check. No calculator is needed.', '先在纸上完成 5 道诊断题，再展开答案。答错后进入对应章节。每次学习一章：讲清例题，独立完成两道练习，隔一段时间再做 3 道综合自测。本单元不需要计算器。'),
    diagnosticIntro: t('These are routing questions, not a grade. Count a question as secure only if you can explain the reasoning without looking at its answer.', '这些题用于选择起点，不用于评级。只有不看答案也能解释理由，才算真正掌握。'),
    diagnostic: [
      {
        id: 'a-d1', prompt: t('D1 · Signed fractions: calculate and give a simplified fraction.', 'D1 · 正负分数：计算并化为最简分数。'),
        equation: '-\\frac{3}{4}+\\frac{5}{6}', answer: t('1/12', '1/12'),
        explanation: t('Use denominator 12: −9/12 + 10/12 = 1/12. The positive term is slightly larger, so a small positive answer is reasonable.', '通分到分母为 12：−9/12 + 10/12 = 1/12。正数项稍大，因此结果应是一个较小的正数。'),
        commonMistake: t('2/10 = 1/5 comes from adding the numerators and denominators separately. Denominators name the size of the pieces; make the pieces equal before adding their counts.', '写成 2/10 = 1/5，是把分子分母分别相加。分母表示每份的大小，必须先统一每份大小，再相加。'), reviewChapterId: 'number-sense',
      },
      {
        id: 'a-d2', prompt: t('D2 · Equations: solve, then substitute your value back.', 'D2 · 方程：求解后将结果代回检验。'),
        equation: '3(x-2)=2x+5', answer: 'x = 11',
        explanation: t('Distribute to get 3x − 6 = 2x + 5. Subtract 2x and add 6 on both sides. At x = 11, both original sides equal 27.', '去括号得 3x − 6 = 2x + 5。两边同时减去 2x，再加 6。当 x = 11 时，原式两边都等于 27。'),
        commonMistake: t('x = 7 often comes from writing 3(x − 2) as 3x − 2. The 3 multiplies both terms inside the parentheses.', 'x = 7 常源于把 3(x − 2) 写成 3x − 2。括号内两项都要乘以 3。'), reviewChapterId: 'equations',
      },
      {
        id: 'a-d3', prompt: t('D3 · Inequalities: describe every solution.', 'D3 · 不等式：写出所有解的范围。'),
        equation: '-2x+1>7', answer: 'x < −3',
        explanation: t('Subtract 1 to get −2x > 6. Dividing by −2 reverses the ordering. For example, x = −4 works because 9 > 7.', '两边减 1 得 −2x > 6。除以 −2 时不等号反向。例如 x = −4 满足原式，因为 9 > 7。'),
        commonMistake: t('x > −3 forgets that multiplying or dividing an inequality by a negative reverses order. Test x = 0: it would be included, but 1 > 7 is false.', 'x > −3 忘记了乘除负数会使不等号反向。检验 x = 0：它符合这个错误范围，但原式 1 > 7 不成立。'), reviewChapterId: 'equations',
      },
      {
        id: 'a-d4', prompt: t('D4 · Rate of change: find the slope of the line through (1, 4) and (3, 10).', 'D4 · 变化率：求经过 (1, 4) 与 (3, 10) 的直线斜率。'),
        answer: 'm = 3', explanation: t('The output rises by 6 while the input rises by 2, so the slope is 6/2 = 3.', '输出增加 6，输入增加 2，因此斜率为 6/2 = 3。'),
        commonMistake: t('1/3 reverses rise and run. A slope of 3 means 3 output units per input unit, not 3 input units per output unit.', '1/3 把纵向变化与横向变化颠倒了。斜率 3 表示输入每增加 1 个单位，输出增加 3 个单位。'), reviewChapterId: 'linear-models',
      },
      {
        id: 'a-d5', prompt: t('D5 · Function notation: find f(−2).', 'D5 · 函数记号：求 f(−2)。'), equation: 'f(x)=x^2-3x', answer: 'f(−2) = 10',
        explanation: t('Replace every x with (−2): (−2)² − 3(−2) = 4 + 6 = 10.', '把每个 x 都替换为 (−2)：(−2)² − 3(−2) = 4 + 6 = 10。'),
        commonMistake: t('2 comes from treating (−2)² as −4. The parentheses make the whole negative number the base: (−2)(−2) = 4.', '结果为 2，通常是把 (−2)² 算成 −4。括号表示整个负数是底数：(−2)(−2) = 4。'), reviewChapterId: 'functions',
      },
    ],
    routes: [
      { title: t('Fractions or signs are unreliable', '分数或符号不稳'), when: t('D1 was wrong or depended on a guess.', 'D1 答错，或依靠猜测。'), chapterId: 'number-sense', action: t('Start with Chapter 1. Redo its fraction and distribution checks before solving equations.', '从第 1 章开始，先通过分数与分配律练习，再解方程。') },
      { title: t('You lose equality or reverse the wrong sign', '等式变形或不等号方向出错'), when: t('D2 or D3 was wrong, but D1 was secure.', 'D2 或 D3 答错，但 D1 已掌握。'), chapterId: 'equations', action: t('Start with Chapter 2. Write the operation applied to both sides on each line.', '从第 2 章开始，在每一步旁写出两边同时进行了什么运算。') },
      { title: t('Symbols work, but graphs do not', '会算式，却读不懂图像'), when: t('D4 was wrong or you could not explain the units.', 'D4 答错，或无法解释斜率的单位。'), chapterId: 'linear-models', action: t('Use Chapter 3 to connect a pair of points, a rate, and an equation.', '用第 3 章把两点、变化率与方程联系起来。') },
      { title: t('Function inputs are confusing', '函数输入容易混淆'), when: t('D5 was wrong, or f(x) looks like multiplication.', 'D5 答错，或把 f(x) 理解为乘法。'), chapterId: 'functions', action: t('Start with Chapter 4, then use the mixed mastery questions to check earlier skills.', '从第 4 章开始，再用综合自测检查前面的技能。') },
    ],
    chapters: [
      {
        id: 'number-sense', title: t('1. Keep the quantities and the signs intact', '1. 保持数量与符号的含义'),
        goal: t('Add fractions with a common unit and distribute multiplication across every term.', '能统一分数单位，并把乘法正确分配到每一项。'),
        explanation: [
          t('An expression names a quantity; it does not ask for a solution. To simplify an expression, replace it with another expression that has the same value for every allowed input. By contrast, an equation asserts that two quantities are equal and may hold only for some inputs.', '代数式表示一个量，本身并不要求“求解”。化简是把它改写成对所有允许输入都同值的式子。方程则断言两个量相等，可能只有某些输入使它成立。'),
          t('To add fractions, express them using equal-sized pieces. With denominators 3 and 4, twelfths work: multiply each numerator and denominator by the same nonzero number. Multiplying by 4/4 or 3/3 changes the name of a number, not its value.', '相加分数时，要先使每份大小相同。分母为 3 和 4 时，可以通分到分母为 12：分子分母同乘一个非零数。乘以 4/4 或 3/3 只是改变写法，不改变数值。'),
          t('A minus sign before parentheses is multiplication by −1. The distributive law a(b + c) = ab + ac therefore applies to subtraction too. Combine only like terms: 2x and 5x share a variable part; 2x and 5 do not.', '括号前的减号相当于乘以 −1。因此，分配律 a(b + c) = ab + ac 也适用于减法。只能合并同类项：2x 与 5x 的字母部分相同，而 2x 与 5 不是同类项。'),
        ],
        example: {
          title: t('A fraction outside parentheses', '括号外有分数'), prompt: t('Simplify the expression, then evaluate it at x = −3.', '化简下式，再求 x = −3 时的值。'), equation: '\\frac{2}{3}(x-6)-\\frac{x}{4}',
          steps: [
            { text: t('Distribute 2/3 to both terms. Since (2/3) × 6 = 4, the constant term is −4.', '把 2/3 乘到括号内两项。因为 (2/3) × 6 = 4，常数项为 −4。'), equation: '=\\frac{2x}{3}-4-\\frac{x}{4}' },
            { text: t('Use a common denominator for the x terms. Keep the constant separate.', '把含 x 的两项通分，常数项单独保留。'), equation: '=\\frac{8x}{12}-\\frac{3x}{12}-4=\\frac{5x}{12}-4' },
            { text: t('Substitute x = −3 and combine the remaining numbers.', '代入 x = −3，计算剩余数值。'), equation: '\\frac{5(-3)}{12}-4=-\\frac54-4=-\\frac{21}{4}' },
          ],
          conclusion: t('The simplified expression is 5x/12 − 4. Its value at x = −3 is −21/4. Checking the original gives (2/3)(−9) + 3/4 = −6 + 3/4 = −21/4 too.', '化简结果为 5x/12 − 4，在 x = −3 时等于 −21/4。代入原式同样得到 (2/3)(−9) + 3/4 = −6 + 3/4 = −21/4。'),
        },
        pitfall: t('Cancellation removes common factors of an entire numerator and denominator, not individual terms in a sum. For example, (x + 4)/4 = x/4 + 1; it is not x + 1.', '约分只能约去整个分子与分母的公因子，不能直接消去和式中的某一项。例如 (x + 4)/4 = x/4 + 1，而不是 x + 1。'),
        practice: [
          { id: 'a-1-1', prompt: t('Calculate without a decimal approximation.', '不用小数近似值，计算下式。'), equation: '-\\frac56+\\frac14', answer: '−7/12', explanation: t('−5/6 = −10/12 and 1/4 = 3/12; their sum is −7/12.', '−5/6 = −10/12，1/4 = 3/12，因此和为 −7/12。'), commonMistake: t('−4/10 adds numerators and denominators separately. The denominators must first agree.', '−4/10 是分别相加分子分母得到的错误结果；必须先通分。'), reviewChapterId: 'number-sense' },
          { id: 'a-1-2', prompt: t('Simplify, then check your expression at x = 2.', '化简，并在 x = 2 时检验结果。'), equation: '-3(2x-5)+x', answer: t('−5x + 15; at x = 2 the value is 5.', '−5x + 15；x = 2 时值为 5。'), explanation: t('Distribute to get −6x + 15 + x. Combining x terms gives −5x + 15. The original at x = 2 gives −3(−1) + 2 = 5.', '去括号得 −6x + 15 + x，合并得 −5x + 15。原式代入 x = 2 得 −3(−1) + 2 = 5。'), commonMistake: t('−5x − 15 misses that (−3)(−5) is positive. Track the signs of each product separately.', '−5x − 15 忘记了 (−3)(−5) 为正。应分别判断每个乘积的符号。'), reviewChapterId: 'number-sense' },
        ],
        checkpoint: t('Continue when you can explain the common denominator and distribute a negative factor without looking at the example. A numerical check can catch an error, but checking one input alone does not prove two expressions identical.', '当你能不看例题解释通分，并正确分配负数因子时，再继续。代入数值可以发现错误，但只检验一个输入不能证明两个代数式恒等。'),
        sources: [{ title: t('OpenStax · Elementary Algebra 2e, §1.2: Use the Language of Algebra', 'OpenStax《初等代数》第 2 版，§1.2：代数语言'), url: 'https://openstax.org/books/elementary-algebra-2e/pages/1-2-use-the-language-of-algebra', use: t('Extend this chapter with expression vocabulary, substitution, and simplifying practice.', '补充代数式术语、代入与化简练习。'), language: t('English', '英语'), checkedAt: '2026-10-08' }],
      },
      {
        id: 'equations', title: t('2. Preserve equality; reverse order only when needed', '2. 保持等式成立，正确处理不等号'),
        goal: t('Solve with reversible operations and distinguish one solution, no solutions, and infinitely many solutions.', '用可逆运算解题，并区分唯一解、无解与无穷多解。'),
        explanation: [
          t('Think of an equation as a balance. Adding the same quantity to both sides or multiplying both sides by the same nonzero constant preserves the solution set. “Move and change the sign” is shorthand for an operation on both sides, not a separate rule.', '可以把等式想成天平。两边加上同一个量，或乘以同一个非零常数，会保持解集不变。“移项变号”只是两边同做一种运算的简写，不是独立的规则。'),
          t('Keep every term when clearing fractions. Multiplying an equation by 6 means multiplying each entire side by 6. Do not divide by an expression that might be zero without treating that case separately.', '去分母时不能漏项。方程两边乘以 6，指的是两边的整个式子都乘以 6。如果一个含字母的式子可能为零，就不能直接除以它而不另行讨论。'),
          t('An inequality describes a range, not usually a single value. Adding the same number keeps its direction. Multiplying by a negative reflects the number line and reverses order: 2 < 5, but −2 > −5. Multiplication by a positive does not reverse it.', '不等式通常描述一个范围，而不是单个数。两边加同一个数，不等号方向不变。乘以负数相当于将数轴反向，因此次序颠倒：2 < 5，但 −2 > −5。乘以正数则不改变方向。'),
        ],
        example: {
          title: t('An equation with fractions on both sides', '两边都有分数的方程'), prompt: t('Solve and verify the result in the original equation.', '求解，并在原方程中验证。'), equation: '\\frac{x-2}{3}+1=\\frac{x+4}{2}',
          steps: [
            { text: t('Multiply both entire sides by 6, the least common multiple of 3 and 2.', '方程两边同乘 3 与 2 的最小公倍数 6。'), equation: '2(x-2)+6=3(x+4)' },
            { text: t('Distribute and combine the constants on the left.', '去括号，并合并左边的常数项。'), equation: '2x-4+6=3x+12\\quad\\Rightarrow\\quad2x+2=3x+12' },
            { text: t('Subtract 2x from both sides, then subtract 12 from both sides.', '两边同时减去 2x，再同时减去 12。'), equation: '2=x+12\\quad\\Rightarrow\\quad x=-10' },
            { text: t('Check both sides of the original, including its denominators.', '代回原式两边检查，保留原来的分母。'), equation: '\\frac{-10-2}{3}+1=-3,\\qquad\\frac{-10+4}{2}=-3' },
          ], conclusion: t('The unique solution is x = −10. Every transformation used a reversible operation, and substitution confirms it satisfies the starting equation.', '唯一解为 x = −10。每一步都是可逆运算，代入检验也确认它满足原方程。'),
        },
        pitfall: t('If variables cancel, read what remains. 2(x + 1) = 2x + 2 becomes 2 = 2, so every real x works. 2(x + 1) = 2x + 5 becomes 2 = 5, so no x works. Neither case means x = 0.', '字母项消去后，应判断剩余等式。2(x + 1) = 2x + 2 化为 2 = 2，所以任意实数 x 都是解。2(x + 1) = 2x + 5 化为 2 = 5，所以无解。这两种情况都不是 x = 0。'),
        practice: [
          { id: 'a-2-1', prompt: t('Solve and check.', '求解并检验。'), equation: '4(x-1)=2x+10', answer: 'x = 7', explanation: t('4x − 4 = 2x + 10, so 2x = 14. With x = 7, both sides are 24.', '4x − 4 = 2x + 10，因此 2x = 14。代入 x = 7，原式两边都是 24。'), commonMistake: t('x = 3 usually comes from moving −4 without adding 4 to both sides. Write 4x = 2x + 14 first.', 'x = 3 通常源于错误处理 −4。应两边同时加 4，先得到 4x = 2x + 14。'), reviewChapterId: 'equations' },
          { id: 'a-2-2', prompt: t('Solve and describe its number-line graph.', '求解，并描述在数轴上的表示方式。'), equation: '5-3x\\leq14', answer: t('x ≥ −3; a filled point at −3, shaded to the right.', 'x ≥ −3；在 −3 处画实心点，并向右涂色。'), explanation: t('Subtract 5: −3x ≤ 9. Divide by −3 and reverse: x ≥ −3. The endpoint works because 5 − 3(−3) = 14.', '减去 5 得 −3x ≤ 9。除以 −3 并反向，得 x ≥ −3。端点满足原式，因为 5 − 3(−3) = 14。'), commonMistake: t('x ≤ −3 reverses no sign; an open point excludes equality. Both the direction and the included endpoint matter.', 'x ≤ −3 忘记反向；空心点则错误地排除了等号成立的情况。方向与端点是否包含都要检查。'), reviewChapterId: 'equations' },
        ],
        checkpoint: t('Explain which operation produced each line. For an inequality, check the boundary and one point on each side. Review this chapter if either the direction or the equality case is uncertain.', '能逐行说明用了什么运算。对于不等式，检查边界，再各取边界两侧一点验证。如果方向或等号情况仍不确定，先复习本章。'),
        sources: [
          { title: t('OpenStax · Elementary Algebra 2e, §2.3: Equations on Both Sides', 'OpenStax《初等代数》第 2 版，§2.3：两边都有未知量的方程'), url: 'https://openstax.org/books/elementary-algebra-2e/pages/2-3-solve-equations-with-variables-and-constants-on-both-sides', use: t('More step-by-step linear equation practice, including fractions.', '补充含分数的一次方程分步练习。'), language: t('English', '英语'), checkedAt: '2026-10-08' },
          { title: t('OpenStax · Elementary Algebra 2e, §2.7: Linear Inequalities', 'OpenStax《初等代数》第 2 版，§2.7：一次不等式'), url: 'https://openstax.org/books/elementary-algebra-2e/pages/2-7-solve-linear-inequalities', use: t('Number-line graphs and further inequality exercises.', '补充数轴表示与不等式练习。'), language: t('English', '英语'), checkedAt: '2026-10-08' },
        ],
      },
      {
        id: 'linear-models', title: t('3. Connect a line to a rate and a starting value', '3. 把直线、变化率与初始值联系起来'),
        goal: t('Use two points to build y = mx + b and explain m and b with units.', '能由两点建立 y = mx + b，并结合单位解释 m 与 b。'),
        explanation: [
          t('A straight-line model has a constant rate of change. Its slope is the change in output divided by the change in input: m = (y₂ − y₁)/(x₂ − x₁), provided the input difference is not zero. Subtract coordinates in the same order in numerator and denominator.', '直线模型的变化率恒定。斜率是输出变化量除以输入变化量：m = (y₂ − y₁)/(x₂ − x₁)，前提是输入差不为零。分子分母的坐标相减顺序必须一致。'),
          t('In y = mx + b, b is the output when x = 0. It need not be the first y-value in a data list. A vertical line has no finite slope and cannot be written as y = mx + b; it would give one x multiple y-values.', '在 y = mx + b 中，b 是 x = 0 时的输出，不一定是数据列表中的第一个 y 值。竖直直线没有有限斜率，不能写成 y = mx + b，因为同一个 x 会对应多个 y。'),
          t('An algebraic line extends indefinitely; a useful model often does not. State the allowed input range and whether inputs are continuous or whole-number counts. Two measured points alone do not prove a relationship stays linear outside the situation described.', '代数中的直线可以无限延伸，实际模型却常有适用范围。应说明输入区间，以及输入是连续量还是整数计数。仅凭两个测量点，不能证明关系在其他情境中仍然线性。'),
        ],
        example: {
          title: t('A tank draining at a constant rate', '恒速排水的水箱'), prompt: t('A tank contains 26 liters after 2 minutes and 14 liters after 5 minutes. Assume it drains at a constant rate from t = 0 until empty. Find a model and its useful time interval.', '水箱在 2 分钟时有 26 升水，在 5 分钟时有 14 升水。假设从 t = 0 起一直恒速排水，直到排空。求模型及其适用时间范围。'),
          steps: [
            { text: t('Use the points (2, 26) and (5, 14). The units are liters per minute.', '使用点 (2, 26) 与 (5, 14)，斜率单位为升/分钟。'), equation: 'm=\\frac{14-26}{5-2}=-4' },
            { text: t('Substitute either point into V(t) = −4t + b to recover the initial amount.', '任选一点代入 V(t) = −4t + b，求初始水量。'), equation: '26=-4(2)+b\\quad\\Rightarrow\\quad b=34' },
            { text: t('Find when the amount reaches zero and restrict the model to the draining period.', '求水量达到零的时刻，并把模型限制在排水过程中。'), equation: 'V(t)=34-4t,\\qquad0\\leq t\\leq8.5' },
          ], conclusion: t('The initial volume is 34 liters and the tank loses 4 liters each minute. Plot (0, 34) and (8.5, 0), then join them with a segment. The formula predicts a negative volume after 8.5 minutes, so it is no longer a physical model there.', '初始水量为 34 升，每分钟减少 4 升。画出 (0, 34) 与 (8.5, 0)，用线段连接。8.5 分钟后公式给出负水量，因此此后不再适用于实际水箱。'),
        },
        pitfall: t('A negative slope does not mean all outputs are negative. It means outputs decrease as inputs increase. In the tank model, the slope is negative while the volume is positive before the tank is empty.', '负斜率不表示输出全是负数，而是输入增大时输出减小。水箱模型中斜率为负，但排空之前水量仍为正。'),
        practice: [
          { id: 'a-3-1', prompt: t('Find the line through (2, 7) and (6, 15). State its slope and y-intercept.', '求经过 (2, 7) 与 (6, 15) 的直线，写出斜率和纵截距。'), answer: t('y = 2x + 3; slope 2 and y-intercept 3.', 'y = 2x + 3；斜率为 2，纵截距为 3。'), explanation: t('m = (15 − 7)/(6 − 2) = 2. Use 7 = 2(2) + b, so b = 3. Both given points satisfy the result.', 'm = (15 − 7)/(6 − 2) = 2。代入 7 = 2(2) + b 得 b = 3。两个已知点都满足结果。'), commonMistake: t('y = 2x + 7 uses a given output as the intercept, even though its input is 2 rather than 0.', 'y = 2x + 7 把已知点的输出误当作纵截距，但这个输出对应的输入为 2，而不是 0。'), reviewChapterId: 'linear-models' },
          { id: 'a-3-2', prompt: t('A bike rental costs $9 plus $4 per hour, with fractional hours charged proportionally. Write C(h), interpret its two constants, and find the cost for 2.5 hours.', '自行车租赁收取 9 美元基础费，另加每小时 4 美元，不足一小时按比例计费。写出 C(h)，解释两个常数，并求租 2.5 小时的费用。'), answer: t('C(h) = 9 + 4h for h ≥ 0; C(2.5) = $19.', 'C(h) = 9 + 4h，h ≥ 0；C(2.5) = 19 美元。'), explanation: t('The slope is $4 per hour and the intercept is the $9 starting charge. Substitute h = 2.5: 9 + 4 × 2.5 = 19.', '斜率为每小时 4 美元，纵截距为 9 美元起步费用。代入 h = 2.5 得 9 + 4 × 2.5 = 19。'), commonMistake: t('C(h) = 13h charges the starting fee every hour. The fixed fee is added once, so it is not part of the hourly slope.', 'C(h) = 13h 把基础费每小时都收取一次。固定费用只加一次，不能算入每小时的斜率。'), reviewChapterId: 'linear-models' },
        ],
        checkpoint: t('Given two points, calculate a slope, find the intercept, sketch a line, and explain one real-world restriction. If the algebra is fine but the units are not, repeat the modeling problem in words.', '给定两点后，能求斜率、截距，画直线，并解释一个实际限制。如果计算正确但单位含义不清楚，用自己的话重新讲解建模题。'),
        sources: [{ title: t('OpenStax · College Algebra 2e, §4.1: Linear Functions', 'OpenStax《大学代数》第 2 版，§4.1：一次函数'), url: 'https://openstax.org/books/college-algebra-2e/pages/4-1-linear-functions', use: t('Extend the connection between slope, intercepts, graphs, and linear models.', '进一步联系斜率、截距、图像与线性模型。'), language: t('English', '英语'), checkedAt: '2026-10-08' }],
      },
      {
        id: 'functions', title: t('4. Treat a function as a rule with allowed inputs', '4. 把函数看成具有输入范围的规则'),
        goal: t('Evaluate, compose, and restrict functions without confusing an input with an output.', '能求函数值、做简单复合、确定输入限制，并区分输入与输出。'),
        explanation: [
          t('A function assigns exactly one output to each allowed input. f(3) means the output of f at input 3; it does not mean f multiplied by 3. Different inputs may share an output: f(x) = x² gives f(−2) = f(2) = 4 and is still a function.', '函数为每个允许的输入指定唯一输出。f(3) 表示 f 在输入 3 时的输出，不是 f 乘以 3。不同输入可以有相同输出，例如 f(x) = x² 中 f(−2) = f(2) = 4，仍然是函数。'),
          t('When evaluating, replace every appearance of the input variable and keep parentheses around a negative number or expression. For composition f(g(x)), first find the output g(x), then use that entire output as the input of f.', '求函数值时，应替换所有输入变量；代入负数或代数式时保留括号。对于复合函数 f(g(x))，先求 g 的输出，再把整个输出作为 f 的输入。'),
          t('The domain records allowed inputs. Over the real numbers, division by zero is forbidden and an even root cannot have a negative radicand. A contextual restriction can be stricter than an algebraic one, as with nonnegative rental hours.', '定义域记录允许的输入。在实数范围内，分母不能为零，偶次根号内不能为负。实际情境还可能施加更严格的限制，例如租赁时长不能为负。'),
        ],
        example: {
          title: t('Composition and a domain restriction', '复合函数与定义域限制'), prompt: t('Let f(x) = 2x − 1 and g(x) = x² + 3. Find f(g(−2)). Then state the real domain of r(x) = 1/(x − 5).', '设 f(x) = 2x − 1，g(x) = x² + 3。求 f(g(−2))，并写出 r(x) = 1/(x − 5) 的实数定义域。'),
          steps: [
            { text: t('Evaluate the inner function at the original input.', '先把原输入代入内层函数。'), equation: 'g(-2)=(-2)^2+3=7' },
            { text: t('Feed 7, not −2, into the outer function.', '把 7 而不是 −2 代入外层函数。'), equation: 'f(g(-2))=f(7)=2(7)-1=13' },
            { text: t('For r, identify the input that makes the denominator zero and exclude it.', '对于 r，找出使分母为零的输入并排除。'), equation: 'x-5\\ne0\\quad\\Rightarrow\\quad x\\ne5' },
          ], conclusion: t('The composition gives 13. The domain of r is every real number except 5. A domain states possible inputs; it does not give the set of outputs, called the range.', '复合函数值为 13。r 的定义域为除 5 以外的所有实数。定义域描述可能的输入，输出的集合则称为值域。'),
        },
        pitfall: t('Order matters: in this example, g(f(−2)) = g(−5) = 28, not 13. Composition is not multiplication and is not generally commutative.', '顺序很重要：本例中 g(f(−2)) = g(−5) = 28，而不是 13。复合不等于乘法，一般也不满足交换律。'),
        practice: [
          { id: 'a-4-1', prompt: t('For p(x) = x² − 2x, find p(−3) and simplify p(a + 1).', '设 p(x) = x² − 2x，求 p(−3)，并化简 p(a + 1)。'), answer: t('p(−3) = 15; p(a + 1) = a² − 1.', 'p(−3) = 15；p(a + 1) = a² − 1。'), explanation: t('p(−3) = 9 + 6 = 15. For the expression input, (a + 1)² − 2(a + 1) = a² + 2a + 1 − 2a − 2 = a² − 1.', 'p(−3) = 9 + 6 = 15。代入代数式时，(a + 1)² − 2(a + 1) = a² + 2a + 1 − 2a − 2 = a² − 1。'), commonMistake: t('p(a) + 1 is not p(a + 1). Change the input before performing the function operations; do not add 1 to the finished output.', 'p(a) + 1 不是 p(a + 1)。应先改变输入，再执行函数规则，而不是给算完的输出加 1。'), reviewChapterId: 'functions' },
          { id: 'a-4-2', prompt: t('State the real domain of q. Is x = 2 allowed?', '写出 q 的实数定义域。x = 2 是否允许？'), equation: 'q(x)=\\frac{\\sqrt{x-2}}{x-5}', answer: t('x ≥ 2 and x ≠ 5. Yes, q(2) = 0.', 'x ≥ 2 且 x ≠ 5。允许 x = 2，因为 q(2) = 0。'), explanation: t('The square root requires x − 2 ≥ 0. The denominator requires x − 5 ≠ 0. Satisfy both conditions simultaneously.', '平方根要求 x − 2 ≥ 0，分母要求 x − 5 ≠ 0，两个条件必须同时满足。'), commonMistake: t('x > 2 wrongly excludes a zero inside a square root. x ≥ 2 alone wrongly includes division by zero at x = 5.', 'x > 2 错误排除了根号内为零的情况；只写 x ≥ 2 又会错误包含 x = 5 时除以零的情况。'), reviewChapterId: 'functions' },
        ],
        checkpoint: t('Explain the difference between f(a + 1) and f(a) + 1, and name every restriction before simplifying a rational expression. You are ready for the mixed check when both explanations are clear.', '能解释 f(a + 1) 与 f(a) + 1 的区别，并在化简分式前列出所有限制。两点都能讲清后，再做综合自测。'),
        sources: [{ title: t('OpenStax · College Algebra 2e, §3.1: Functions and Function Notation', 'OpenStax《大学代数》第 2 版，§3.1：函数与函数记号'), url: 'https://openstax.org/books/college-algebra-2e/pages/3-1-functions-and-function-notation', use: t('Further work with input-output rules, notation, and representations of functions.', '补充输入输出规则、函数记号及不同表示方式。'), language: t('English', '英语'), checkedAt: '2026-10-08' }],
      },
    ],
    masteryIntro: t('Close the examples and solve these on paper. Write an explanation, not just an answer. The questions mix skills so that you must choose the method yourself.', '合上例题，在纸上作答。不只写答案，还要写解释。这些题混合了不同技能，需要自己选择方法。'),
    mastery: [
      { id: 'a-m1', prompt: t('Solve the equation and explain why each transformation is valid.', '解方程，并解释每一步变形为何成立。'), equation: '\\frac{2x-1}{3}=x+2', answer: 'x = −7', explanation: t('Multiply both sides by 3: 2x − 1 = 3x + 6. Subtract 2x and then 6: x = −7. In the original, both sides equal −5.', '两边同乘 3：2x − 1 = 3x + 6。两边减去 2x，再减去 6，得 x = −7。原式两边都等于 −5。'), commonMistake: t('2x − 1 = x + 6 multiplies only part of the right side. Every term on that side must be multiplied by 3.', '2x − 1 = x + 6 只把右边部分项乘以 3。右边每一项都要乘以 3。'), reviewChapterId: 'equations' },
      { id: 'a-m2', prompt: t('A linear cost C(h) passes through (1, 11) and (4, 23), with h ≥ 0. Find C(h), then find every h that keeps the cost at most $31. Fractional hours are allowed.', '线性费用 C(h) 经过 (1, 11) 与 (4, 23)，且 h ≥ 0。求 C(h)，再求费用不超过 31 美元时所有可能的 h。允许非整数小时。'), answer: t('C(h) = 4h + 7; 0 ≤ h ≤ 6.', 'C(h) = 4h + 7；0 ≤ h ≤ 6。'), explanation: t('The slope is (23 − 11)/(4 − 1) = 4 and 11 = 4 + b gives b = 7. Solve 4h + 7 ≤ 31 to obtain h ≤ 6, then include h ≥ 0.', '斜率为 (23 − 11)/(4 − 1) = 4，由 11 = 4 + b 得 b = 7。解 4h + 7 ≤ 31 得 h ≤ 6，再结合 h ≥ 0。'), commonMistake: t('h = 6 gives only the boundary. “At most” also includes all allowed smaller times; the contextual lower bound must remain.', 'h = 6 只给出了边界。“不超过”还包括所有允许的较小时长，且要保留实际情境中的下界。'), reviewChapterId: 'linear-models' },
      { id: 'a-m3', prompt: t('For r(x) = (x² − 9)/(x − 3), use the identity x² − 9 = (x − 3)(x + 3) to state the original domain, simplify where allowed, and find r(4). Is r(3) defined?', '设 r(x) = (x² − 9)/(x − 3)。利用恒等式 x² − 9 = (x − 3)(x + 3)，写出原定义域，在允许范围内化简，并求 r(4)。r(3) 有定义吗？'), answer: t('x ≠ 3; r(x) = x + 3 on that domain; r(4) = 7; r(3) is undefined.', 'x ≠ 3；在该定义域内 r(x) = x + 3；r(4) = 7；r(3) 无定义。'), explanation: t('Use x² − 9 = (x − 3)(x + 3). Cancel the common factor only when x − 3 is nonzero. Simplifying a formula does not restore an excluded input.', '利用 x² − 9 = (x − 3)(x + 3)。只有 x − 3 非零时才能约去公因子。化简公式不会自动恢复原来排除的输入。'), commonMistake: t('r(3) = 6 uses the simplified expression outside the original domain. In the original rule, x = 3 gives division by zero.', 'r(3) = 6 把化简式用到了原定义域之外。原规则在 x = 3 时分母为零。'), reviewChapterId: 'functions' },
    ],
    masteryRule: t('Use this as a study checkpoint, not a placement test: aim to solve all three without hints and explain the checks. If one fails, use its review link, correct the reasoning, and try a fresh problem with different numbers later. A correct answer from a memorized pattern is not enough to move on.', '这是学习检查点，不是分班测试：目标是在无提示下解对 3 题，并能解释检验方法。若有失误，进入对应复习章节，修正思路，稍后再做一道数字不同的新题。只靠记忆题型得到正确答案，还不足以继续。'),
    nextSteps: [
      { title: t('If the foundations are secure', '基础稳固后'), body: t('Continue with systems of equations, exponent rules, polynomial operations, and quadratics. Keep translating among words, equations, and graphs before starting a full precalculus course.', '继续学习方程组、指数运算法则、多项式运算与二次函数。进入完整的预备微积分课程前，持续练习文字、方程和图像之间的转换。'), href: '/resources?topic=algebra', linkLabel: t('Compare algebra resources', '比较代数资源') },
      { title: t('If calculus is your next goal', '如果下一目标是微积分'), body: t('First add trigonometry, exponentials, logarithms, and function composition to these skills. Then use the calculus unit’s readiness questions to choose a starting chapter.', '还需补充三角函数、指数函数、对数函数与函数复合，再用微积分单元的准备度题目选择起点。'), href: '/guides/calculus-roadmap', linkLabel: t('Open the calculus learning unit', '进入微积分学习单元') },
    ],
    editorialNote: t('The explanations and exercises in this unit are original OnlyMath learning material. Linked textbook sections provide optional further reading; their inclusion does not imply endorsement. English and Simplified Chinese cover the same questions and learning goals. Link checks were performed on October 8, 2026; external pages can change.', '本单元的讲解与练习为 OnlyMath 原创学习内容。链接教材章节仅供延伸阅读，不代表对方认可或背书。英语与简体中文包含相同的题目和学习目标。外部链接于 2026 年 10 月 8 日核查，原站内容此后可能变化。'),
  }
}
