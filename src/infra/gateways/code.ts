import { CodeGenerator } from '@/domain/contracts/gateways'

export class Code implements CodeGenerator {
  constructor (private readonly maxCodeLength: number) {}

  public async generate (): Promise<CodeGenerator.Output> {
    let code = ''
    for (let i = 0; i < this.maxCodeLength; i++) code += this.getRandomCharacter()
    return code
  }

  private getRandomCharacter (): string {
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    return possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
  }
}
