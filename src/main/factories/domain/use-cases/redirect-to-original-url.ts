import { makeURLRepository } from '@/main/factories/infra/database/mongodb/repositories'
import { RedirectToOriginalURL, redirectToOriginalURLUseCase } from '@/domain/use-cases'

export const makeRedirectToOriginalURLUseCase = (): RedirectToOriginalURL =>
  redirectToOriginalURLUseCase(makeURLRepository())
