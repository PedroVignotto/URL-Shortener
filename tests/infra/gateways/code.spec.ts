import { Code } from '@/infra/gateways'

describe('Code', () => {
  let sut: Code
  let maxCodeLength: number

  beforeAll(() => {
    maxCodeLength = 5

    sut = new Code(maxCodeLength)
  })

  it('Should generate a random code', async () => {
    const code = await sut.generate()

    expect(code).toBeTruthy()
  })
})
