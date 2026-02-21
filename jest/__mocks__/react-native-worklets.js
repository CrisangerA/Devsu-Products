module.exports = {
  useSharedValue: () => ({ value: 0 }),
  useAnimatedStyle: () => ({}),
  withTiming: value => value,
  withSpring: value => value,
  withDelay: () => value => value,
  withSequence: () => value => value,
  Easing: {
    linear: () => {},
    ease: () => {},
    quad: () => {},
    cubic: () => {},
  },
  runOnUI: fn => fn,
  runOnJS: fn => fn,
};
