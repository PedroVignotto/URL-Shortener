import { generateRandomURL } from '@/tests/mocks'
import { app } from '@/main/config/app'
import { MongoConnection } from '@/infra/database/mongodb/helpers'

import request from 'supertest'

describe('AddShortenURL routes', () => {
  let originalURL: string
  let mongoConnection: MongoConnection

  beforeAll(async () => {
    originalURL = generateRandomURL()

    mongoConnection = MongoConnection.getInstance()
    await mongoConnection.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await mongoConnection.disconnect()
  })

  describe('POST /accounts', () => {
    it('Should return 201 on success', async () => {
      const { status } = await request(app).post('/api/url').send({ originalURL })

      expect(status).toBe(201)
    })
  })
})
