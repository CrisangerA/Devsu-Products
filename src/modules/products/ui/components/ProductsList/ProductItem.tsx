import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Product } from '@modules/products/domain/product.model';
import { Text } from '@components/core';
import { borderRadius } from '@theme/borders';
import { useNavigationProducts } from '@navigation/hooks/useNavigation';
import { ProductsRoutes } from '@navigation/config/routes';

interface ProductItemProps {
  product: Product;
}
export default function ProductItem({ product }: ProductItemProps) {
  const navigation = useNavigationProducts();
  return (
    <Pressable
      style={styles.root}
      onPress={() => navigation.navigate(ProductsRoutes.Detail, { product })}
    >
      <View>
        <Text variant="body">{product.name}</Text>
        <Text variant="body" color="textSecondary">
          ID: {product.id}
        </Text>
      </View>
      <View>
        <Text variant="body">👉🏼</Text>
      </View>
    </Pressable>
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
