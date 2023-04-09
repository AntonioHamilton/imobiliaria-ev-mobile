import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import LinkingConfiguration from './LinkingConfiguration';
import BottomTabs from './BottomTabs';
import { RootStackParamList } from '../types/types';
import AnnouncementDetail from '../pages/AnnouncementDetail';
import Propertys from '../pages/Properties';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator initialRouteName={"Home"}>
        <Stack.Screen
          name="Home"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AnnouncementDetail"
          component={AnnouncementDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PropertyDetail"
          component={AnnouncementDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterProperty"
          component={AnnouncementDetail}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
