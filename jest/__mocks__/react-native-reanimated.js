const View = require('react-native').View;
const Animated = require('react-native').Animated;

module.exports = {
  ...Animated,
  View,
  useSharedValue: () => ({ value: 0 }),
  useAnimatedStyle: () => ({}),
  withTiming: value => value,
  withSpring: value => value,
  withDelay: () => value => value,
  withSequence: () => value => value,
  withRepeat: value => value,
  Easing: {
    linear: () => {},
    ease: () => {},
    quad: () => {},
    cubic: () => {},
  },
  runOnUI: fn => fn,
  runOnJS: fn => fn,
  useAnimatedScrollHandler: () => ({}),
  useDerivedValue: fn => ({ value: fn() }),
  interpolate: () => 0,
  Extrapolate: { CLAMP: 'clamp' },
  createAnimatedComponent: Component => Component,
};
