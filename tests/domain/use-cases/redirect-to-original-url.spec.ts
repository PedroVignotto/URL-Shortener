import { generateRandomCode } from '@/tests/mocks'
import { LoadURLByCodeRepository } from '@/domain/contracts/database/repositories'
import { RedirectToOriginalURL, redirectToOriginalURLUseCase } from '@/domain/use-cases'

import { mock } from 'jest-mock-extended'

describe('redirectToOriginalURLUseCase', () => {
  let sut: RedirectToOriginalURL
  let code: string

  const urlRepository = mock<LoadURLByCodeRepository>()

  beforeAll(() => {
    code = generateRandomCode()
  })

  beforeEach(() => {
    sut = redirectToOriginalURLUseCase(urlRepository)
  })

  it('Should call LoadURLByCodeRepository with correct value', async () => {
    await sut({ code })

    expect(urlRepository.loadByCode).toHaveBeenCalledWith({ code })
    expect(urlRepository.loadByCode).toHaveBeenCalledTimes(1)
  })
})
