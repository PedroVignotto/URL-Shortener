import { CodeGenerator } from '@/domain/contracts/gateways'
import { ShortenURL, shortenURLUseCase } from '@/domain/use-cases'

import { mock } from 'jest-mock-extended'

describe('shortenURLUseCase', () => {
  let sut: ShortenURL

  const codeGenerator = mock<CodeGenerator>()

  beforeEach(() => {
    sut = shortenURLUseCase(codeGenerator)
  })

  it('Should call CodeGenerator', async () => {
    await sut({ url: 'http://any_url.com' })

    expect(codeGenerator.generate).toHaveBeenCalledTimes(1)
  })
})
