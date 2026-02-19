import React from 'react';
import { render, screen } from '@testing-library/react-native';
import RootNavigation from '@navigation/RootNavigation';

// Mock the stack navigator to verify it's rendered
jest.mock('@navigation/stacks/ProductsStackNavigation', () => {
  const { Text } = require('react-native');
  return () => <Text>ProductsStackNavigation</Text>;
});

describe('RootNavigation', () => {
  it('should render the navigation container and stack', async () => {
    render(<RootNavigation />);
    expect(await screen.findByText('ProductsStackNavigation')).toBeTruthy();
  });
});
