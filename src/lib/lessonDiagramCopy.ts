import type { LessonDiagramId } from './lessonDiagramModels'

export function lessonDiagramCopy(id: LessonDiagramId, locale: string) {
  const t = (en: string, zh: string) => locale === 'zh-CN' ? zh : en
  const shared = {
    timeMinutes: t('Time t (min)', '时间 t（分钟）'),
    volume: t('Volume V (L)', '水量 V（升）'),
    timeSeconds: t('Time t (s)', '时间 t（秒）'),
    velocity: t('Velocity (m/s)', '速度（米/秒）'),
    speed: t('Speed (m/s)', '速率（米/秒）'),
    meter: t('m', '米'),
    slopeTime: t('Δt = 3 min', 'Δt = 3 分钟'),
    slopeVolume: t('ΔV = −12 L', 'ΔV = −12 升'),
    included: t('Filled point: −3 is included', '实心点：包含 −3'),
    ray: t('Rightward ray: x ≥ −3', '向右的射线：x ≥ −3'),
    displacement: t('Signed area → displacement', '带符号面积 → 位移'),
    distance: t('Absolute area → distance', '绝对值面积 → 路程'),
    displacementTotal: t('−4 m + 1 m = −3 m', '−4 米 + 1 米 = −3 米'),
    distanceTotal: t('4 m + 1 m = 5 m', '4 米 + 1 米 = 5 米'),
  }
  const content = {
    inequality: {
      title: t('Include −3 and every larger number', '包含 −3 与所有更大的数'),
      caption: t('For 5 − 3x ≤ 14, dividing −3x ≤ 9 by −3 reverses the sign: x ≥ −3. A filled endpoint includes equality; the rightward arrow continues without end.', '对于 5 − 3x ≤ 14，把 −3x ≤ 9 两边除以 −3 时不等号反向，得到 x ≥ −3。实心端点表示包含等号，向右的箭头表示解集无限延伸。'),
      description: t('Number line showing x ≥ −3. A filled circle at −3 and a ray to the right include −3 and every greater real number. For example, −4 is excluded and 0 is included. The original inequality is 5 − 3x ≤ 14.', '数轴表示 x ≥ −3：−3 处为实心点，射线向右，包含 −3 与所有大于 −3 的实数。例如 −4 不在解集中，0 在解集中。原不等式为 5 − 3x ≤ 14。'),
    },
    'draining-tank': {
      title: t('A falling line, a constant draining rate', '下降的直线，恒定的排水速率'),
      caption: t('V(t) = 34 − 4t, with time in minutes and volume in liters. The dashed slope triangle shows 3 more minutes and 12 fewer liters: −12 ÷ 3 = −4 L/min. The segment stops at the empty tank, t = 8.5.', 'V(t) = 34 − 4t，时间单位为分钟，水量单位为升。虚线斜率三角形表示时间增加 3 分钟、水量减少 12 升：−12 ÷ 3 = −4 升/分钟。线段在水箱排空时结束，即 t = 8.5。'),
      description: t('Volume versus time graph on the physical domain 0 ≤ t ≤ 8.5 minutes. A line segment joins (0, 34), (2, 26), (5, 14), and (8.5, 0), with volume in liters. Its slope is −4 liters per minute. There is no continuation into negative volume.', '水量与时间图，实际定义域为 0 ≤ t ≤ 8.5 分钟。线段连接 (0, 34)、(2, 26)、(5, 14) 和 (8.5, 0)，水量单位为升。斜率为 −4 升/分钟，图像不延伸到负水量区域。'),
    },
    'removable-limit': {
      title: t('Approach the hole from both sides', '从两侧趋近空点'),
      caption: t('The quotient (x² − 9)/(x − 3) follows y = x + 3 only for x ≠ 3. Both arrows approach the open point (3, 6), so the limit is 6. The open point means f(3) is undefined; a limit does not fill the hole.', '分式 (x² − 9)/(x − 3) 仅在 x ≠ 3 时与 y = x + 3 一致。两个箭头都趋近空心点 (3, 6)，所以极限为 6。空心点表示 f(3) 无定义；极限不会自动补上空点。'),
      description: t('The line y = x + 3 is drawn with an open circle at (3, 6). Dashed guides meet x = 3 and y = 6. An arrow from smaller x and another from larger x both point toward the hole. The left and right limits equal 6, while f(3) is undefined. The displayed window is 0 ≤ x ≤ 5; the function is defined for all real x except 3.', '直线 y = x + 3 在 (3, 6) 处留有空心点，虚线辅助线分别对应 x = 3 和 y = 6。左右两侧的箭头均指向空点，左右极限都为 6，但 f(3) 无定义。图中展示 0 ≤ x ≤ 5 的窗口，函数的定义域为除 3 外的所有实数。'),
    },
    'velocity-area': {
      title: t('Same motion, two ways to count area', '同一运动，两种面积算法'),
      caption: t('For v(t) = 2t − 4 on 0 ≤ t ≤ 3 seconds, the striped region below the time axis contributes −4 m and the dotted region above contributes +1 m. Displacement is −3 m. Reflect the negative part upward to graph |v(t)|: distance is 4 + 1 = 5 m. Both plots use the same scale.', '对于 0 ≤ t ≤ 3 秒上的 v(t) = 2t − 4，时间轴下方的斜线区域贡献 −4 米，上方的点状区域贡献 +1 米，位移为 −3 米。将负的部分向上翻折得到 |v(t)|，路程为 4 + 1 = 5 米。两图使用相同刻度。'),
      description: t('Two graphs compare velocity and speed over 0 to 3 seconds. Velocity connects (0, −4), (2, 0), and (3, 2), in meters per second. The triangle below the axis has signed area −4 meters; the triangle above has area +1 meter. Their signed sum is −3 meters displacement. Speed connects (0, 4), (2, 0), and (3, 2). Both speed areas are positive, totaling 5 meters distance. Velocity changes sign at 2 seconds.', '两幅图比较 0 到 3 秒内的速度与速率。速度线连接 (0, −4)、(2, 0) 和 (3, 2)，单位为米/秒。轴下三角形的带符号面积为 −4 米，轴上三角形面积为 +1 米，相加得到位移 −3 米。速率线连接 (0, 4)、(2, 0) 和 (3, 2)，两个面积均为正，相加得到路程 5 米。速度在 2 秒时变号。'),
    },
  }
  return { ...shared, ...content[id] }
}
