# OnlyMath 资源扩充记录

核查日期：2026-09-27。此次从 8 条扩充至 21 条资源，并增加了代数基础、统计学入门两篇学习指南。收录的是对学习者有明确用途的原站资源；OnlyMath 只写原创摘要、适用建议和局限，并链接至原站，不转载课程正文、题目、图片或商标。

## 选材方法

1. 先按美国高中到大学初阶的主题寻找资源：代数、几何、预备微积分、微积分、统计、线性代数。
2. 优先使用提供方自己的说明页面核对范围、形式和访问方式；资源索引站仅用于发现与比较，不将其条目介绍直接复制进本站。
3. 每条资源必须能说清楚「适合谁」和「需要注意什么」。教材、视频、练习与工具分开标注，避免把不同用途混为一谈。
4. `Free` 表示所链接内容的在线访问方式；纸质书、证书、账户功能或索引站收录的第三方材料可能另有条件。`checkedAt` 是本次信息核查日期，不表示未来价格或可用性的保证。

## 本次新增的来源

| 提供方 | 本站收录内容 | 核对依据 |
|---|---|---|
| OpenStax | College Algebra 2e、Precalculus 2e、Calculus Volume 1、Introductory Statistics 2e | [数学书目](https://openstax.org/k12/math)、[大学代数介绍](https://openstax.org/books/college-algebra-2e/pages/preface)、[微积分介绍](https://openstax.org/books/calculus-volume-1/pages/preface)、[统计介绍](https://openstax.org/books/introductory-statistics-2e/pages/preface) |
| CK-12 | FlexMath 学校数学知识点 | [FlexMath](https://flexmath.ck12.org/)、[FlexBook 说明](https://help.ck12.org/hc/en-us/articles/200344155-What-Is-a-FlexBook-Textbook) |
| Lamar University | Paul's Online Math Notes | [课程讲义与练习目录](https://tutorial.math.lamar.edu/) |
| StatQuest | 统计视频索引 | [官方视频目录](https://statquest.org/video_index.html) |
| Mathigon / Amplify | Polypad 数学操作画布 | [Polypad](https://polypad.amplify.com/p)、[Mathigon 教师资源](https://mathigon.org/teachers) |
| OpenIntro | OpenIntro Statistics | [教材与配套资料](https://www.openintro.org/book/os/) |
| LibreTexts | 线性代数教材书架 | [线性代数书架](https://math.libretexts.org/Bookshelves/Linear_Algebra) |
| Art of Problem Solving | Alcumus 进阶练习 | [AoPS 免费资源](https://artofproblemsolving.com/m/resources/)、[Alcumus](https://artofproblemsolving.com/alcumus) |
| Math Is Fun | 代数索引 | [代数主题目录](https://www.mathsisfun.com/algebra/) |
| MERLOT | 教育资源索引 | [MERLOT 官方目录](https://www.merlot.org/merlot/) |

## 后续维护

- 定期抽查出站链接、免费访问方式、登录要求和课程范围；发生变化时更新 `src/lib/resource-additions.ts` 的描述与 `checkedAt`。
- 若要把第三方教材正文、练习、插图或视频直接发布到 OnlyMath，先逐项核对授权、署名和改编条件；仅有「免费访问」不等于可以再发布。
- 学习指南保留独立的学习顺序与判断建议，相关资源只作为下一步入口。

## 2026-10-08 UTC：从代数薄弱到初学导数的具体资源对比

本次核查仅覆盖下列四个具体项目及相关提供方说明。前面的 2026-09-27 扩充记录仍保留原日期。新增对比的日期保存在 `src/lib/resourceComparison.ts`，不表示全站资源均已复查。

### 核查范围与方法 / Review scope and method

- 使用提供方公开课程目录、教材前言、具体章节、练习页和帮助文档进行桌面研究；没有注册或报名课程，没有测试已登录账户、Khanmigo 或付费功能，没有测量学习效果。
- Used public provider outlines, textbook prefaces, lesson/practice pages, and help documentation. This is a public-materials comparison, not an enrolled or first-hand product test. Suitability, prerequisite checkpoints, and suggested next steps are OnlyMath editorial judgments.
- 所链接的资源为英文内容；中文版对比是本站编辑说明的翻译，不表示原课程提供完整中文版本。
- 不对不同阶段的资源做统一评分。Khan Algebra 1 与 Elementary Algebra 用于补基础；Calculus Volume 1 与 Paul’s Calculus I 用于具备相应先修知识后的极限与导数学习。代数 1 与微积分之间仍需补函数、分式、三角、指数及对数等知识。
- 网页摘要与比较文字为原创，不复制教材正文、例题、练习、插图或答案。免费在线访问不等于授权转载。OpenStax 当前页面展示的授权应在任何再利用前另行核对。

### 官方依据 / Official sources

1. Khan Academy Algebra 1
   - [课程目录](https://www.khanacademy.org/math/algebra)及[官方可检索课程页](https://www.khanacademy.org/v/algebra)：代数式、方程、函数、指数、二次方程，课程测验与单元测试。部分课程页面是动态页面，网页文本读取为空；范围用官方可检索课程内容及[Algebra 1 单元指南目录](https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:alg1-ccss-teacher-resources/x2f8bb11595b61c86:alg1-ccss-welcome-to-teacher-resources/a/alg1-ccss-unit-guides-and-other-resources)交叉核对，没有将页面壳加载成功当作完成实操测试。
   - [代数基础单元](https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:foundation-algebra)：直接起点；其路径也由[该单元 FAQ](https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:foundation-algebra/x2f8bb11595b61c86:division-zero/a/algebra-foundations-faq)核对。
   - [Mastery 评分说明](https://support.khanacademy.org/hc/en-us/articles/5548760867853--How-do-Khan-Academy-s-Mastery-levels-work)：自动知识点掌握等级；[官方代数内容更新说明](https://support.khanacademy.org/hc/en-us/articles/360030697472-Content-Updates-Math-Special-Edition-July-2019)：练习与提示设计。后者是仍可读取的历史产品说明，未声称本次实测提示交互。
   - [免费内容与账户记录进度](https://support.khanacademy.org/hc/en-us/articles/202487450-How-do-I-set-up-a-new-user-account)、[Khanmigo 的独立订阅说明](https://support.khanacademy.org/hc/en-us/articles/14583967053069-Why-do-I-need-to-pay-to-use-Khanmigo)：未将可选 AI 辅导混入免费基础课程，未发布易变化的具体订阅价格。
2. OpenStax Elementary Algebra 2e
   - [前言](https://openstax.org/books/elementary-algebra-2e/pages/preface)：一学期结构、预代数基础、第 1 章算术复习、免费网页/PDF 与收费印刷本、教师资料限制。
   - [第 2 章目录](https://openstax.org/books/elementary-algebra-2e/pages/2-introduction)、[第 2.1 节](https://openstax.org/books/elementary-algebra-2e/pages/2-1-solve-equations-using-the-subtraction-and-addition-properties-of-equality)、[第 2 章复习题](https://openstax.org/books/elementary-algebra-2e/pages/2-review-exercises)：预备题、逐步例题与纸笔练习。
   - 前言明确区分公开的全部 Try It 答案、奇数练习/复习/测试答案，以及教师端偶数题答案。未声称所有习题都有公开完整解答。
3. OpenStax Calculus Volume 1
   - [前言](https://openstax.org/books/calculus-volume-1/pages/preface)：函数、极限、导数、应用、积分的顺序；免费网页/PDF、印刷本和教师资料限制；全部 Checkpoint 与奇数习题/复习题的公开答案。
   - [第 1.1 节：函数复习](https://openstax.org/books/calculus-volume-1/pages/1-1-review-of-functions)、[第 2.2 节：函数极限](https://openstax.org/books/calculus-volume-1/pages/2-2-the-limit-of-a-function)、[第 3.1 节：导数定义](https://openstax.org/books/calculus-volume-1/pages/3-1-defining-the-derivative)：用于具体起点和学习顺序，未将教材本身描述为自动批改课程。
4. Paul’s Online Math Notes: Calculus I
   - [站点说明](https://tutorial.math.lamar.edu/)、[Calculus I 目录](https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx)、[先修复习说明](https://tutorial.math.lamar.edu/Classes/CalcI/ReviewIntro.aspx)：免费在线讲义、多数页面可下载；明确要求代数与三角基础，复习章节不能替代完整基础课。
   - [导数定义讲义](https://tutorial.math.lamar.edu/Classes/CalcI/DefnOfDerivative.aspx)、[对应 Practice Problems](https://tutorial.math.lamar.edu/Problems/CalcI/DefnOfDerivative.aspx)：练习题逐题链接解答。站点说明明确区分有解答的 Practice Problems 和没有答案的 Assignment Problems。

### 日期字段变更 / Date changes

仅将实际复查的既有目录项 `khan`、`openstax-calculus` 和 `pauls-notes` 的 `checkedAt` 标记为 `2026-10-08`。其他既有日期保持不变；没有日期的未核查条目不补日期。Elementary Algebra 2e 是本次具体对比中的条目，没有借用 College Algebra 2e 的目录身份或更新它的日期。

资源卡片以“资料核查 / Information checked”配合语义化 `time` 标签显示已有日期。该日期指内容与访问说明的研究时间，不是原站更新日期、使用体验日期、评级或持续可用性保证。
