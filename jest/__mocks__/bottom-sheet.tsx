import React from 'react';

const MockBottomSheet = React.forwardRef((props: any, ref: any) => {
  React.useImperativeHandle(ref, () => ({
    expand: jest.fn(),
    close: jest.fn(),
  }));
  return <>{props.children}</>;
});

export default {
  __esModule: true,
  default: MockBottomSheet,
  BottomSheetBackdrop: () => null,
  BottomSheetView: ({ children }: any) => <>{children}</>,
};
