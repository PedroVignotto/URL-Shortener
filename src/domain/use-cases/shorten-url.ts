import { CodeGenerator } from '@/domain/contracts/gateways'

type Setup = (codeGenerator: CodeGenerator) => ShortenURL
type Input = { originalURL: string }
type Output = void
export type ShortenURL = (input: Input) => Promise<Output>

export const shortenURLUseCase: Setup = (codeGenerator) => async () => {
  await codeGenerator.generate()
}
