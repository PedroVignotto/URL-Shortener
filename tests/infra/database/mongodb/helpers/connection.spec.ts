import { MongoConnection } from '@/infra/database/mongodb/helpers'

import fs from 'fs'

describe('MongoConnection', () => {
  let sut: MongoConnection

  beforeAll(() => {
    sut = MongoConnection.getInstance()
  })

  afterAll(() => {
    fs.unlink(process.cwd() + '/globalConfig.json', () => {})
  })

  it('Should have only one instance', () => {
    expect(sut).toBe(MongoConnection.getInstance())
  })
})
