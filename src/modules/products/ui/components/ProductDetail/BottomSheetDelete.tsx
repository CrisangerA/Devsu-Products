import React, { forwardRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
// Components
import { Button, Text } from '@components/core';
// Theme
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import BottomSheetHandle from './BottomSheetHandle';

interface BottomSheetDeleteProps {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const BottomSheetDelete = forwardRef<
  BottomSheet,
  BottomSheetDeleteProps
>(({ name, onConfirm, onCancel }, ref) => {
  // Renders
  const handleComponent = useCallback(
    () => <BottomSheetHandle onPress={onCancel} />,
    [onCancel],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={2}
        pressBehavior="none"
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      enablePanDownToClose
      snapPoints={['1%', '37%', '40%']}
      backdropComponent={renderBackdrop}
      handleComponent={handleComponent}
    >
      <BottomSheetView style={styles.root}>
        <Text align="center">
          ¿Estás seguro de eliminar el producto {name}?
        </Text>
        <View style={styles.actions}>
          <Button title="Confirmar" onPress={onConfirm} />
          <Button title="Cancelar" variant="secondary" onPress={onCancel} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: spacing.lg,
    paddingTop: spacing.lg,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.lg,
  },
  actions: {
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.light.border,
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
  },
});
