import React from 'react';
import { RootLayout } from '@components/layout';
import { Text } from '@components/core';
import ProductsForm from '../components/ProductsForm/ProductsForm';
import { ScrollView, StyleSheet } from 'react-native';
import { spacing } from '@theme/spacing';
import { RouteProp } from '@react-navigation/native';
import { ProductsStackParamsList } from '@navigation/config/routes';

type ProductsFormViewProps = {
  route: RouteProp<ProductsStackParamsList, 'Form'>;
};
export default function ProductsFormView({ route }: ProductsFormViewProps) {
  return (
    <RootLayout>
      <ScrollView contentContainerStyle={styles.root}>
        <Text variant="h3">Formulario de Registro</Text>

        <ProductsForm product={route.params?.product} />
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
