const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

const { baseUrl, paths } = compilerOptions

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePaths: [baseUrl],
  modulePathIgnorePatterns: ['<rootDir>/src/__mock__'],
  moduleNameMapper: pathsToModuleNameMapper(paths),
}
