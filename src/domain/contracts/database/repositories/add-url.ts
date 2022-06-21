export interface AddURLRepository {
  create: (input: AddURLRepository.Input) => Promise<AddURLRepository.Output>
}

export namespace AddURLRepository {
  export type Input = { originalURL: string, code: string }
  export type Output = void
}
