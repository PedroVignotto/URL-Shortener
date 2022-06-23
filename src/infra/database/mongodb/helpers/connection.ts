// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MongoConnection {
  private static instance?: MongoConnection

  private constructor () {}

  static getInstance (): MongoConnection {
    if (!MongoConnection.instance) MongoConnection.instance = new MongoConnection()

    return MongoConnection.instance
  }
}
