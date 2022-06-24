import { url, code } from '@/tests/mocks'
import { MongoConnection } from '@/infra/database/mongodb/helpers'
import { URLRepository } from '@/infra/database/mongodb/repositories'

import { Collection } from 'mongodb'

describe('URLRepository', () => {
  let sut: URLRepository
  let mongoConnection: MongoConnection
  let urlCollection: Collection

  let originalURL: string
  let codeURL: string

  beforeAll(async () => {
    originalURL = url()
    codeURL = code()

    mongoConnection = MongoConnection.getInstance()
    await mongoConnection.connect(process.env.MONGO_URL!)
    urlCollection = mongoConnection.getCollection('urls')
  })

  beforeEach(() => {
    sut = new URLRepository()
  })

  afterAll(async () => {
    await mongoConnection.disconnect()
  })

  it('Should save url data on success', async () => {
    await sut.create({ originalURL, code: codeURL })

    expect(await urlCollection.findOne({ originalURL })).toBeTruthy()
  })
})
