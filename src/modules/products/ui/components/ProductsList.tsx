import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { useProductsQuery } from '@modules/products/application/product.queries';
import ProductItem from './ProductItem';
import { borderRadius } from '@theme/borders';
import { colors } from '@theme/colors';
import ProductItemSeparator from './ProductItemSeparator';
import { spacing } from '@theme/spacing';
export default function ProductsList() {
  const { data = [], isLoading, error } = useProductsQuery();
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View>
        <Text>No products found</Text>
      </View>
    );
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
