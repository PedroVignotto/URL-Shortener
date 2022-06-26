import { makeURLRepository } from '@/main/factories/infra/database/mongodb/repositories'
import { makeCodeGenerator } from '@/main/factories/infra/gateways'
import { AddShortenURL, addShortenURLUseCase } from '@/domain/use-cases'

export const makeAddShortenURLUseCase = (): AddShortenURL =>
  addShortenURLUseCase(makeCodeGenerator(), makeURLRepository())
