import { LoadURLByCodeRepository } from '@/domain/contracts/database/repositories'

type Setup = (urlRepository: LoadURLByCodeRepository) => RedirectToOriginalURL
type Input = { code: string }
type Output = void
export type RedirectToOriginalURL = (input: Input) => Promise<Output>

export const redirectToOriginalURLUseCase: Setup = urlRepository => async ({ code }) => {
  await urlRepository.loadByCode({ code })
}
