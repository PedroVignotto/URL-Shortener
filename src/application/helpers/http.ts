export type HttpResponse<T = any> = { statusCode: number, data: T }

export const created = (): HttpResponse => ({
  statusCode: 204,
  data: null
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})
