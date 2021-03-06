module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '<rootDir>/src/main/middlewares/**',
    '<rootDir>/src/main/adapters/**',
    '!<rootDir>/src/**/index.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: { '\\.ts$': 'ts-jest' },
  setupFiles: ['dotenv/config'],
  clearMocks: true
}
