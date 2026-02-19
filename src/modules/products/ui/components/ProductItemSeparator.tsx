import { View, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '@theme/colors';

export default function ProductItemSeparator() {
  return <View style={styles.root} />;
}

const styles = StyleSheet.create({
  root: {
    height: 1,
    backgroundColor: colors.light.border,
    width: '98%',
    alignSelf: 'center',
  },
});
