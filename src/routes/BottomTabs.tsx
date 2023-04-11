import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import HomeIcon from '../assets/icons/HomeIcon';
import Announcements from '../pages/Announcements';
import Cadastro from '../pages/Cadastro';

import { RootTabParamList } from '../types/types';
import Properties from '../pages/Properties';

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
          tabBarBackground: () => <View style={{
            height: "100%",
            backgroundColor: "#955cfd"
          }}/>,
          tabBarStyle: {
            position: 'absolute',
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Announcements}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ size, color }) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Properties"
          component={Properties}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ size, color }) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
         <Tab.Screen
          name="Cadastro"
          component={Cadastro}
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
