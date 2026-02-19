import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import ProductsStackNavigation from './stacks/ProductsStackNavigation';

const navigationRef = createNavigationContainerRef();

export default function RootNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <ProductsStackNavigation />
    </NavigationContainer>
  );
}
