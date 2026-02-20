import React, { useRef } from 'react';
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

export default function ProductDetailView({ route }: ProductDetailViewProps) {
  const { navigate, goBack } = useNavigationProducts();
  const { mutate: deleteProduct } = useProductMutationDelete();
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <RootLayout>
      <View style={styles.root}>
        <View style={styles.gap}>
          <View style={{ marginBottom: spacing.lg }}>
            <Text variant="h3">ID: {route.params.product.id}</Text>
            <Text variant="body">Información extra</Text>
          </View>
          <Row label="Nombre" value={route.params.product.name} />
          <Row label="Descripción" value={route.params.product.description} />
          <Row label="Logo" value={route.params.product.logo} />
          <View>
            <Image
              source={{
                uri: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
              }}
              style={styles.logo}
            />
          </View>
          <Row
            label="Fecha de lanzamiento"
            value={new Date(
              route.params.product.releaseDate,
            ).toLocaleDateString()}
          />
          <Row
            label="Fecha de revisión"
            value={new Date(
              route.params.product.revisionDate,
            ).toLocaleDateString()}
          />
        </View>
        <View style={styles.gap}>
          <Button
            title="Editar"
            variant="secondary"
            onPress={() =>
              navigate(ProductsRoutes.Form, {
                product: route.params.product,
              })
            }
          />
          <Button
            title="Eliminar"
            variant="outlined"
            onPress={() => bottomSheetRef.current?.expand()}
          />
        </View>
      </View>
      <BottomSheetDelete
        ref={bottomSheetRef}
        name={route.params.product.name}
        onCancel={() => bottomSheetRef.current?.close()}
        onConfirm={() =>
          deleteProduct(route.params.product.id, {
            onSuccess: goBack,
          })
        }
      />
    </RootLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text>{label}:</Text>
      <Text>{value}</Text>
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
    width: '100%',
    height: 200,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gap: {
    gap: spacing.md,
  },
});
