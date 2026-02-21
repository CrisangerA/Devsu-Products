import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Product } from '@modules/products/domain/product.model';
import { Text } from '@components/core';
import ChevronRightIcon from '@assets/icons/ChevronRightIcon.svg';
import { borderRadius } from '@theme/borders';
import { colors } from '@theme/colors';
import { useNavigationProducts } from '@navigation/hooks/useNavigation';
import { ProductsRoutes } from '@navigation/config/routes';

interface ProductItemProps {
  product: Product;
  index?: number;
}
export default function ProductItem({ product, index = 0 }: ProductItemProps) {
  const navigation = useNavigationProducts();
  const delay = Math.min(index, 6) * 50;

  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(300)}>
      <Pressable
        style={({ pressed }) => [styles.root, pressed && styles.pressed]}
        onPress={() => navigation.navigate(ProductsRoutes.Detail, { product })}
      >
        <View>
          <Text variant="body">{product.name}</Text>
          <Text variant="body" color="textSecondary">
            ID: {product.id}
          </Text>
        </View>
        <View>
          <ChevronRightIcon width={20} height={20} stroke={colors.light.textSecondary} testID="ChevronRightIcon" />
        </View>
      </Pressable>
    </Animated.View>
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
  pressed: {
    opacity: 0.7,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});
