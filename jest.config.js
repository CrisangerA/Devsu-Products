module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-mmkv|react-native-nitro-modules|@react-navigation|react-native-date-picker|react-native-gesture-handler|react-native-reanimated|react-native-worklets|react-native-svg|@gorhom)/)',
  ],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/jest/__mocks__/svgMock.js',
    '^react-native-mmkv$': '<rootDir>/jest/__mocks__/react-native-mmkv.js',
    '^react-native-gesture-handler$':
      '<rootDir>/jest/__mocks__/react-native-gesture-handler.js',
    '^react-native-worklets$':
      '<rootDir>/jest/__mocks__/react-native-worklets.js',
    '^react-native-reanimated$':
      '<rootDir>/jest/__mocks__/react-native-reanimated.js',
    '^@gorhom/bottom-sheet$':
      '<rootDir>/jest/__mocks__/@gorhom/bottom-sheet.js',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/index.ts',
    '!**/**.model.ts',
    '!**/**.repository.ts',
  ],
};
