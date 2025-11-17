'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ContactForm() {
  const ct = useTranslations('contact')
  const [name, setName] = useState('')
  const [email] = useState('wangxiaochuan01@163.com')
  const [message, setMessage] = useState('')

  const recipient = 'wangxiaochuan01@163.com'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = ct('emailSubject', { name: name || ct('anonymous') })
    const body = ct('emailBodyTemplate', { name: name || ct('anonymous'), email, message })
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{ct('nameLabel')}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={ct('placeholderName')}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{ct('emailLabel')}</label>
        <input
          type="email"
          value={email}
          readOnly
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={ct('placeholderEmail')}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{ct('messageLabel')}</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full min-h-32 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={ct('placeholderMessage')}
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {ct('sendButton')}
        </button>
        <a
          href={`mailto:${recipient}`}
          className="text-blue-600 px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors"
        >
          {ct('openClientButton')}
        </a>
      </div>
    </form>
  )
}