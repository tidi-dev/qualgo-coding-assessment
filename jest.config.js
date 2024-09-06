// jest.config.js
module.exports = {
  // Specify the file extensions Jest should process
  moduleFileExtensions: ['js', 'json', 'ts'],

  // The root directory for Jest to start looking for tests
  rootDir: '.',

  // Regex pattern to detect test files (all .spec.ts files)
  testRegex: '.*\\.spec\\.ts$',

  // Use ts-jest to transform TypeScript files
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  // Coverage options
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // Module name mapper to match the aliases in your tsconfig.json
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@libs-common/repositories(.*)$': '<rootDir>/libs/common/repositories/$1',
    '^@libs-common/dtos(.*)$': '<rootDir>/libs/common/dtos/$1',
    '^@libs-common/responses(.*)$': '<rootDir>/libs/common/responses/$1',
    '^@libs-common/helpers(.*)$': '<rootDir>/libs/common/helpers/$1',
    '^@libs-common/enums(.*)$': '<rootDir>/libs/common/enums/$1',
    '^@libs-common/constants(.*)$': '<rootDir>/libs/common/constants/$1',
    '^@libs-core/validators(.*)$': '<rootDir>/libs/core/validators/$1',
    '^@libs-core/decorators(.*)$': '<rootDir>/libs/core/decorators/$1',
    '^@libs/configs(.*)$': '<rootDir>/libs/configs/$1',
  },

  // Enable Jest to handle source maps, allowing you to debug TypeScript files
  moduleDirectories: ['node_modules', 'src'],

  // Use Jest's built-in coverage collection
  coverageReporters: ['text', 'lcov'],
};
