'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { localPath, siteCopy } from '@/lib/site-copy'

export default function Layout({ children, locale: suppliedLocale }: { children: React.ReactNode; locale?: string }) {
  const currentLocale = useLocale()
  const locale = suppliedLocale || currentLocale
  const c = siteCopy(locale)
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = [
    { label: c.topics, path: '/branches' },
    { label: c.resources, path: '/resources' },
    { label: c.tools, path: '/tools' },
    { label: c.calculator, path: '/calculator' },
  ]

  return <div className="site-shell">
    <a className="skip-link" href="#main-content">{locale.startsWith('zh') ? '跳到主要内容' : 'Skip to content'}</a>
    <header className="site-header">
      <div className="site-header-inner container-wide">
        <Link className="brand" href={localPath(locale, '/')} aria-label={`${c.brand} — ${c.home}`} onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">∑</span><span>{c.brand}</span>
        </Link>
        <nav className="desktop-nav" aria-label={locale.startsWith('zh') ? '主导航' : 'Main navigation'}>
          {nav.map(item => {
            const href = localPath(locale, item.path)
            const active = pathname === href || pathname.startsWith(`${href}/`)
            return <Link key={item.path} href={href} className={active ? 'nav-link active' : 'nav-link'} aria-current={active ? 'page' : undefined}>{item.label}</Link>
          })}
        </nav>
        <div className="header-actions"><LanguageSwitcher /><button className="menu-toggle" type="button" aria-label={menuOpen ? c.closeMenu : c.menu} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="mobile-nav container-wide" aria-label={locale.startsWith('zh') ? '移动端导航' : 'Mobile navigation'}>
        {nav.map(item => <Link key={item.path} href={localPath(locale, item.path)} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={17} aria-hidden="true" /></Link>)}
      </nav>}
    </header>
    <main id="main-content">{children}</main>
    <footer className="site-footer"><div className="container-wide footer-grid">
      <div><Link className="brand footer-brand" href={localPath(locale, '/')}><span className="brand-mark" aria-hidden="true">∑</span><span>{c.brand}</span></Link><p>{c.footer}</p></div>
      <div><h2>{locale.startsWith('zh') ? '探索' : 'Explore'}</h2><Link href={localPath(locale, '/branches')}>{c.topics}</Link><Link href={localPath(locale, '/resources')}>{c.resources}</Link><Link href={localPath(locale, '/tools')}>{c.tools}</Link><Link href={localPath(locale, '/examples')}>{c.examples}</Link></div>
      <div><h2>{locale.startsWith('zh') ? '联系' : 'Get in touch'}</h2><a href="mailto:wangxiaochuan01@163.com?subject=OnlyMath%20feedback">{c.contact} <ArrowUpRight size={15} aria-hidden="true" /></a><p className="footer-note">© {new Date().getFullYear()} OnlyMath</p></div>
    </div></footer>
  </div>
}
