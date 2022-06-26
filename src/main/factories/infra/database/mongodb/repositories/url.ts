import { URLRepository } from '@/infra/database/mongodb/repositories'

export const makeURLRepository = (): URLRepository =>
  new URLRepository()
