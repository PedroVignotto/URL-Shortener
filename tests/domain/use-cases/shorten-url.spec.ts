import { url, code } from '@/tests/mocks'
import { AddURLRepository } from '@/domain/contracts/database/repositories'
import { CodeGenerator } from '@/domain/contracts/gateways'
import { ShortenURL, shortenURLUseCase } from '@/domain/use-cases'

import { mock } from 'jest-mock-extended'

describe('shortenURLUseCase', () => {
  let sut: ShortenURL
  let originalURL: string
  let codeURL: string

  const codeGenerator = mock<CodeGenerator>()
  const urlRepository = mock<AddURLRepository>()

  beforeAll(() => {
    originalURL = url()
    codeURL = code()

    codeGenerator.generate.mockResolvedValue(codeURL)
  })

  beforeEach(() => {
    sut = shortenURLUseCase(codeGenerator, urlRepository)
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

  it('Should call AddURLRepository with correct values', async () => {
    await sut({ originalURL })

    expect(urlRepository.create).toHaveBeenCalledWith({ originalURL, code: codeURL })
    expect(urlRepository.create).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if AddURLRepository throws', async () => {
    urlRepository.create.mockRejectedValueOnce(new Error())

    const promise = sut({ originalURL })

    await expect(promise).rejects.toThrow(new Error())
  })
})
