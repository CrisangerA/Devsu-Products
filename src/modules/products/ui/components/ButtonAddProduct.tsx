import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button } from '@components/core';
import { spacing } from '@theme/spacing';

export default function ButtonAddProduct() {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Button title="Agregar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: spacing.xs,
    paddingHorizontal: spacing.lg,
  },
  container: {
    paddingVertical: spacing.lg,
  },
});
