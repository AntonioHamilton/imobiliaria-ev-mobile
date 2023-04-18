import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SearchProvider from './src/context/searchProvider';

import Navigation from './src/routes';
import UserProvider from './src/context/userProvider';
import EmployeeProvider from './src/context/employeeProvider';

export default function App() {
    return (
      <SafeAreaProvider>
        <EmployeeProvider>
          <UserProvider>
            <SearchProvider>
              <Navigation />
            </SearchProvider>
            <StatusBar style="dark" />
          </UserProvider>
        </EmployeeProvider>
      </SafeAreaProvider>
    );
}
