import React, { useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { RouteProp } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native';
// Components
import { RootLayout } from '@components/layout';
import { Button, Text } from '@components/core';
import { BottomSheetDelete } from '../components/ProductDetail/BottomSheetDelete';
// Hooks
import { useNavigationProducts } from '@navigation/hooks/useNavigation';
import { useProductMutationDelete } from '@modules/products/application/product.mutation';
// Theme
import { spacing } from '@theme/spacing';
// Routes
import {
  ProductsRoutes,
  ProductsStackParamsList,
} from '@navigation/config/routes';

type ProductDetailViewProps = {
  route: RouteProp<ProductsStackParamsList, 'Detail'>;
};

const DEFAULT_LOGO =
  'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg';
export default function ProductDetailView({ route }: ProductDetailViewProps) {
  const { navigate, goBack } = useNavigationProducts();
  const { mutate: deleteProduct, isPending } = useProductMutationDelete();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { product } = route.params;

  const logo = useMemo(
    () => (product.logo.includes('http') ? product.logo : DEFAULT_LOGO),
    [product.logo],
  );

  return (
    <RootLayout>
      <View style={styles.root}>
        <View style={styles.gap}>
          <View style={{ marginBottom: spacing.lg }}>
            <Text variant="h3">ID: {product.id}</Text>
            <Text variant="body" color="textSecondary">
              Información extra
            </Text>
          </View>
          <Row label="Nombre" value={product.name} />
          <Row label="Descripción" value={product.description} />
          <Row label="Logo" />
          <View>
            <Image
              source={{
                uri: logo,
              }}
              style={styles.logo}
            />
          </View>
          <Row
            label="Fecha de lanzamiento"
            value={new Date(product.releaseDate).toLocaleDateString()}
          />
          <Row
            label="Fecha de revisión"
            value={new Date(product.revisionDate).toLocaleDateString()}
          />
        </View>
        <View style={styles.gap}>
          <Button
            title="Editar"
            variant="secondary"
            onPress={() =>
              navigate(ProductsRoutes.Form, {
                product: product,
              })
            }
          />
          <Button
            title="Eliminar"
            onPress={() => bottomSheetRef.current?.expand()}
            variant="danger"
          />
        </View>
      </View>
      <BottomSheetDelete
        ref={bottomSheetRef}
        name={product.name}
        isLoading={isPending}
        onCancel={() => bottomSheetRef.current?.close()}
        onConfirm={() =>
          deleteProduct(product.id, {
            onSuccess: goBack,
          })
        }
      />
    </RootLayout>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <View style={styles.row}>
      <Text variant="body" color="textSecondary">
        {label}
      </Text>
      {value && <Text variant="body">{value}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    justifyContent: 'space-between',
    flex: 1,
  },
  logo: {
    width: '80%',
    aspectRatio: '4/3',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gap: {
    gap: spacing.md,
  },
});
