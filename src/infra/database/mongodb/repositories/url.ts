import { AddURLRepository } from '@/domain/contracts/database/repositories'
import { MongoConnection } from '@/infra/database/mongodb/helpers'

export class URLRepository implements AddURLRepository {
  async create ({ originalURL, code }: AddURLRepository.Input): Promise<AddURLRepository.Output> {
    const urlCollection = MongoConnection.getInstance().getCollection('urls')
    await urlCollection.insertOne({ originalURL, code })
  }
}
