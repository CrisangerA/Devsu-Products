import React, { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
// Components
import ProductItem from './ProductItem';
import ProductsError from './ProductsError';
import ProductsEmpty from './ProductsEmpty';
import ProductsSkeleton from './ProductsSkeleton';
import ProductItemSeparator from './ProductItemSeparator';
// Queries
import { useProductsQuery } from '@modules/products/application/product.queries';
// Theme
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { borderRadius } from '@theme/borders';
// Utils
import { filterProducts } from '@modules/products/domain/product.utils';

interface ProductsListProps {
  searchQuery: string;
}

export default function ProductsList({ searchQuery }: ProductsListProps) {
  const { data = [], isLoading, error } = useProductsQuery();

  const filteredProducts = useMemo(
    () => filterProducts(searchQuery, data),
    [data, searchQuery],
  );

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (error) {
    return <ProductsError message={error.message} />;
  }

  if (filteredProducts.length === 0) {
    return <ProductsEmpty />;
  }

  return (
    <FlatList
      data={filteredProducts}
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
