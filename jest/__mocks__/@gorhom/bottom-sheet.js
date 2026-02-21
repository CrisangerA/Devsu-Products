const View = require('react-native').View;

module.exports = {
  BottomSheet: View,
  BottomSheetView: View,
  BottomSheetBackdrop: View,
  BottomSheetScrollView: View,
  BottomSheetFlatList: View,
  BottomSheetSectionList: View,
  BottomSheetTextInput: View,
  useBottomSheet: () => ({
    snapToIndex: () => {},
    snapToPosition: () => {},
    expand: () => {},
    collapse: () => {},
    close: () => {},
  }),
};
