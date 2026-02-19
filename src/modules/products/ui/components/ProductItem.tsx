import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Product } from '@modules/products/domain/product.model';
import { Text } from '@components/core';
import { borderRadius } from '@theme/borders';

interface ProductItemProps {
  product: Product;
}
export default function ProductItem({ product }: ProductItemProps) {
  return (
    <View style={styles.root}>
      <View>
        <Text variant="body">{product.name}</Text>
        <Text variant="body">{product.id}</Text>
      </View>
      <View>
        <Text variant="body">👉🏼</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
});
