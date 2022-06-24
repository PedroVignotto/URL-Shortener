import { MongoConnection } from '@/infra/database/mongodb/helpers'
import { URLRepository } from '@/infra/database/mongodb/repositories'

describe('URLRepository', () => {
  beforeAll(async () => {
    await MongoConnection.getInstance().connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoConnection.getInstance().disconnect()
  })

  it('Should save url data on success', async () => {
    const sut = new URLRepository()

    await sut.create({ originalURL: 'any_url', code: 'any_code' })

    expect(await MongoConnection.getInstance().getCollection('urls').findOne({ originalURL: 'any_url' })).toBeTruthy()
  })
})
