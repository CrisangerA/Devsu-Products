import React, { useState } from 'react';
import { RootLayout } from '@components/layout';
import ProductsList from '../components/ProductsList/ProductsList';
import ProductsSearch from '../components/ProductsList/ProductsSearch';
import ButtonAddProduct from '../components/ProductsList/ButtonAddProduct';
import { useDebounce } from '@modules/products/application/hooks/useDebounce';

export default function ProductsListView() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  return (
    <RootLayout>
      <ProductsSearch value={searchQuery} onSearch={setSearchQuery} />
      <ProductsList searchQuery={debouncedQuery} />
      <ButtonAddProduct />
    </RootLayout>
  );
}
