import React, { useContext } from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import HomeIcon from '../assets/icons/HomeIcon';
import Announcements from '../pages/Announcements';
import Register from '../pages/Register';

import { RootTabParamList } from '../types/types';
import Properties from '../pages/Properties';
import Employees from "../pages/Employees";
import Profile from "../pages/Profile";
import { UserContext } from "../context/userProvider";
import LoginUser from "../pages/LoginUser";
import { EmployeeContext } from "../context/employeeProvider";
import LoginEmployee from "../pages/LoginEmployee";
import Employee from "../pages/Employee";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabs() {

  const { token: tokenUser } = useContext(UserContext)
  const { token: tokenEmployee } = useContext(EmployeeContext)

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
        {
          !tokenEmployee && (
            !tokenUser
            ?
            <Tab.Screen
              name="LoginUser"
              component={LoginUser}
              options={{
                unmountOnBlur: true,
                tabBarIcon: ({ size, color }) => (
                  <HomeIcon size={size} color={color} />
                ),
              }}
            />
            :
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                unmountOnBlur: true,
                tabBarIcon: ({ size, color }) => (
                  <HomeIcon size={size} color={color} />
                ),
              }}
            />
          )
        }
        {
          !tokenUser && (
            !tokenEmployee
            ?
            <Tab.Screen
              name="LoginEmployee"
              component={LoginEmployee}
              options={{
                unmountOnBlur: true,
                tabBarIcon: ({ size, color }) => (
                  <HomeIcon size={size} color={color} />
                ),
              }}
            />
            :
            <Tab.Screen
              name="Employee"
              component={Employee}
              options={{
                unmountOnBlur: true,
                tabBarIcon: ({ size, color }) => (
                  <HomeIcon size={size} color={color} />
                ),
              }}
            />
          )
        }
      </Tab.Navigator>
  );
}
