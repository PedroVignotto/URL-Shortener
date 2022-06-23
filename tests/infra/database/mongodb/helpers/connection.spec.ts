import { MongoConnection } from '@/infra/database/mongodb/helpers'

import { MongoClient } from 'mongodb'
import { mocked } from 'jest-mock'
import fs from 'fs'

jest.mock('mongodb')

describe('MongoConnection', () => {
  let sut: MongoConnection

  const connectSpy: jest.Mock = jest.fn()

  beforeAll(() => {
    sut = MongoConnection.getInstance()

    mocked(MongoClient).mockImplementation(jest.fn().mockImplementation(() => ({ connect: connectSpy })))
  })

  afterAll(() => {
    fs.unlink(process.cwd() + '/globalConfig.json', () => {})
  })

  it('Should have only one instance', () => {
    expect(sut).toBe(MongoConnection.getInstance())
  })

  it('Should create a new connection', async () => {
    await sut.connect(process.env.MONGO_URL!)

    expect(connectSpy).toHaveBeenCalled()
  })
})
