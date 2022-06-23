import { MongoConnection } from '@/infra/database/mongodb/helpers'

describe('MongoConnection', () => {
  let sut: MongoConnection

  beforeAll(() => {
    sut = MongoConnection.getInstance()
  })

  it('Should have only one instance', () => {
    expect(sut).toBe(MongoConnection.getInstance())
  })
})
