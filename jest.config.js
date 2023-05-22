module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/*.test.ts',
  ],
  transform: {
    '/*.ts$/': ['ts-jest', {
      tsconfig: '__test__/tsconfig.json',
    }],
  },
};
