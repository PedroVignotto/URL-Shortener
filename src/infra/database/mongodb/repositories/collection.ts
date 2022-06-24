import { MongoConnection } from '@/infra/database/mongodb/helpers'

import { Collection as MongoCollection } from 'mongodb'

export abstract class Collection {
  constructor (private readonly connection: MongoConnection = MongoConnection.getInstance()) {}

  getCollection (collectionName: string): MongoCollection {
    return this.connection.getCollection(collectionName)
  }
}
