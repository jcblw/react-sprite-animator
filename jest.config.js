module.exports = {
  collectCoverageFrom: ['**/src/**/*.js'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 90,
      statements: 90,
    },
  },
  verbose: true,
  testMatch: ['**/src/?(*.)+(spec|test).js'],
  moduleNameMapper: {
    '\\.(svg)$': '<rootDir>/mocks/file-mock.js',
  },
}
