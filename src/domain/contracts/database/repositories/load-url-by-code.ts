export interface LoadURLByCodeRepository {
  loadByCode: (input: LoadURLByCodeRepository.Input) => Promise<LoadURLByCodeRepository.Output>
}

export namespace LoadURLByCodeRepository {
  export type Input = { code: string }
  export type Output = { originalURL: string }
}
