export type TrustPageKey = 'about' | 'privacy' | 'terms'

type TrustSection = {
  heading: string
  body: string[]
}

type TrustPage = {
  title: string
  description: string
  updated: string
  sections: TrustSection[]
}

type TrustContent = Record<TrustPageKey, TrustPage>

const zhContent: TrustContent = {
  about: {
    title: '关于 OnlyMath',
    description: 'OnlyMath 是一个面向数学学习者的资源筛选、学习路径和在线工具网站。',
    updated: '2026-05-22',
    sections: [
      {
        heading: '我们做什么',
        body: [
          'OnlyMath 汇总并筛选数学学习资源，帮助学生、自学者和研究者更快找到合适的课程、工具、公式示例和学习路径。',
          '网站会优先补充原创说明、资源评测、学习建议和可直接使用的数学工具，而不是只做外部链接列表。'
        ]
      },
      {
        heading: '内容原则',
        body: [
          '我们关注资源的准确性、可访问性、学习难度、适用阶段和实际使用价值。',
          '外部资源链接会标明来源，并尽量提供使用建议、适合人群和注意事项。'
        ]
      },
      {
        heading: '维护者',
        body: [
          'OnlyMath 由 Xiaochuan Wang 维护。欢迎通过联系页面反馈错误、推荐资源或提出合作建议。'
        ]
      }
    ]
  },
  privacy: {
    title: '隐私政策',
    description: '了解 OnlyMath 如何处理联系信息、分析数据、Cookie 和 Google 广告相关数据。',
    updated: '2026-05-22',
    sections: [
      {
        heading: '我们收集的信息',
        body: [
          '当你通过联系表单发送反馈时，表单会打开你的邮件客户端；网站本身不会保存表单数据库。',
          '我们可能使用 Google Analytics 了解页面访问、设备类型、来源页面和基础互动情况，用于改进内容和体验。'
        ]
      },
      {
        heading: 'Cookie 与广告',
        body: [
          'OnlyMath 可能使用 Google AdSense 展示广告。Google 及其合作伙伴可能使用 Cookie 或类似技术，根据你访问本网站和其他网站的情况投放、衡量和改进广告。',
          '你可以访问 Google 广告设置页面管理个性化广告，也可以在浏览器中限制或清除 Cookie。'
        ]
      },
      {
        heading: '外部链接',
        body: [
          '本站包含指向第三方数学课程、工具和视频平台的链接。第三方网站的隐私实践由其自身政策约束，访问前建议阅读对应网站的隐私说明。'
        ]
      },
      {
        heading: '联系我们',
        body: [
          '如需询问隐私相关问题，请通过联系页面发送邮件。'
        ]
      }
    ]
  },
  terms: {
    title: '使用条款',
    description: 'OnlyMath 的网站使用规则、内容免责声明和外部链接说明。',
    updated: '2026-05-22',
    sections: [
      {
        heading: '内容用途',
        body: [
          'OnlyMath 提供的学习资料、示例和工具用于教育与参考目的，不构成考试、学术、法律或财务建议。',
          '我们会努力保持内容准确，但数学学习材料仍可能存在疏漏，使用时请结合教材、课程或专业资料核对。'
        ]
      },
      {
        heading: '外部资源',
        body: [
          '本站会链接到第三方课程、视频、工具和文档。我们不控制第三方网站的内容、收费、可用性或服务条款。',
          '访问外部网站时，请自行判断其适用性和安全性。'
        ]
      },
      {
        heading: '合理使用',
        body: [
          '请不要尝试破坏网站、滥用表单、批量抓取影响服务稳定性，或将本站内容用于误导性场景。'
        ]
      }
    ]
  }
}

const enContent: TrustContent = {
  about: {
    title: 'About OnlyMath',
    description: 'OnlyMath is a curated math learning site with resource reviews, learning paths, examples, and online tools.',
    updated: '2026-05-22',
    sections: [
      {
        heading: 'What we do',
        body: [
          'OnlyMath helps students, self-learners, and researchers find useful mathematics courses, tools, formula examples, and learning paths.',
          'The site is being developed around original explanations, resource reviews, study guidance, and practical tools rather than link lists alone.'
        ]
      },
      {
        heading: 'Content standards',
        body: [
          'We evaluate resources by accuracy, accessibility, difficulty, learning stage, and practical usefulness.',
          'External resources are linked with context such as who they are best for, how to use them, and what to watch for.'
        ]
      },
      {
        heading: 'Maintainer',
        body: [
          'OnlyMath is maintained by Xiaochuan Wang. Feedback, corrections, and resource suggestions are welcome through the contact page.'
        ]
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How OnlyMath handles contact information, analytics data, cookies, and Google advertising data.',
    updated: '2026-05-22',
    sections: [
      {
        heading: 'Information we collect',
        body: [
          'When you use the contact form, the form opens your email client; the site does not store messages in its own database.',
          'We may use Google Analytics to understand page visits, device types, traffic sources, and basic interactions so we can improve the site.'
        ]
      },
      {
        heading: 'Cookies and advertising',
        body: [
          'OnlyMath may use Google AdSense to display ads. Google and its partners may use cookies or similar technologies to serve, measure, and improve ads based on visits to this site and other sites.',
          'You can manage personalized ads through Google Ads Settings, and you can restrict or clear cookies in your browser.'
        ]
      },
      {
        heading: 'External links',
        body: [
          'This site links to third-party math courses, tools, and video platforms. Those sites are governed by their own privacy practices.'
        ]
      },
      {
        heading: 'Contact',
        body: [
          'For privacy questions, please contact us through the contact page.'
        ]
      }
    ]
  },
  terms: {
    title: 'Terms of Use',
    description: 'Rules for using OnlyMath, including content disclaimers and external-link terms.',
    updated: '2026-05-22',
    sections: [
      {
        heading: 'Educational use',
        body: [
          'OnlyMath provides learning materials, examples, and tools for educational reference. It is not exam, academic, legal, or financial advice.',
          'We work to keep content accurate, but math learning material can still contain omissions. Cross-check important work with textbooks, courses, or professional references.'
        ]
      },
      {
        heading: 'External resources',
        body: [
          'The site links to third-party courses, videos, tools, and documentation. We do not control third-party content, pricing, availability, or terms.',
          'Use your own judgment when visiting external sites.'
        ]
      },
      {
        heading: 'Acceptable use',
        body: [
          'Do not attempt to disrupt the site, abuse forms, scrape in ways that affect stability, or use the content in misleading contexts.'
        ]
      }
    ]
  }
}

export function getTrustContent(locale: string, page: TrustPageKey) {
  return (locale === 'zh-CN' || locale === 'zh-TW' ? zhContent : enContent)[page]
}
