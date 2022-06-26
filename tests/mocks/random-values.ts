import faker from 'faker'

export const generateRandomURL = (): string => faker.internet.url()
export const generateRandomCode = (): string => faker.datatype.uuid()
export const generateRandomFieldName = (): string => faker.database.column()
export const generateRandomValue = (): string => faker.random.words()
