import { RequiredFieldError } from '@/application/errors'
import { badRequest, created, HttpResponse, serverError } from '@/application/helpers'
import { AddShortenURL } from '@/domain/use-cases'

type HttpRequest = { originalURL: string }
type Model = undefined | Error

export class AddShortenURLController {
  constructor (private readonly addShortenURL: AddShortenURL) {}

  async handle ({ originalURL }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (!originalURL) return badRequest(new RequiredFieldError('originalURL'))
      await this.addShortenURL({ originalURL })
      return created()
    } catch (error: unknown) {
      return serverError(error)
    }
  }
}
