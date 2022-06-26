import { generateRandomURL, generateRandomCode } from '@/tests/mocks'
import { AddURLRepository } from '@/domain/contracts/database/repositories'
import { CodeGenerator } from '@/domain/contracts/gateways'
import { AddShortenURL, addShortenURLUseCase } from '@/domain/use-cases'

import { mock } from 'jest-mock-extended'

describe('addShortenURLUseCase', () => {
  let sut: AddShortenURL
  let originalURL: string
  let code: string

  const codeGenerator = mock<CodeGenerator>()
  const urlRepository = mock<AddURLRepository>()

  beforeAll(() => {
    originalURL = generateRandomURL()
    code = generateRandomCode()

    codeGenerator.generate.mockResolvedValue(code)
  })

  beforeEach(() => {
    sut = addShortenURLUseCase(codeGenerator, urlRepository)
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

    expect(urlRepository.create).toHaveBeenCalledWith({ originalURL, code })
    expect(urlRepository.create).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if AddURLRepository throws', async () => {
    urlRepository.create.mockRejectedValueOnce(new Error())

    const promise = sut({ originalURL })

    await expect(promise).rejects.toThrow(new Error())
  })

  it('Should return code on success', async () => {
    const result = await sut({ originalURL })

    expect(result).toEqual(code)
  })
})
