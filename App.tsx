import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SearchProvider from './src/context/searchProvider';

import Navigation from './src/routes';
import UserProvider from './src/context/userProvider';

export default function App() {
    return (
      <SafeAreaProvider>
        <UserProvider>
          <SearchProvider>
            <Navigation />
          </SearchProvider>
          <StatusBar style="dark" />
        </UserProvider>
      </SafeAreaProvider>
    );
}
