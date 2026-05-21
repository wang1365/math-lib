import { getTrustContent, type TrustPageKey } from '@/lib/trustContent'

type TrustPageProps = {
  locale: string
  page: TrustPageKey
}

export default function TrustPage({ locale, page }: TrustPageProps) {
  const content = getTrustContent(locale, page)

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl rounded-xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
        <header className="mb-8">
          <p className="mb-3 text-sm font-medium text-blue-600">
            Last updated: {content.updated}
          </p>
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {content.title}
          </h1>
          <p className="text-lg text-gray-600">
            {content.description}
          </p>
        </header>

        <div className="space-y-8">
          {content.sections.map(section => (
            <section key={section.heading}>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                {section.heading}
              </h2>
              <div className="space-y-3 text-gray-700">
                {section.body.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  )
}
