const apiUrl = import.meta.env.VITE_KINOPOISK_API_URL
const apiKey = import.meta.env.VITE_KINOPOISK_API_KEY

if (!apiUrl) {
  throw new Error('VITE_KINOPOISK_API_URL is not set')
}

if (!apiKey) {
  throw new Error('VITE_KINOPOISK_API_KEY is not set')
}

const normalizeApiRootUrl = (value: string) => {
  const withoutVersion = value.replace(/\/v1(\.4)?\/?$/, '')
  try {
    const parsedUrl = new URL(withoutVersion)
    if (parsedUrl.hostname === 'api.kinopoisk.dev') {
      parsedUrl.hostname = 'api.poiskkino.dev'
    }

    return `${parsedUrl.origin}${parsedUrl.pathname}`.replace(/\/$/, '')
  } catch {
    return withoutVersion
  }
}

const apiRootUrl = normalizeApiRootUrl(apiUrl)

export const env = {
  apiRootUrl,
  apiKey,
}
