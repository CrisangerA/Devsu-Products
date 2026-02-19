import { View, Text } from 'react-native';
import React from 'react';
import { useProductsQuery } from '@modules/products/application/product.queries';

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

  return (
    <View>
      {data.map(product => (
        <Text key={product.id}>{product.name}</Text>
      ))}
    </View>
  );
}
