import { generateRandomURL, generateRandomCode } from '@/tests/mocks'
import { MongoConnection } from '@/infra/database/mongodb/helpers'
import { URLRepository } from '@/infra/database/mongodb/repositories'

import { Collection } from 'mongodb'

describe('URLRepository', () => {
  let sut: URLRepository
  let originalURL: string
  let code: string
  let mongoConnection: MongoConnection
  let urlCollection: Collection

  beforeAll(async () => {
    originalURL = generateRandomURL()
    code = generateRandomCode()

    mongoConnection = MongoConnection.getInstance()
    await mongoConnection.connect(process.env.MONGO_URL!)
    urlCollection = mongoConnection.getCollection('urls')
  })

  beforeEach(async () => {
    sut = new URLRepository()

    await urlCollection.deleteMany({})
  })

  afterAll(async () => {
    await mongoConnection.disconnect()
  })

  describe('create()', () => {
    it('Should save url data on success', async () => {
      await sut.create({ originalURL, code })

      expect(await urlCollection.findOne({ originalURL })).toBeTruthy()
    })
  })

  describe('loadByCode()', () => {
    it('Should return undefined if code does not exists', async () => {
      const result = await sut.loadByCode({ code })

      expect(result).toBeUndefined()
    })
  })
})
