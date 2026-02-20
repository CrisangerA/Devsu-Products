module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.jsx', '.js'],
        alias: {
          '@components': './src/components',
          '@config': './src/config',
          '@modules': './src/modules',
          '@navigation': './src/navigation',
          '@providers': './src/providers',
          '@theme': './src/theme',
          '@test-utils': './jest/test-utils',
        },
      },
    ],
    '@babel/plugin-transform-export-namespace-from',
  ],
};
