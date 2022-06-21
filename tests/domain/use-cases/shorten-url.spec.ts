import { url } from '@/tests/mocks'
import { CodeGenerator } from '@/domain/contracts/gateways'
import { ShortenURL, shortenURLUseCase } from '@/domain/use-cases'

import { mock } from 'jest-mock-extended'

describe('shortenURLUseCase', () => {
  let sut: ShortenURL
  let originalURL: string

  const codeGenerator = mock<CodeGenerator>()

  beforeAll(() => {
    originalURL = url()
  })

  beforeEach(() => {
    sut = shortenURLUseCase(codeGenerator)
  })

  it('Should call CodeGenerator', async () => {
    await sut({ originalURL })

    expect(codeGenerator.generate).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if CodeGenerator throws', async () => {
    codeGenerator.generate.mockRejectedValueOnce(new Error())

    const promise = sut({ originalURL })

    await expect(promise).rejects.toThrow(new Error())
  })
})
