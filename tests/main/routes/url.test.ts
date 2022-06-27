import { generateRandomCode, generateRandomURL } from '@/tests/mocks'
import { app } from '@/main/config/app'
import { RequiredFieldError } from '@/application/errors'
import { MongoConnection } from '@/infra/database/mongodb/helpers'

import { Collection } from 'mongodb'
import request from 'supertest'

describe('AddShortenURL routes', () => {
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

  afterAll(async () => {
    await mongoConnection.disconnect()
  })

  describe('POST /url', () => {
    it('Should return 201 on success', async () => {
      const { status } = await request(app).post('/url').send({ originalURL })

      expect(status).toBe(201)
    })

    it('Should return 400 if originalURL does not provided', async () => {
      const { status, body: { error } } = await request(app).post('/url').send({ originalURL: null as any })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('originalURL').message)
    })
  })

  describe('GET /url', () => {
    it('Should return 302 on success', async () => {
      await urlCollection.insertOne({ originalURL, code })

      const { status } = await request(app).get(`/${code}`)

      expect(status).toBe(302)
    })
  })
})
