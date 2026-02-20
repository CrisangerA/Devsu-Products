import React from 'react';
import { RootLayout } from '@components/layout';
import { Text } from '@components/core';
import ProductsForm from '../components/ProductsForm/ProductsForm';
import { ScrollView, StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';

export default function ProductsFormView() {
  return (
    <RootLayout>
      <ScrollView contentContainerStyle={styles.root}>
        <Text variant="h3">Formulario de Registro</Text>

        <ProductsForm />
      </ScrollView>
    </RootLayout>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.xl,
  },
});
