import { CodeGenerator } from '@/domain/contracts/gateways'
import { Code } from '@/infra/gateways'

const MAX_CODE_LENGTH = 5

export const makeCodeGenerator = (): CodeGenerator =>
  new Code(MAX_CODE_LENGTH)
