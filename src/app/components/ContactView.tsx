import { ArrowUpRight, Mail } from 'lucide-react'

const address = 'wangxiaochuan01@163.com'

export default function ContactView({ locale }: { locale: string }) {
  const zh = locale === 'zh-CN'
  return <div className="container-wide page-content">
    <div className="contact-layout">
      <header className="page-heading">
        <p className="eyebrow accent">{zh ? '联系' : 'GET IN TOUCH'}</p>
        <h1>{zh ? '帮助我们把 OnlyMath 做得更好。' : 'Help make OnlyMath better.'}</h1>
        <p>{zh ? '发现错误、想推荐可靠的数学资源，或有合作想法？欢迎发邮件。' : 'Found an error, know a strong math resource, or have an idea for working together? We would like to hear from you.'}</p>
      </header>
      <div className="contact-card">
        <Mail size={24} aria-hidden="true" />
        <h2>{zh ? '通过电子邮件联系' : 'Email us directly'}</h2>
        <p>{zh ? '点击下方按钮会打开你的邮件应用。邮件将由你的邮件服务发送，本站不会保存一份网页表单记录。' : 'The link opens your email app. Your message is sent through your email provider; this site does not store a web form submission.'}</p>
        <a className="button button-primary" href={`mailto:${address}?subject=${encodeURIComponent('OnlyMath feedback')}`}>{address} <ArrowUpRight size={17} /></a>
        <p className="contact-hint">{zh ? '建议附上相关页面链接，并简要说明问题或建议。' : 'A link to the relevant page and a short description helps us act on your feedback.'}</p>
      </div>
    </div>
  </div>
}
