import { AddURLRepository, LoadURLByCodeRepository } from '@/domain/contracts/database/repositories'
import { Collection } from '@/infra/database/mongodb/repositories/collection'

type Repositories = AddURLRepository & LoadURLByCodeRepository

export class URLRepository extends Collection implements Repositories {
  async create ({ originalURL, code }: AddURLRepository.Input): Promise<AddURLRepository.Output> {
    await this.getCollection('urls').insertOne({ originalURL, code })
  }

  async loadByCode ({ code }: LoadURLByCodeRepository.Input): Promise<LoadURLByCodeRepository.Output> {
    await this.getCollection('urls').findOne({ code })
    return undefined
  }
}
