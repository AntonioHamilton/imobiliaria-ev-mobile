import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import HomeIcon from '../assets/icons/HomeIcon';
import Home from '../pages/Login';

import { RootTabParamList } from '../types/types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabs() {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        detachInactiveScreens
        screenOptions={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#000',
          tabBarBackground: () => <View />,
          tabBarStyle: {
            position: 'absolute',
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ size, color }) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}
