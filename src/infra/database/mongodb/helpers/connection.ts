import { ConnectionNotFoundError } from '@/infra/database/mongodb/errors'

import { MongoClient } from 'mongodb'

export class MongoConnection {
  private static instance?: MongoConnection
  private connection?: MongoClient | null

  private constructor () {}

  static getInstance (): MongoConnection {
    if (!MongoConnection.instance) MongoConnection.instance = new MongoConnection()
    return MongoConnection.instance
  }

  public async connect (uri: string): Promise<void> {
    this.connection = new MongoClient(uri)
    await this.connection.connect()
  }

  public async disconnect (): Promise<void> {
    await this.connection?.close()
    this.connection = null
  }

  public getCollection (collectionName: string): void {
    if (!this.connection) throw new ConnectionNotFoundError()
  }
}
