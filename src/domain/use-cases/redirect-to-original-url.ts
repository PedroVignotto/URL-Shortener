import { LoadURLByCodeRepository } from '@/domain/contracts/database/repositories'
import { FieldNotFoundError } from '@/domain/errors'

type Setup = (urlRepository: LoadURLByCodeRepository) => RedirectToOriginalURL
type Input = { code: string }
type Output = string
export type RedirectToOriginalURL = (input: Input) => Promise<Output>

export const redirectToOriginalURLUseCase: Setup = urlRepository => async ({ code }) => {
  const originalURL = await urlRepository.loadByCode({ code })
  if (!originalURL) throw new FieldNotFoundError('code')
  return originalURL
}
