import React from 'react';
import { render, screen } from '@test-utils';
import ProductsStackNavigation from '@navigation/stacks/ProductsStackNavigation';

// Mock the views
jest.mock('@modules/products/ui/views/ProductsListView', () => {
  const { Text } = require('react-native');
  return () => <Text>ProductsListView</Text>;
});

jest.mock('@modules/products/ui/views/ProductsFormView', () => {
  const { Text } = require('react-native');
  return () => <Text>ProductsFormView</Text>;
});

describe('ProductsStackNavigation', () => {
  it('should render the stack navigator with the home screen by default', async () => {
    render(<ProductsStackNavigation />);
    expect(await screen.findByText('ProductsListView')).toBeTruthy();
  });
});
