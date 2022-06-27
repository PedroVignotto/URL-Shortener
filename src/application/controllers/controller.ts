import { HttpResponse, notFound, serverError } from '@/application/helpers'
import { FieldNotFoundError } from '@/domain/errors'

export abstract class Controller {
  abstract perform (httpRequest?: any): Promise<HttpResponse>

  async handle (httpRequest?: any): Promise<HttpResponse> {
    try {
      return await this.perform(httpRequest)
    } catch (error: unknown) {
      if (error instanceof FieldNotFoundError) return notFound()
      return serverError(error)
    }
  }
}
