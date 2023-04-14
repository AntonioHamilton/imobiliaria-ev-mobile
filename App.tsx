import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SearchProvider from './src/context/searchProvider';
import { Text } from 'react-native';

import Navigation from './src/routes';
import UserProvider, { UserContext } from './src/context/userProvider';
import React, { useContext } from 'react';
import Login from './src/pages/Login';

export default function App() {
    return (
      <SafeAreaProvider>
        <UserProvider>
          <Content />
          <StatusBar style="dark" />
        </UserProvider>
      </SafeAreaProvider>
    );
}

function Content() {
  const { token } = useContext(UserContext)

  return(
    <>
      {
        !token
        ?
        <Login />
        :
        <SearchProvider>
          <Navigation />
        </SearchProvider>
      }
    </>
  )
}
