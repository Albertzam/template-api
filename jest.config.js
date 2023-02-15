const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

const { baseUrl, paths } = compilerOptions
console.log(' BASE URL >> ', baseUrl)
console.log('PATHS >> ', paths)
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePaths: [baseUrl],
  modulePathIgnorePatterns: ['<rootDir>/src/__mock__', '<rootDir>/dist'],
  moduleNameMapper: pathsToModuleNameMapper(paths),
}
