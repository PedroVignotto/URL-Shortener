import { AddURLRepository } from '@/domain/contracts/database/repositories'
import { Collection } from '@/infra/database/mongodb/repositories/collection'

export class URLRepository extends Collection implements AddURLRepository {
  async create ({ originalURL, code }: AddURLRepository.Input): Promise<AddURLRepository.Output> {
    const urlCollection = this.getCollection('urls')
    await urlCollection.insertOne({ originalURL, code })
  }
}
