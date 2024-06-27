module.exports = {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/server/tests/integration/**/*.test.js'], // Mise à jour du chemin
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',
    '^.+\\.js$': 'babel-jest'
  }
};
