/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';

import AppProvider from '@providers/AppProvider';
import ProductsListView from '@modules/products/ui/views/ProductsListView';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ProductsListView />
    </AppProvider>
  );
}

export default App;
