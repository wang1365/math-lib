'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('wangxiaochuan01@163.com')
  const [message, setMessage] = useState('')

  const recipient = 'wangxiaochuan01@163.com'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `来自 ${name || '匿名'} 的网站联系`
    const body = `姓名: ${name}\n邮箱: ${email}\n\n内容:\n${message}`
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入您的姓名"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
        <input
          type="email"
          value={email}
          readOnly
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="用于回复您的邮箱"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full min-h-32 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入您要咨询或反馈的内容"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          发送邮件
        </button>
        <a
          href={`mailto:${recipient}`}
          className="text-blue-600 px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors"
        >
          直接打开邮件客户端
        </a>
      </div>
    </form>
  )
}