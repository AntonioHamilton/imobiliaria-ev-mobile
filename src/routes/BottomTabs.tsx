import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import HomeIcon from '../assets/icons/HomeIcon';
import Announcements from '../pages/Announcements';
import Register from '../pages/Cadastro';

import { RootTabParamList } from '../types/types';
import Properties from '../pages/Properties';
import Login from "../pages/Login";
import Employees from "../pages/Employees";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabs() {
  return (
      <Tab.Navigator
        initialRouteName="Announcements"
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
          name="Announcements"
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
          name="Register"
          component={Register}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ size, color }) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Employees"
          component={Employees}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ size, color }) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Login"
          component={Login}
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
