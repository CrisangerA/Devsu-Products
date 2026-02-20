import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { useProductsQuery } from '@modules/products/application/product.queries';
import ProductItem from './ProductItem';
import { borderRadius } from '@theme/borders';
import { colors } from '@theme/colors';
import ProductItemSeparator from './ProductItemSeparator';
import { spacing } from '@theme/spacing';
import ProductsSkeleton from './ProductsSkeleton';
import ProductsError from './ProductsError';
import ProductsEmpty from './ProductsEmpty';
export default function ProductsList() {
  const { data = [], isLoading, error } = useProductsQuery();
  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (error) {
    return <ProductsError message={error.message} />;
  }

  if (data.length === 0) {
    return <ProductsEmpty />;
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ProductItem product={item} />}
      ItemSeparatorComponent={ProductItemSeparator}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      style={styles.flatList}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.light.border,
    borderRadius: borderRadius.sm,
  },
  flatList: {
    paddingHorizontal: spacing.lg,
  },
});
