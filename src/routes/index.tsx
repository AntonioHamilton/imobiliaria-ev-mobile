import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import LinkingConfiguration from './LinkingConfiguration';
import BottomTabs from './BottomTabs';
import { RootStackParamList } from '../types/types';
import AnnouncementDetail from '../pages/AnnouncementDetail';
import PropertyDetail from '../pages/PropertyDetail';
import RegisterProperty from '../pages/RegisterProperty/RegisterProperty';
import RegisterEmployee from '../pages/RegisterEmployees';
import RegisterInterest from '../pages/RegisterInterest';
import Interested from '../pages/Interested';
import EmployeeDetail from '../pages/EmployeeDetail';
import CreateContract from '../pages/CreateContract';
import Contracts from '../pages/Contracts';
import ContractDetail from '../pages/ContractDetail';
import ChangeContract from '../pages/ChangeContract';
import CreateAnnouncement from '../pages/CreateAnnouncement';

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
          component={PropertyDetail}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="Contracts"
          component={Contracts}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateContract"
          component={CreateContract}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangeContract"
          component={ChangeContract}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ContractDetail"
          component={ContractDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EmployeeDetail"
          component={EmployeeDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterProperty"
          component={RegisterProperty}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterEmployee"
          component={RegisterEmployee}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterInterest"
          component={RegisterInterest}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Interested"
          component={Interested}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="CreateAnnouncement"
          component={CreateAnnouncement}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
