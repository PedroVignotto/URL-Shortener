import { makeAddShortenURLUseCase } from '@/main/factories/domain/use-cases'
import { AddShortenURLController } from '@/application/controllers'

export const makeAddShortenURLController = (): AddShortenURLController =>
  new AddShortenURLController(makeAddShortenURLUseCase())
