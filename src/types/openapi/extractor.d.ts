import type { components, paths } from './autoGenerated'

export type OpenApiPath = keyof paths
export type OpenApiMethod<Path extends OpenApiPath> = keyof paths[Path]

export type Response<
  Path extends OpenApiPath,
  Method extends OpenApiMethod<Path>,
  Status extends
    keyof paths[Path][Method]['responses'] = 200 extends keyof paths[Path][Method]['responses']
    ? 200
    : 201,
> = paths[Path][Method]['responses'][Status]['content']['application/json']

export type RequestBody<
  Path extends OpenApiPath,
  Method extends OpenApiMethod<Path>,
> = paths[Path][Method]['requestBody']['content']['application/json']

export type PathParameter<
  Path extends OpenApiPath,
  Method extends OpenApiMethod<Path>,
> = paths[Path][Method]['parameters']['path']

export type QueryParameter<
  Path extends OpenApiPath,
  Method extends OpenApiMethod<Path>,
> = paths[Path][Method]['parameters']['query']

export type Schema<T extends keyof components['schemas']> =
  components['schemas'][T]

/**
 * リクエストボディのプロパティを必須と任意の判別を行いつつdataのキーに格納された型情報
 */
export type RequestBodyProperties<
  Path extends OpenApiPath,
  Method extends OpenApiMethod<Path>,
> = paths[Path][Method] extends {
  requestBody: {
    content: {
      'application/json': RequestBody<Path, Method>
    }
  }
}
  ? { data: RequestBody<Path, Method> }
  : paths[Path][Method] extends {
      requestBody?: {
        content: {
          'application/json': infer Data
        }
      }
    }
  ? { data?: Data }
  : paths[Path][Method] extends {
      requestBody: {
        content: {
          'multipart/form-data': Record<string, unknown>
        }
      }
    }
  ? { data: FormData }
  : paths[Path][Method] extends {
      requestBody?: {
        content: {
          'multipart/form-data'?: Record<string, unknown>
        }
      }
    }
  ? { data?: FormData }
  : { data?: undefined }

/**
 * エンドポイントのpath・queryパラメータを必須と任意の判別を行い、それぞれpath・queryのキーに格納された型情報
 */
export type ParameterProperties<
  Path extends OpenApiPath,
  Method extends OpenApiMethod<Path>,
  Params,
  Type extends 'path' | 'query',
> = paths[Path][Method] extends { parameters: { [Key in Type]: Params } }
  ? { [Key in Type]: Params }
  : paths[Path][Method] extends { parameters: { [Key in Type]?: Params } }
  ? { [Key in Type]?: Params }
  : { [Key in Type]?: undefined }
