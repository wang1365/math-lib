# OnlyMath 海外版 UI/UX 与内容改版方案

日期：2026-09-27。审查对象：改版前仓库的 Next.js 站点及本地 `/en`、`/en/resources` 页面；同时核对了线上公开页面。以下记录最初审查和目标方案；改版实现状态见文末。

## 1. 产品定位与目标用户

**建议定位**：一个帮助学习者按目标、主题和当前水平找到合适数学资源的独立指南。价值在于筛选、解释和排序，而不是把外部链接堆在一个目录中。

**首要用户**：美国高中生、大学低年级学生及自学者；他们常以 “Algebra 1 practice”“AP Calculus AB review”“learn linear algebra” 等任务进入。教师和家长是第二层用户。其他英语市场可复用英语内容，但课程名称、考试体系和付费信息要按市场标注，不能默认等同美国。

**北极星任务**：访客在 30 秒内确认网站能否帮助自己，并在不超过 3 次操作内找到一个适合其主题、水平、形式和预算的资源。建议以实际用户测试验证，而非宣称已达成。

## 2. 现状审查（按影响排序）

| 优先级 | 观察与证据 | 用户影响 | 处理建议 |
|---|---|---|---|
| P0 | 非默认语言首页底部 CTA 固定链接 `/resources`、`/branches`；默认语言“数学分支”卡片链接到未实现的 `/branches/[name]`。 | 丢失语言上下文，部分入口出现 404。 | 所有站内链接统一生成本地化地址；未建详情页前链接到存在的资源页。此项已在本次修复。 |
| P0 | “Tools” 页列出绘图、统计、矩阵等 8 种工具，但各卡片的 “Use Tool” 按钮无动作；计算器文案声称支持科学和代数计算，实际界面只有基础四则运算。 | 访客认为网站故障或被误导。 | 已实现的能力明确标为可用；其余转为第三方资源链接，或隐藏直至功能上线。 |
| P0 | 首页承诺 “Active Community”“Smart Recommendations”，仓库中没有社区或推荐流程；资源页有无评分依据的 4/5 星。 | 降低可信度，尤其对首次访问者。 | 删除未实现的能力与主观星级；改为可核验的编辑标准和选用理由。 |
| P1 | Hero “Explore the Infinite Possibilities”、长段抽象介绍及六张彩色功能卡片无法快速回答“我该从哪里开始”。视觉上叠加蓝紫渐变、模糊光斑、悬浮阴影、彩色图标和重复 CTA。 | 首屏缺少具体任务入口，整体呈模板化的“AI 生成站”观感。 | 用任务型标题、主题入口和少量真实内容预览替代泛化卖点；采用编辑式、克制的视觉系统。 |
| P1 | 资源页仅 8 项资源，按“学习平台/视频”平铺，缺少学科、水平、学习目标、价格、形式、先修要求、语言和更新时间等决策信息。 | 难以比较资源；用户仍要重新搜索。 | 建立统一资源数据模型与筛选，补充“适合谁/为何推荐/限制”。 |
| P1 | 英文页面的浏览器标题和 meta 仍是中文；根布局将 canonical 固定为 `/`；英文页脚仍有中文句子，版权年份固定为 2024。 | 搜索结果与语言体验不一致，也妨碍国际化索引。 | 页面级英文 metadata、自引用 canonical、成对 hreflang、英文页脚与正确年份。 |
| P1 | 语言菜单只靠 `group-hover` 显示，移动端菜单按钮缺少可访问名称、`aria-expanded`；页面未看到明显的键盘焦点设计。 | 键盘、触控和辅助技术用户操作困难。 | 将语言切换器做成可点击的菜单/原生选择器；补齐标签、状态、焦点与 Escape 行为。 |
| P2 | 英文首页标题片段相接，实测显示 “Explore theInfinite Possibilities”；导航在窄视口占用大量横向空间。 | 文案排版不精致，降低专业感。 | 不再拆分需要空格的句子；缩短品牌名与导航标签。 |
| P2 | 联系表单把站点邮箱预填并设为只读“Email”，发送实际打开邮件客户端；字段标签没有和控件关联。 | 用户误以为邮件已发送或无法填写回复地址。 | 改为清晰的 “Email us” 链接，或接入真正的表单后再展示提交状态。 |

