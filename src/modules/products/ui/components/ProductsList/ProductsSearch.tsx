import { View } from 'react-native';
import React from 'react';
import { TextInput } from '@components/core';
import { StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';

export default function ProductsSearch() {
  return (
    <View style={styles.root}>
      <TextInput variant="outlined" size="lg" placeholder="Search..." />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing['2xl'],
    marginBottom: spacing.xl,
  },
});
