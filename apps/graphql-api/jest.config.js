module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/graphql-api',
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } },
  displayName: 'graphql-api',
};