> 本次本地 `/resources`、`/en/resources` 与线上公开 `/resources` 当前均可打开，无法从截图确认当时 404 的确切 URL、部署版本或时间。已修复代码中确定存在的错误入口；上线后应按报告末尾的验证清单检查真实域名。

## 3. 建议的新信息架构

主导航控制为 **Topics / Learning Paths / Resources / Tools / About**，语言切换放在右侧。MVP 阶段若 Learning Paths 或 About 尚未写完，就暂不展示对应入口；所有可点击项必须有真实落地页。

```text
Home
├─ Topics: Algebra 1, Geometry, Algebra 2, Precalculus, Calculus, Statistics,
│          Linear Algebra（先上最有内容的主题）
├─ Learning Paths: 从当前水平到具体目标的分步路线
├─ Resources: 可筛选目录 → 资源详情/评测
├─ Tools: 站内基础计算器 + 明确标注的第三方工具
└─ About: 选材标准、更新方式、纠错与联系
```

主路径：**进入首页 → 选择主题或目标 → 查看推荐顺序和资源比较 → 打开资源**。从搜索进入的用户应直接落到主题页或资源详情页，而不被迫回到首页。

## 4. 视觉方向：现代的编辑式学习指南

风格关键词：**clear, academic, practical, calm**。参考的是高质量出版物和工具型网站的层级感，不做儿童化教育 App，也不做千篇一律的蓝紫 SaaS 落地页。

| 元素 | 建议规格 |
|---|---|
| 页面 | 暖白 `#FAFAF8` 背景、深灰 `#171A21` 正文、白色内容区；内容宽 1120–1200px，文章宽 680–760px。 |
| 品牌色 | 深蓝 `#2454A6` 用于链接与主按钮；辅色墨绿 `#2E655A` 仅用于学习路径/标签。状态色语义固定。 |
| 字体 | 标题与正文用清晰的现代无衬线字体（如 Inter/系统字体）；公式继续用 KaTeX。正文 16–18px，行高约 1.55–1.65。 |
| 层级 | 每页一个明确 H1；标题由内容驱动，避免空泛口号。使用 8px 间距体系，段落与区块留白一致。 |
| 卡片 | 1px 中性边框、轻微圆角、几乎无阴影；优先展示信息，不重复装饰图标。 |
| 图形 | 以数学坐标、网格、公式片段或真实内容截图做少量视觉锚点，不用发光球、随机渐变和装饰性插画。 |
| 动效 | 仅保留 150–200ms 的状态反馈；支持 `prefers-reduced-motion`。无持续脉冲和大幅悬浮。 |
| 响应式 | 移动端单列；筛选以可折叠控件呈现；导航不挤压品牌；按钮触控区至少 44px 见方。 |

视觉验收：在 375、768、1024、1440px 检查无横向滚动、标题不截断、资源关键信息完整；键盘可到达所有功能，焦点清晰，文字与控件对比度按 WCAG 2.2 AA 检查。

## 5. 页面改版草案

### 首页

1. 顶部：品牌 + 5 项以内导航 + 语言；移动端提供可操作菜单。
2. Hero：一句清楚的价值主张、一句说明、主 CTA“Browse resources”、次 CTA“Explore topics”。
3. “What are you learning?”：先展示 Algebra 1、Geometry、Precalculus、Calculus、Statistics 等真实可浏览主题。
4. “Start with your goal”：例如 “Catch up on a class”、“Prepare for an exam”、“Learn a topic from scratch”；每个目标通向具体路径。
5. 精选资源：3–4 个条目，明确“适用水平/形式/费用/推荐原因”，不要没有依据的星级。
6. 方法说明：说明选材、价格与链接检查方式；若尚无定期检查流程，不写“定期更新”。
7. 页脚：About、Contact、Corrections、Privacy（仅放真实可访问页面）。

### 主题页与学习路径

页头先回答“适合谁、先学什么、学完能做什么”。主体采用 **先修知识 → 分步学习 → 对应资源 → 练习与自测 → 常见误区**。美国课程标签只是导航帮助，不能在未核对课纲时宣称与 AP 或州标准完全一致。

### 资源目录与详情

筛选建议：**Topic、Level、Format、Cost、Goal**；搜索和筛选状态写入 URL，支持分享与返回。每张卡片回答：*Best for / What you'll get / Cost / Why we included it / Caveat*。详情页补充提供者、适用先修、内容范围、上次核查日期、出站链接以及利益关系披露（如有）。

