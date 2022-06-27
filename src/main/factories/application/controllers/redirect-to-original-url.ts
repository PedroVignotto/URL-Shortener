import { makeRedirectToOriginalURLUseCase } from '@/main/factories/domain/use-cases'
import { RedirectToOriginalURLController } from '@/application/controllers'

export const makeRedirectToOriginalURLController = (): RedirectToOriginalURLController =>
  new RedirectToOriginalURLController(makeRedirectToOriginalURLUseCase())
