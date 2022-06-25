import { RequiredFieldError } from '@/application/errors'
import { badRequest, created, HttpResponse } from '@/application/helpers'

type HttpRequest = { originalURL: string }
type Model = undefined | Error

export class AddShortenURLController {
  async handle ({ originalURL }: HttpRequest): Promise<HttpResponse<Model>> {
    if (!originalURL) return badRequest(new RequiredFieldError('originalURL'))
    return created()
  }
}
