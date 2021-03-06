import { Controller } from '@/application/controllers'
import { RequiredFieldError } from '@/application/errors'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { RedirectToOriginalURL } from '@/domain/use-cases'

type HttpRequest = { code: string }
type Model = string | Error

export class RedirectToOriginalURLController extends Controller {
  constructor (private readonly redirectToOriginalURL: RedirectToOriginalURL) { super() }

  async perform ({ code }: HttpRequest): Promise<HttpResponse<Model>> {
    if (!code) return badRequest(new RequiredFieldError('code'))
    const originalURL = await this.redirectToOriginalURL({ code })
    return ok(originalURL)
  }
}
