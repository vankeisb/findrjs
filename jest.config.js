/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['node_modules'],
  modulePathIgnorePatterns: ['<rootDir>/src/test'],
  roots: ['<rootDir>/src/'],
};