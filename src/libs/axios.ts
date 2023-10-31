import { addUrlQueries, replaceUrlPaths } from '@/helpers/urlHelper'
import { OpenApiPath, OpenApiMethod, Response, ParameterProperties, PathParameter, QueryParameter, RequestBodyProperties } from '@/types/openapi/extractor'
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

type CustomAxiosRequestConfig<
  Path extends OpenApiPath,
  Method extends OpenApiMethod<Path>,
> = Omit<AxiosRequestConfig, 'data'> & {
  url: Path
  method: Method
} & RequestBodyProperties<Path, Method> &
  ParameterProperties<Path, Method, PathParameter<Path, Method>, 'path'> &
  ParameterProperties<Path, Method, QueryParameter<Path, Method>, 'query'>

class axios {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = Axios.create()
  }

  openapi<Path extends OpenApiPath, Method extends OpenApiMethod<Path>>(
    config: CustomAxiosRequestConfig<Path, Method>,
  ): Promise<AxiosResponse<Response<Path, Method>>> {
    const { url, path, query, ...baseConfig } = config

    const requestConfig = {
      ...baseConfig,
      url: addUrlQueries(replaceUrlPaths(url, path), query),
    }

    return this.axiosInstance.request<
      Response<Path, Method>,
      AxiosResponse<Response<Path, Method>>,
      CustomAxiosRequestConfig<Path, Method>['data']
    >(requestConfig)
  }
}

export default new axios()