import { AddURLRepository } from '@/domain/contracts/database/repositories'
import { CodeGenerator } from '@/domain/contracts/gateways'

type Setup = (codeGenerator: CodeGenerator, urlRepository: AddURLRepository) => ShortenURL
type Input = { originalURL: string }
type Output = void
export type ShortenURL = (input: Input) => Promise<Output>

export const shortenURLUseCase: Setup = (codeGenerator, urlRepository) => async ({ originalURL }) => {
  const code = await codeGenerator.generate()
  await urlRepository.create({ originalURL, code })
}
