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
    this.connection = await new MongoClient(uri).connect()
  }
}
