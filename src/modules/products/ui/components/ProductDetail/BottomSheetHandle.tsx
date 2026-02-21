import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import { colors } from '@theme/colors';
import CloseIcon from '@assets/icons/CloseIcon.svg';

interface Props {
  onPress: () => void;
}

export default function BottomSheetHandle({ onPress }: Props) {
  return (
    <View style={styles.root}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Cerrar"
      >
        <CloseIcon width={20} height={20} stroke={colors.light.text} testID="CloseIcon" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.light.border,
    alignItems: 'flex-end',
  },
  button: {
    padding: 10,
  },
  pressed: {
    opacity: 0.6,
  },
});
