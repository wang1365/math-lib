# 数学资源库网站

一个基于Next.js和Tailwind CSS构建的现代化数学资源展示网站，专为SEO优化和Google Ads集成而设计。

## 🎯 项目特色

- **现代化设计**: 使用Tailwind CSS构建美观的用户界面
- **SEO优化**: 完整的meta标签、sitemap、robots.txt配置
- **Google Ads集成**: 支持Google AdSense广告展示
- **数学公式渲染**: 集成KaTeX支持LaTeX数学公式
- **响应式设计**: 完美适配各种设备尺寸
- **性能优化**: 基于Next.js构建，支持静态生成和服务器端渲染

## 🚀 技术栈

- **前端框架**: Next.js 14 (React 19)
- **样式**: Tailwind CSS
- **数学公式**: KaTeX + react-katex
- **SEO**: next-seo
- **图标**: Lucide React
- **部署**: Vercel ready

## 📁 项目结构

```
math-resources-site/
├── src/
│   ├── app/
│   │   ├── components/     # 共享组件
│   │   │   ├── Layout.tsx
│   │   │   ├── AdBanner.tsx
│   │   │   └── MathFormula.tsx
│   │   ├── page.tsx        # 首页
│   │   ├── layout.tsx      # 根布局
│   │   ├── resources/      # 学习资源页面
│   │   ├── branches/       # 数学分支页面
│   │   ├── tools/          # 数学工具页面
│   │   ├── calculator/     # 计算器页面
│   │   └── examples/       # 数学公式示例页面
│   └── ...
├── public/
│   ├── robots.txt          # SEO配置
│   ├── sitemap.xml         # 网站地图
│   └── site.webmanifest    # PWA配置
└── ...
```

## 🎨 主要页面

### 首页
- 展示网站核心价值和特色功能
- 热门资源推荐
- 响应式Hero区域设计

### 学习资源页面
- 分类展示数学学习资源
- 包含学习平台、视频课程、数学工具、百科全书
- 支持资源评分和难度标识
- 集成Google Ads广告位

### 数学分支页面
- 详细介绍各个数学分支
- 按难度和学习路径分类
- 提供学习建议和资源链接

### 数学工具页面
- 展示各类数学计算工具
- 支持工具分类筛选
- 推荐第三方专业工具

### 计算器页面
- 功能完整的在线计算器
- 支持基础数学运算
- 展示数学公式和概念

### 公式示例页面
- 展示经典数学公式
- 支持LaTeX渲染
- 提供公式说明和应用示例

## 🔧 SEO优化

### Meta标签配置
- 完整的title、description、keywords配置
- Open Graph和Twitter Card支持
- 结构化数据标记

### 技术SEO
- 自动生成sitemap.xml
- robots.txt配置
- 规范URL设置
- 移动端优化

### 性能优化
- Next.js静态生成优化
- 图片优化和懒加载
- CSS和JavaScript压缩
- CDN加速支持

## 💰 Google Ads集成

### 广告位配置
- 页头横幅广告
- 内容中间矩形广告
- 页底横幅广告
- 响应式广告单元

### 使用说明
1. 在`layout.tsx`中替换Google AdSense客户端ID
2. 在`AdBanner.tsx`组件中配置广告槽位
3. 根据需要调整广告位置和格式

## 📊 数学资源内容

基于提供的README.md文件，网站包含以下数学资源分类：

### 学习平台
- Khan Academy、MIT OpenCourseWare、Coursera等
- 涵盖从基础到高级的完整课程体系

### 视频课程
- 3Blue1Brown、Professor Leonard等优质频道
- 可视化数学概念讲解

### 数学工具
- Wolfram Alpha、Desmos、GeoGebra等
- 计算、绘图、建模工具

### 数学百科
- Wolfram MathWorld、Encyclopedia of Mathematics等
- 详细的数学概念解释和证明

### 数学分支
- 基础数学、高等数学、理论数学、应用数学
- 离散数学、数学物理等专门领域

## 🚀 部署

### Vercel部署
1. 将代码推送到GitHub
2. 连接Vercel到GitHub仓库
3. 自动部署和域名配置

### 环境变量
```bash
# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=your-adsense-client-id

# Google Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 🔧 开发

### 安装依赖
```bash
npm install
```

### 开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
npm start
```

## 📈 引流策略

### SEO优化
- 关键词优化：数学学习、在线数学、数学资源等
- 内容结构优化：清晰的标题层次和内容组织
- 技术SEO：sitemap、robots.txt、meta标签等

### 内容营销
- 高质量的数学资源整理
- 定期更新和扩展内容
- 社交媒体分享和推广

### 用户体验
- 快速加载和响应式设计
- 清晰的导航和信息架构
- 有价值的数学工具和功能

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 📞 联系

如有问题或建议，请通过以下方式联系：
- 邮箱：your-email@example.com
- GitHub Issues