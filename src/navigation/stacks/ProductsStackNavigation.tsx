import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import ProductsListView from '@modules/products/ui/views/ProductsListView';
import ProductsFormView from '@modules/products/ui/views/ProductsFormView';
import ProductDetailView from '@modules/products/ui/views/ProductDetailView';
// Routes
import {
  ProductsRoutes,
  type ProductsStackParamsList,
} from '@navigation/config/routes';

const ProductsStack = createNativeStackNavigator<ProductsStackParamsList>();

export default function ProductsStackNavigation() {
  return (
    <ProductsStack.Navigator screenOptions={{ headerShown: false }}>
      <ProductsStack.Screen
        name={ProductsRoutes.Home}
        component={ProductsListView}
      />
      <ProductsStack.Screen
        name={ProductsRoutes.Form}
        component={ProductsFormView}
      />
      <ProductsStack.Screen
        name={ProductsRoutes.Detail}
        component={ProductDetailView}
      />
    </ProductsStack.Navigator>
  );
}
