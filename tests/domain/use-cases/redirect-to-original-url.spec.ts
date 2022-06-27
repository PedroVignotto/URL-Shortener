import { generateRandomCode, generateRandomURL } from '@/tests/mocks'
import { LoadURLByCodeRepository } from '@/domain/contracts/database/repositories'
import { RedirectToOriginalURL, redirectToOriginalURLUseCase } from '@/domain/use-cases'
import { FieldNotFoundError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('redirectToOriginalURLUseCase', () => {
  let sut: RedirectToOriginalURL
  let originalURL: string
  let code: string

  const urlRepository = mock<LoadURLByCodeRepository>()

  beforeAll(() => {
    originalURL = generateRandomURL()
    code = generateRandomCode()

    urlRepository.loadByCode.mockResolvedValue(originalURL)
  })

  beforeEach(() => {
    sut = redirectToOriginalURLUseCase(urlRepository)
  })

  it('Should call LoadURLByCodeRepository with correct value', async () => {
    await sut({ code })

    expect(urlRepository.loadByCode).toHaveBeenCalledWith({ code })
    expect(urlRepository.loadByCode).toHaveBeenCalledTimes(1)
  })

  it('Should throw FieldNotFoundError if LoadURLByCodeRepository return undefined', async () => {
    urlRepository.loadByCode.mockResolvedValueOnce(undefined)

    const promise = sut({ code })

    await expect(promise).rejects.toThrow(new FieldNotFoundError('code'))
  })

  it('Should rethrow if LoadURLByCodeRepository throws', async () => {
    urlRepository.loadByCode.mockRejectedValueOnce(new Error())

    const promise = sut({ code })

    await expect(promise).rejects.toThrow(new Error())
  })
})
