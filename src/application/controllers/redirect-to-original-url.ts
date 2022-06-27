import { Controller } from '@/application/controllers'
import { RequiredFieldError } from '@/application/errors'
import { badRequest, HttpResponse } from '@/application/helpers'

type HttpRequest = { code: string }
type Model = Error

export class RedirectToOriginalURLController extends Controller {
  async perform ({ code }: HttpRequest): Promise<HttpResponse<Model>> {
    return badRequest(new RequiredFieldError('code'))
  }
}