### 工具与公式页

只展示可用功能。基础计算器标题改为 “Basic Calculator”，增加键盘输入、清空与错误状态；“Scientific Calculator”等在实现前作为经过说明的外部推荐。公式页从展示公式升级为“定义 → 何时使用 → 逐步例题 → 常见错误 → 相关练习”，并检查当前 KaTeX 转义警告。

## 6. 英文内容重写示例

| 位置 | 建议英文文案 |
|---|---|
| 站名 | **OnlyMath**（简短品牌名；SEO 标题再补充任务关键词） |
| 首页 H1 | **Find the right math resource for your next step.** |
| 首页说明 | **Explore lessons, videos, practice tools, and courses organized by topic, level, and learning goal. See who each resource is best for before you open it.** |
| 主/次 CTA | **Browse resources** / **Explore topics** |
| 主题入口标题 | **What are you learning?** |
| 方法说明标题 | **How we choose resources** |
| 资源目录 H1 | **Math learning resources, organized around your goals.** |
| 资源卡片示例 | **Khan Academy · Free · Practice + video · Best for: rebuilding Algebra 1 fundamentals. Why it stands out: short lessons paired with practice. Keep in mind: course sequence may differ from your class.** |
| 计算器 | **Basic Calculator**；说明：**Add, subtract, multiply, and divide.** |

内容原则：用美式自然英语，少用 “comprehensive”“infinite possibilities”“world-class”；避免翻译腔。所有具体评价都要来自编辑实测或可验证的来源。资源信息建立维护字段：`owner`、`reviewedAt`、`priceCheckedAt`、`linkCheckedAt`、`evidence`，过期后降权或提示复核。不要自动生成没有独立价值的大量薄内容页。

## 7. 搜索与国际化

- 美国优先内容集群：Algebra 1、Geometry、Algebra 2、Precalculus、Calculus、Statistics 和 college-level linear algebra。先做深 3–5 个主题，再扩展其他学科。
- 为每个可索引页提供独立 title、description、H1 和与页面语言一致的 Open Graph 文案。`/en/...` 采用自引用 canonical；各语言有对应页时才互设 hreflang。修复当前所有页面指向 `/` 的 canonical。
- 维护资源页内部链接与面包屑，确保导航和 sitemap 只包含实际可访问页面；旧路径若变更，用永久重定向保留流量。
- 先形成原创“适用对象、比较依据、限制、学习顺序”再做 SEO。Google Search Central 提倡面向用户、可靠且有独立价值的内容，也建议多语言不同 URL 用 hreflang 标记。

参考：[Google 的有用内容指南](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)、[多语言站点指南](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)、[WCAG 2.2 快速参考](https://www.w3.org/WAI/WCAG22/quickref/)。

## 8. 实施顺序与验收

| 阶段 | 范围 | 验收方式 |
|---|---|---|
| A：可靠性 | 修复站内死链、无动作按钮与误导文案；全站语言路由核查。 | 核心入口逐个点击，目标页 200，语言保持；不存在可见死按钮。 |
| B：设计基础 | 定义字体、颜色、间距和组件；重做导航、首页、资源卡片与移动端。 | 4 个视口截图审查、键盘操作、对比度与触控检查。 |
| C：内容核心 | 完成英文首页、资源目录、首批 3–5 个主题与资源评测。 | 每页可回答目标用户问题；抽样外链、费用、适用水平有依据。 |
| D：增长与拓展 | 页面 metadata、hreflang、Search Console 监测；再扩展课程和语言。 | 索引页语言正确、canonical 正确；观察资源点击率与搜索落地页表现。 |

建议指标：主页到资源目录点击率、资源卡片出站点击率、筛选使用率、404 次数、按语言的退出率，以及资源页上的“内容有帮助”反馈。先记录基线，再设目标值，避免拍脑袋设增长百分比。

## 实施状态

- 已完成新的视觉系统、首页、主题指南、可筛选资源目录、工具页、基础计算器与公式示例。
- 站点默认语言改为英语；简体中文有独立根布局与自引用 canonical。其他尚未完成编辑本地化的语言路径暂时重定向，避免展示混合语言页面。
- 已删除不存在的功能承诺、无动作按钮、无依据星级和错误的站内目标地址。
- 已更新元信息、站点地图和图标。仍需部署后在真实域名复测用户反馈的具体历史入口，并定期核查第三方资源的价格和链接。
