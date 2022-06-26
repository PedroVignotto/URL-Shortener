import { Controller } from '@/application/controllers'
import { RequiredFieldError } from '@/application/errors'
import { badRequest, created, HttpResponse } from '@/application/helpers'
import { AddShortenURL } from '@/domain/use-cases'

type HttpRequest = { originalURL: string }
type Model = { shortURL: string } | Error

export class AddShortenURLController extends Controller {
  constructor (private readonly addShortenURL: AddShortenURL) { super() }

  async perform ({ originalURL }: HttpRequest): Promise<HttpResponse<Model>> {
    if (!originalURL) return badRequest(new RequiredFieldError('originalURL'))
    const code = await this.addShortenURL({ originalURL })
    return created({ shortURL: `${process.env.APP_URL!}/${code}` })
  }
}
