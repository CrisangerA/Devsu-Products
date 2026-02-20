import React from 'react';
import { View, StyleSheet } from 'react-native';

import { colors } from '@theme/colors';
import { Button } from '@components/core';

interface Props {
  onPress: () => void;
}

export default function BottomSheetHandle({ onPress }: Props) {
  return (
    <View style={styles.root}>
      <Button title="❌" variant="ghost" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.light.border,
    alignItems: 'flex-end',
  },
});
