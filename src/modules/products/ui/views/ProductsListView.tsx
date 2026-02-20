import React from 'react';
//import { NewAppScreen } from '@react-native/new-app-screen';
import { RootLayout } from '@components/layout';
import ProductsList from '../components/ProductsList/ProductsList';
import ProductsSearch from '../components/ProductsList/ProductsSearch';
import ButtonAddProduct from '../components/ProductsList/ButtonAddProduct';

export default function ProductsListView() {
  return (
    <RootLayout>
      <ProductsSearch />
      <ProductsList />
      <ButtonAddProduct />
    </RootLayout>
  );
}
