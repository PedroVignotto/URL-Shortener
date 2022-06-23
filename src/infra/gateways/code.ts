import { CodeGenerator } from '@/domain/contracts/gateways'

export class Code implements CodeGenerator {
  constructor (private readonly maxCodeLength: number) {}

  async generate (): Promise<CodeGenerator.Output> {
    let code = ''
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < this.maxCodeLength; i++) {
      code += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
    }
    return code
  }
}
