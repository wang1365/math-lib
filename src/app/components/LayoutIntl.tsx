'use client'

import Link from 'next/link'
import { BookOpen, Home, Library, Calculator, Menu, X, Plus, Hash } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

interface LayoutProps {
  children: React.ReactNode
  locale?: string
}

export default function Layout({ children, locale }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations('common')

  const navigation = [
    { name: t('navigation.home'), href: '/', icon: Home },
    { name: t('navigation.resources'), href: '/resources', icon: BookOpen },
    { name: t('navigation.branches'), href: '/branches', icon: Library },
    { name: t('navigation.tools'), href: '/tools', icon: Calculator },
    { name: t('navigation.calculator'), href: '/calculator', icon: Calculator },
    { name: t('navigation.examples'), href: '/examples', icon: Hash },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  <span className="text-white font-bold text-xl">∑</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {t('siteTitle')}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group relative flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-blue-50/50 hover:shadow-sm"
                >
                  <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative">
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
              
              {/* Language Switcher */}
              <div className="ml-4">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <div className="mr-2">
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-600 p-3 rounded-lg hover:bg-blue-50/50 transition-all duration-300"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50">
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:translate-x-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">∑</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {t('siteTitle')}
                </span>
              </div>
              <p className="text-gray-300 mb-6">
                {t('siteDescription')}
              </p>
              <div className="text-sm text-gray-400">
                <p>{t('footer.copyright')}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-3">
                <li><Link href="/resources" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300"><span className="w-2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>{t('navigation.resources')}</Link></li>
                <li><Link href="/branches" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300"><span className="w-2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>{t('navigation.branches')}</Link></li>
                <li><Link href="/tools" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300"><span className="w-2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>{t('navigation.tools')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {t('footer.contactUs')}
              </h3>
              <p className="text-gray-300 text-sm">
                有任何问题或建议，欢迎联系我们。
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}