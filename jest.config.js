const { pathsToModuleNameMapper } = require('ts-jest/utils')
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig')

module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
  }),
}
