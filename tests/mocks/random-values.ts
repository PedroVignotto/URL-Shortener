import faker from 'faker'

export const generateRandomURL = (): string => faker.internet.url()
export const generateRandomCode = (): string => faker.datatype.uuid()
