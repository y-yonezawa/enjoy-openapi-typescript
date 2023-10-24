import type {
  OpenApiMethod,
  OpenApiPath,
  PathParameter,
  QueryParameter,
} from '@/types/openapi/extractor'

/**
 * URLのパスパラメータを置換する
 */
export const replaceUrlPaths = <
  Path extends OpenApiPath,
  Method extends OpenApiMethod<Path>,
>(
  url: Path,
  path?: PathParameter<Path, Method>,
) => {
  if (!path) return url

  return Object.entries(path).reduce((prevUrl, [key, value]) => {
    if (value === null) return prevUrl
    return prevUrl.replace(`{${key}}`, String(value))
  }, url as string)
}

/**
 * URLのクエリパラメータを付与する
 */
export const addUrlQueries = <
  Path extends OpenApiPath,
  Method extends OpenApiMethod<Path>,
>(
  url: string,
  query?: QueryParameter<Path, Method>,
) => {
  if (!query) return url

  const queries = Object.entries(query)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([key, value]) => {
      return `${key}=${encodeURIComponent(String(value))}`
    })

  if (queries.length === 0) return url

  return `${url}?${queries.join('&')}`
}
