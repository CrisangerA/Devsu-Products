/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';

import AppProvider from '@providers/AppProvider';
import RootNavigation from '@navigation/RootNavigation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigation />
    </AppProvider>
  );
}

export default App;
