import React, { PropsWithChildren } from 'react';
// Components
import { Header } from './Header';
import { SafeAreaView } from './SafeAreaView';

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <SafeAreaView>
      <Header />
      {children}
    </SafeAreaView>
  );
}
