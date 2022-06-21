import faker from 'faker'

export const url = (): string => faker.internet.url()
export const code = (): string => faker.datatype.uuid()
