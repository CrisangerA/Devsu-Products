import commonStyles from '@theme/common';
import { useTheme } from '@theme/index';
import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function SafeAreaView({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        ...commonStyles.flex,
        backgroundColor: colors.background,
      }}
    >
      {children}
    </View>
  );
}
