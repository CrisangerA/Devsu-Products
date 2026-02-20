import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@components/core';
import { FadeInView } from '@components/animations';
import { spacing } from '@theme/spacing';
import { colors } from '@theme/colors';

/**
 * ProductsError
 * Muestra un bloque de error con animación de entrada suave.
 */
export default function ProductsError({ message }: { message: string }) {
  return (
    <FadeInView style={styles.root}>
      <Text variant="body" color="error">
        {message}
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
    borderColor: colors.light.error,
    borderRadius: 8,
  },
});
