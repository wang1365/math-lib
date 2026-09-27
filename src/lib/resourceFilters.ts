export type ResourceFilters = { q: string; topic: string; format: string }

type SearchParams = Record<string, string | string[] | undefined>

export function parseResourceFilters(params: SearchParams): ResourceFilters {
  const first = (key: string) => {
    const value = params[key]
    return Array.isArray(value) ? value[0] || '' : value || ''
  }
  return { q: first('q'), topic: first('topic'), format: first('format') }
}
