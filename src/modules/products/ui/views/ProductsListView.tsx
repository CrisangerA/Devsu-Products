import React from 'react';
//import { NewAppScreen } from '@react-native/new-app-screen';
import { RootLayout } from '@components/layout';
import ProductsList from '../components/ProductsList';
import ProductsSearch from '../components/ProductsSearch';
import ButtonAddProduct from '../components/ButtonAddProduct';

export default function ProductsListView() {
  return (
    <RootLayout>
      <ProductsSearch />
      <ProductsList />
      <ButtonAddProduct />
    </RootLayout>
  );
}
