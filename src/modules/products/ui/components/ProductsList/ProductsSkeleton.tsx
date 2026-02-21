import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { borderRadius } from '@theme/borders';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import ProductItemSeparator from './ProductItemSeparator';

/**
 * ProductsSkeleton
 * Muestra placeholders animados mientras se cargan los productos.
 * Usa una animación de pulso con react-native-reanimated v4.
 */
export default function ProductsSkeleton() {
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0, { duration: 800 }),
      ),
      -1,
      true,
    );
  }, [pulse]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.5 + pulse.value * 0.5,
  }));

  return (
    <Animated.View exiting={FadeOut.duration(200)} style={styles.flatList}>
      <View style={styles.container}>
        <Placeholder animatedStyle={animatedStyle} />
        <ProductItemSeparator />
        <Placeholder animatedStyle={animatedStyle} />
        <ProductItemSeparator />
        <Placeholder animatedStyle={animatedStyle} />
        <ProductItemSeparator />
        <Placeholder animatedStyle={animatedStyle} />
      </View>
    </Animated.View>
  );
}

/**
 * Placeholder
 * Ítem individual del skeleton que simula una fila de producto.
 */
function Placeholder({ animatedStyle }: { animatedStyle: any }) {
  return (
    <View style={styles.item}>
      <View style={styles.left}>
        <Animated.View style={[styles.line, animatedStyle]} />
        <Animated.View style={[styles.subLine, animatedStyle]} />
      </View>
      <Animated.View style={[styles.icon, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: spacing.lg,
  },
  container: {
    borderWidth: 1,
    borderColor: colors.light.border,
    borderRadius: borderRadius.sm,
  },
  item: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  left: {
    flexDirection: 'column',
    gap: spacing.xs,
    flex: 1,
    marginRight: spacing.md,
  },
  line: {
    height: 18,
    borderRadius: spacing.xs,
    backgroundColor: colors.light.surface,
    width: '60%',
  },
  subLine: {
    height: 16,
    borderRadius: spacing.xs,
    backgroundColor: colors.light.surface,
    width: '40%',
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.light.surface,
  },
});
