import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button } from '@components/core';
import { spacing } from '@theme/spacing';
import { useNavigationProducts } from '@navigation/hooks/useNavigation';
import { ProductsRoutes } from '@navigation/config/routes';

export default function ButtonAddProduct() {
  const { navigate } = useNavigationProducts();

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Button title="Agregar" onPress={() => navigate(ProductsRoutes.Form)} />
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
