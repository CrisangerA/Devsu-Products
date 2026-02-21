const React = require('react');
const { View } = require('react-native');

module.exports = {
  __esModule: true,
  default: ({ testID, ...props }) =>
    React.createElement(View, { testID, ...props }),
};
