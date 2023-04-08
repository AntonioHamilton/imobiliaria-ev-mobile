import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SearchProvider from './src/context/searchProvider';

import Navigation from './src/routes';

export default function App() {
    return (
      <SafeAreaProvider>
        <SearchProvider>
          <Navigation />
          <StatusBar />
        </SearchProvider>
      </SafeAreaProvider>
    );
}
