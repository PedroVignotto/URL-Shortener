import { AddURLRepository } from '@/domain/contracts/database/repositories'
import { Collection } from '@/infra/database/mongodb/repositories/collection'

export class URLRepository extends Collection implements AddURLRepository {
  async create ({ originalURL, code }: AddURLRepository.Input): Promise<AddURLRepository.Output> {
    await this.getCollection('urls').insertOne({ originalURL, code })
  }
}
