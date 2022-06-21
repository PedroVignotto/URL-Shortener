export interface CodeGenerator {
  generate: () => Promise<CodeGenerator.Output>
}

export namespace CodeGenerator {
  export type Output = string
}
