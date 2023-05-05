import React, { useContext, useEffect, useState } from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

//Icons
import HomeIcon from '../assets/icons/HomeIcon';
import SearchIcon from "../assets/icons/SearchIcon";
import ProfileIcon from "../assets/icons/ProfileIcon";
import FavoriteIcon from "../assets/icons/FavoriteIcon";
import UserPlus from "../assets/icons/UserPlusIcon";
import LoginIcon from "../assets/icons/LoginIcon"
import BriefcaseIcon from "../assets/icons/FuncionarioIcon";
import FuncionarioIcon from "../assets/icons/FuncionarioIcon";
import AnunciosIcon from "../assets/icons/AnunciosIcon";
import ImoveisIcon from "../assets/icons/ImoveisIcon";
import LoginFuncionarioIcon from "../assets/icons/LoginFuncionarioIcon";

//Pages
import Announcements from '../pages/Announcements';
import Register from '../pages/Register';
import { RootTabParamList } from '../types/types';
import Properties from '../pages/Properties';
import Employees from "../pages/Employees";
import Profile from "../pages/Profile";
import { UserContext } from "../context/userProvider";
import LoginUser from "../pages/LoginUser";
import LoginEmployee from "../pages/LoginEmployee";
import Employee from "../pages/Employee";
import Interested from "../pages/Interested";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabs() {
  const { user } = useContext(UserContext)
  const [isLoggedIn, setIsLoggedIn] = useState(!!user?.data);

  const userExists = user?.data

  const employeeAccess = (isLoggedIn && userExists && user.isEmployee)

  const handleUser = async () => {
    if (Object.keys(user.data).length) setIsLoggedIn(true)
    else setIsLoggedIn(false)
  }

  useEffect(() => {
    handleUser()
  }, [user])

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
              <AnunciosIcon size={size} color={color} />
            ),
          }}
        />
        {employeeAccess && <Tab.Screen
          name="Properties"
          component={Properties}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ size, color }) => (
              <ImoveisIcon size={size} color={color} />
            ),
          }}
        />}
        {!isLoggedIn && (<Tab.Screen
          name="Register"
          component={Register}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ size, color }) => (
              <UserPlus size={size} color={color} />
            ),
          }}
        />)}
        {employeeAccess && <Tab.Screen
          name="Employees"
          component={Employees}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ size, color }) => (
              <FuncionarioIcon size={size} color={color} />
            ),
          }}
        />}
        {
          (
            (isLoggedIn && userExists)
            ?
            !user.isEmployee && <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                unmountOnBlur: true,
                tabBarIcon: ({ size, color }) => (
                  <ProfileIcon size={size} color={color} />
                ),
              }}
            />
            :
            <Tab.Screen
              name="LoginUser"
              component={LoginUser}
              options={{
                unmountOnBlur: true,
                tabBarIcon: ({ size, color }) => (
                  <LoginIcon size={size} color={color} />
                ),
              }}
            />
            
          )
        }
        {
          ( isLoggedIn && userExists && user.isEmployee ?
            <>
              <Tab.Screen
                name="Employee"
                component={Employee}
                options={{
                  unmountOnBlur: true,
                  tabBarIcon: ({ size, color }) => (
                    <ProfileIcon size={size} color={color} />
                  ),
                }}
              />
            </>
            :
            (!isLoggedIn || user.isEmployee) && <Tab.Screen
              name="LoginEmployee"
              component={LoginEmployee}
              options={{
                unmountOnBlur: true,
                tabBarIcon: ({ size, color }) => (
                  <LoginFuncionarioIcon size={size} color={color} />
                ),
              }}
            />
          )
        }
      </Tab.Navigator>
  );
}
