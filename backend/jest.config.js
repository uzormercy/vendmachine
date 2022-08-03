module.exports = {
  roots: ['<rootDir>/src'],
  testRegex: '(.*\\.test\\.(tsx?|jsx?))$',
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'json', 'node'],
  //   moduleNameMapper: {
  //     '@app/(.*)': '<rootDir>/src/$1',
  //     '@controller/(.*)': '<rootDir>/src/controllers/$1',
  //     '@services/(.*)': '<rootDir>/src/services/$1'
  //   },
  testTimeout: 15000
};
