module.exports = {
  verbose: true,
  testMatch: ['**/src/?(*.)+(spec|test).js'],
  moduleNameMapper: {
    '\\.(svg)$': '<rootDir>/mocks/file-mock.js',
  },
}
