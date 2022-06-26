import { RequiredFieldError } from '@/application/errors'
import { badRequest, created, HttpResponse, serverError } from '@/application/helpers'
import { AddShortenURL } from '@/domain/use-cases'

type HttpRequest = { originalURL: string }
type Model = { shortURL: string } | Error

export class AddShortenURLController {
  constructor (private readonly addShortenURL: AddShortenURL) {}

  async handle ({ originalURL }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (!originalURL) return badRequest(new RequiredFieldError('originalURL'))
      const code = await this.addShortenURL({ originalURL })
      return created({ shortURL: `${process.env.APP_URL!}/${code}` })
    } catch (error: unknown) {
      return serverError(error)
    }
  }
}
