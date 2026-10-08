import { additionalResources } from './resource-additions'

export type TopicId = 'algebra' | 'geometry' | 'precalculus' | 'calculus' | 'statistics' | 'linear-algebra'
export type Format = 'Course' | 'Video' | 'Practice' | 'Tool' | 'Textbook' | 'Notes' | 'Collection'

export const topics: { id: TopicId; name: string; zh: string; level: string; levelZh: string; description: string; descriptionZh: string; steps: string[]; stepsZh: string[]; checkpoint: string; checkpointZh: string }[] = [
  { id: 'algebra', name: 'Algebra 1 & 2', zh: '代数 1 与 2', level: 'High school', levelZh: '高中', description: 'Equations, functions, and the skills that support later math.', descriptionZh: '从方程到函数，为后续数学学习打好基础。', steps: ['Solve linear equations and inequalities', 'Connect tables, graphs, and function notation', 'Study quadratics, polynomials, and exponentials'], stepsZh: ['求解一次方程与不等式', '建立表格、图像与函数符号的联系', '学习二次函数、多项式与指数函数'], checkpoint: 'Can you explain what the slope and intercept mean in a real problem?', checkpointZh: '你能解释实际问题中斜率与截距的含义吗？' },
  { id: 'geometry', name: 'Geometry', zh: '几何', level: 'High school', levelZh: '高中', description: 'Shapes, proofs, measurement, and spatial reasoning.', descriptionZh: '学习图形、证明、测量与空间推理。', steps: ['Review angles, triangles, and congruence', 'Practice short proofs and similarity', 'Apply circles, area, volume, and coordinate geometry'], stepsZh: ['复习角、三角形与全等', '练习简短证明与相似', '应用圆、面积、体积与解析几何'], checkpoint: 'Can you justify each step of a triangle proof?', checkpointZh: '你能解释三角形证明中每一步的依据吗？' },
  { id: 'precalculus', name: 'Precalculus', zh: '预备微积分', level: 'High school / college', levelZh: '高中／大学', description: 'Functions, trigonometry, and the bridge to calculus.', descriptionZh: '复习函数与三角，为微积分做好准备。', steps: ['Review function notation and transformations', 'Learn the unit circle and trigonometric graphs', 'Work with inverse functions, sequences, and introductory limits'], stepsZh: ['复习函数符号与图像变换', '掌握单位圆和三角函数图像', '学习反函数、数列与极限入门'], checkpoint: 'Can you describe how a function changes from its graph and formula?', checkpointZh: '你能通过图像和表达式描述函数如何变化吗？' },
  { id: 'calculus', name: 'Calculus', zh: '微积分', level: 'High school / college', levelZh: '高中／大学', description: 'Limits, derivatives, integrals, and their applications.', descriptionZh: '理解极限、导数、积分及其应用。', steps: ['Make sense of limits and continuity', 'Interpret derivatives as rates of change', 'Connect integrals to accumulation and area'], stepsZh: ['理解极限与连续', '将导数理解为变化率', '把积分与累积量、面积联系起来'], checkpoint: 'Can you explain a derivative and an integral in words, units, and a graph?', checkpointZh: '你能用文字、单位和图像解释导数与积分吗？' },
  { id: 'statistics', name: 'Statistics', zh: '统计学', level: 'High school / college', levelZh: '高中／大学', description: 'Explore data, probability, and statistical inference.', descriptionZh: '学习数据分析、概率和统计推断。', steps: ['Describe distributions and spot misleading summaries', 'Build probability models', 'Read confidence intervals and hypothesis tests'], stepsZh: ['描述数据分布并识别误导性摘要', '建立概率模型', '理解置信区间与假设检验'], checkpoint: 'Can you distinguish a sample result from a claim about a population?', checkpointZh: '你能区分样本结果与总体结论吗？' },
  { id: 'linear-algebra', name: 'Linear Algebra', zh: '线性代数', level: 'College', levelZh: '大学', description: 'Vectors, matrices, transformations, and eigenvalues.', descriptionZh: '学习向量、矩阵、线性变换和特征值。', steps: ['Build intuition with vectors and linear combinations', 'Solve systems with matrices', 'Interpret transformations, eigenvectors, and eigenvalues'], stepsZh: ['通过向量与线性组合建立直觉', '用矩阵求解方程组', '理解线性变换、特征向量和特征值'], checkpoint: 'Can you explain a matrix as a transformation, not only an array of numbers?', checkpointZh: '你能把矩阵解释为一种变换，而不只是一组数字吗？' },
]

export type Resource = {
  id: string
  name: string
  url: string
  format: Format
  cost: 'Free' | 'Free / paid'
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All levels'
  topics: TopicId[]
  summary: string
  summaryZh: string
  bestFor: string
  bestForZh: string
  caveat: string
  caveatZh: string
  checkedAt?: string
}

