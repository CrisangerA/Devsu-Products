import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Components
import { Button } from '@components/core';
import { DatePicker, TextInput } from '@components/form';
// Hooks
import {
  useProductMutationCreate,
  useProductMutationUpdate,
} from '@modules/products/application/product.mutation';
// Types
import {
  ProductSchema,
  RegisterUserSchemaType,
} from '@modules/products/domain/product.scheme';
// Modules
import { Product } from '@modules/products/domain/product.model';
// Navigation
import { ProductsRoutes } from '@navigation/config/routes';
import { useNavigationProducts } from '@navigation/hooks/useNavigation';
// Theme
import { spacing } from '@theme/spacing';

interface ProductsForm {
  product?: Product;
}

export default function ProductsForm({ product }: ProductsForm) {
  // Hooks
  const { goBack, popTo } = useNavigationProducts();
  const { control, handleSubmit, setError, reset, setValue } =
    useForm<RegisterUserSchemaType>({
      resolver: zodResolver(ProductSchema),
      defaultValues: {
        id: product?.id || '',
        name: product?.name || '',
        description: product?.description || '',
        logo: product?.logo || '',
        releaseDate: product?.releaseDate
          ? new Date(product?.releaseDate || '')
          : undefined,
        revisionDate: product?.revisionDate
          ? new Date(product?.revisionDate || '')
          : undefined,
      },
    });

  // Mutations
  const { mutate: createProduct, isPending: isCreating } =
    useProductMutationCreate();
  const { mutate: updateProduct, isPending: isUpdating } =
    useProductMutationUpdate();

  // Watch releaseDate and set revisionDate to one year later
  const releaseDate = useWatch({
    control,
    name: 'releaseDate',
  });

  useEffect(() => {
    if (releaseDate) {
      const revisionDate = releaseDate;
      revisionDate.setFullYear(releaseDate.getFullYear() + 1);
      setValue('revisionDate', revisionDate);
    }
  }, [releaseDate, setValue]);

  // Events
  function onSubmit(form: RegisterUserSchemaType) {
    if (product?.id) {
      updateProduct(
        {
          ...form,
          date_release: new Date(form.releaseDate),
          date_revision: new Date(form.revisionDate),
        },
        {
          onSuccess: data => {
            popTo(ProductsRoutes.Detail, {
              product: {
                ...data,
                releaseDate: data.date_release,
                revisionDate: data.date_revision,
              },
            });
          },
          onError: handleFormErrors,
        },
      );
      return;
    }

    createProduct(
      {
        ...form,
        date_release: new Date(form.releaseDate),
        date_revision: new Date(form.revisionDate),
      },
      {
        onSuccess: () => {
          goBack();
        },
        onError: handleFormErrors,
      },
    );
  }

  function handleFormErrors(error: Error) {
    if (error.name.includes('FormError')) {
      const formErrors = JSON.parse(error.message);
      formErrors.forEach((e: any) => {
        const message = Object.values(e.constraints)[0] as string;
        const property = e.property.includes('date_release')
          ? 'releaseDate'
          : e.property.includes('date_revision')
          ? 'revisionDate'
          : e.property;
        setError(property, { message });
      });
    }
    if (error.name.includes('DuplicateIdentifierError')) {
      setError('id', { message: error.message });
    }
  }

  // Constants
  const isLoading = isCreating || isUpdating;

  return (
    <View style={styles.container}>
      <TextInput
        control={control}
        name="id"
        placeholder="ID"
        label="ID"
        editable={!product?.id}
      />
      <TextInput
        control={control}
        name="name"
        placeholder="Nombre"
        label="Nombre"
      />
      <TextInput
        control={control}
        name="description"
        placeholder="Descripción"
        label="Descripción"
      />
      <TextInput
        control={control}
        name="logo"
        placeholder="Logo"
        label="Logo"
      />
      <DatePicker
        control={control}
        name="releaseDate"
        placeholder="Nombre"
        label="Fecha Liberación"
      />
      <DatePicker
        control={control}
        name="revisionDate"
        placeholder="Nombre"
        label="Fecha Revisión"
        editable={false}
      />

      <View style={styles.actions}>
        <Button
          loading={isLoading}
          title={
            isLoading ? 'Guardando...' : product?.id ? 'Actualizar' : 'Enviar'
          }
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        />

        <Button
          title="Reiniciar"
          variant="secondary"
          disabled={isLoading}
          onPress={() => reset()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  actions: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
});
