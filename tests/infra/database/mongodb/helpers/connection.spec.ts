import { ConnectionNotFoundError } from '@/infra/database/mongodb/errors'
import { MongoConnection } from '@/infra/database/mongodb/helpers'

import { MongoClient } from 'mongodb'
import { mocked } from 'jest-mock'

jest.mock('mongodb')

describe('MongoConnection', () => {
  let sut: MongoConnection

  const connectSpy: jest.Mock = jest.fn()
  const closeSpy: jest.Mock = jest.fn()
  const dbSpy: jest.Mock = jest.fn()

  beforeAll(() => {
    sut = MongoConnection.getInstance()

    dbSpy.mockImplementation(() => ({ collection: jest.fn() }))
    mocked(MongoClient).mockImplementation(jest.fn().mockImplementation(() => ({ connect: connectSpy, close: closeSpy, db: dbSpy })))
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  it('Should have only one instance', () => {
    expect(sut).toBe(MongoConnection.getInstance())
  })

  it('Should create a new connection', async () => {
    await sut.connect(process.env.MONGO_URL!)

    expect(connectSpy).toHaveBeenCalled()
  })

  it('Should close connection if already exists', async () => {
    await sut.connect(process.env.MONGO_URL!)

    await sut.disconnect()

    expect(closeSpy).toHaveBeenCalled()
  })

  it('Should close connection if already exists', async () => {
    await sut.connect(process.env.MONGO_URL!)

    await sut.disconnect()

    expect(closeSpy).toHaveBeenCalled()
  })

  it('Should return ConnectionNotFoundError on getCollection if connection is not found', async () => {
    await sut.disconnect()

    expect(dbSpy).not.toHaveBeenCalled()
    expect(() => sut.getCollection('any_collection')).toThrow(new ConnectionNotFoundError())
  })
})