export const resources: Resource[] = [
  { id: 'khan', name: 'Khan Academy', url: 'https://www.khanacademy.org/math', format: 'Practice', cost: 'Free', level: 'Beginner', topics: ['algebra', 'geometry', 'precalculus', 'calculus', 'statistics'], summary: 'Short lessons paired with practice questions across school mathematics.', summaryZh: '将短课与练习题结合，覆盖学校数学的多个主题。', bestFor: 'Rebuilding fundamentals and practicing one skill at a time.', bestForZh: '补基础，或按知识点逐项练习。', caveat: 'The lesson order may differ from your class syllabus.', caveatZh: '课程顺序可能与你所在学校不同。', checkedAt: '2026-10-08' },
  { id: 'mit', name: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/search/?d=Mathematics', format: 'Course', cost: 'Free', level: 'Advanced', topics: ['calculus', 'statistics', 'linear-algebra'], summary: 'University course materials, including lectures and assignments where available.', summaryZh: '提供大学课程资料；部分课程包含讲座和作业。', bestFor: 'Independent learners ready for a university course.', bestForZh: '准备自主学习大学数学课程的人。', caveat: 'Materials vary by course and may require strong prerequisites.', caveatZh: '各课程资料不尽相同，且可能需要较强先修基础。' },
  { id: '3b1b', name: '3Blue1Brown', url: 'https://www.3blue1brown.com/', format: 'Video', cost: 'Free', level: 'Intermediate', topics: ['calculus', 'linear-algebra'], summary: 'Visual explanations of mathematical ideas and intuition.', summaryZh: '通过可视化讲解数学概念和直觉。', bestFor: 'Understanding why an idea works before formal practice.', bestForZh: '先理解概念，再进行正式练习。', caveat: 'Pair videos with exercises for procedural fluency.', caveatZh: '若要熟练解题，还需搭配练习。' },
  { id: 'desmos', name: 'Desmos Graphing Calculator', url: 'https://www.desmos.com/calculator', format: 'Tool', cost: 'Free', level: 'All levels', topics: ['algebra', 'precalculus', 'calculus'], summary: 'Interactive graphing for functions, equations, and data.', summaryZh: '交互式绘制函数、方程和数据图像。', bestFor: 'Exploring how changing an equation changes its graph.', bestForZh: '观察方程变化如何影响图像。', caveat: 'A graph can suggest an answer; show your reasoning separately.', caveatZh: '图像可帮助探索，仍需独立写出推理过程。' },
  { id: 'geogebra', name: 'GeoGebra', url: 'https://www.geogebra.org/', format: 'Tool', cost: 'Free', level: 'All levels', topics: ['geometry', 'algebra', 'calculus', 'statistics'], summary: 'Interactive geometry, algebra, graphing, and other math tools.', summaryZh: '提供交互式几何、代数、绘图等数学工具。', bestFor: 'Manipulating constructions and seeing relationships change.', bestForZh: '拖动构图并观察数学关系变化。', caveat: 'Choose the app that matches your task; the suite has several tools.', caveatZh: '套件包含多个工具，请根据任务选择。' },
  { id: 'leonard', name: 'Professor Leonard', url: 'https://www.youtube.com/@ProfessorLeonard', format: 'Video', cost: 'Free', level: 'Intermediate', topics: ['precalculus', 'calculus', 'statistics'], summary: 'Long-form classroom-style math lectures.', summaryZh: '以课堂讲授形式提供较完整的视频课程。', bestFor: 'Following a structured explanation from start to finish.', bestForZh: '希望跟随完整讲授逐步学习的人。', caveat: 'Lectures are long; plan time for notes and practice.', caveatZh: '视频较长，建议预留记笔记与练习时间。' },
  { id: 'coursera', name: 'Coursera', url: 'https://www.coursera.org/courses?query=mathematics', format: 'Course', cost: 'Free / paid', level: 'All levels', topics: ['algebra', 'calculus', 'statistics', 'linear-algebra'], summary: 'Math courses from multiple providers in one catalog.', summaryZh: '汇集不同提供方的数学课程。', bestFor: 'Comparing course structures and instructors.', bestForZh: '比较课程结构与讲师风格。', caveat: 'Access and certificate prices vary by course; check before enrolling.', caveatZh: '访问权限和证书价格因课程而异，请在报名时确认。' },
  { id: 'edx', name: 'edX', url: 'https://www.edx.org/learn/math', format: 'Course', cost: 'Free / paid', level: 'All levels', topics: ['calculus', 'statistics', 'linear-algebra'], summary: 'Online math courses from universities and other providers.', summaryZh: '提供大学及其他机构的在线数学课程。', bestFor: 'Learners who want a guided course format.', bestForZh: '希望按课程结构系统学习的人。', caveat: 'Audit access and paid options depend on the course.', caveatZh: '旁听与付费选项取决于具体课程。' },
  ...additionalResources,
]

export const featuredResourceIds = ['khan', '3b1b', 'desmos']
