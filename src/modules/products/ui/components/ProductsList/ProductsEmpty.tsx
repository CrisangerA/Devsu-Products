import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@components/core';
import { FadeInView } from '@components/animations';
import { spacing } from '@theme/spacing';
import { colors } from '@theme/colors';

/**
 * ProductsEmpty
 * Indica lista vacía con animación de entrada suave.
 */
export default function ProductsEmpty() {
  return (
    <FadeInView style={styles.root}>
      <Text variant="h3">Sin resultados</Text>
      <Text variant="body" color="textSecondary">
        No se encontraron productos
      </Text>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    borderWidth: 1,
    borderColor: colors.light.border,
    borderRadius: 8,
  },
});
