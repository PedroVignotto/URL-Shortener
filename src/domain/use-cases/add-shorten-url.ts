import { AddURLRepository } from '@/domain/contracts/database/repositories'
import { CodeGenerator } from '@/domain/contracts/gateways'

type Setup = (codeGenerator: CodeGenerator, urlRepository: AddURLRepository) => AddShortenURL
type Input = { originalURL: string }
type Output = string
export type AddShortenURL = (input: Input) => Promise<Output>

export const addShortenURLUseCase: Setup = (codeGenerator, urlRepository) => async ({ originalURL }) => {
  const code = await codeGenerator.generate()
  await urlRepository.create({ originalURL, code })
  return code
}
