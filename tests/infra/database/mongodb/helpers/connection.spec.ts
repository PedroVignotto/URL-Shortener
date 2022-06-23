import { MongoConnection } from '@/infra/database/mongodb/helpers'

import { MongoClient } from 'mongodb'
import { mocked } from 'jest-mock'

jest.mock('mongodb')

describe('MongoConnection', () => {
  let sut: MongoConnection

  const connectSpy: jest.Mock = jest.fn()
  const closeSpy: jest.Mock = jest.fn()

  beforeAll(() => {
    sut = MongoConnection.getInstance()

    mocked(MongoClient).mockImplementation(jest.fn().mockImplementation(() => ({ connect: connectSpy, close: closeSpy })))
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
})
