module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-mmkv|react-native-nitro-modules|@react-navigation)/)',
  ],
  moduleNameMapper: {
    '^react-native-mmkv$': '<rootDir>/jest/__mocks__/react-native-mmkv.js',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/index.ts',
    '!**/**.model.ts',
    '!**/**.repository.ts',
  ],
};
