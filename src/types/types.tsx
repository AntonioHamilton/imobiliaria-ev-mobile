/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: NavigatorScreenParams<RootTabParamList> | undefined;
  EmployeeDetail: NavigatorScreenParams<RootTabParamList> |  { id: number | undefined, isOnlyOne: boolean };
  Announcements: NavigatorScreenParams<RootTabParamList> | undefined;
  AnnouncementDetail: NavigatorScreenParams<RootTabParamList> | undefined;
  Properties: NavigatorScreenParams<RootTabParamList> | undefined;
  PropertyDetail: NavigatorScreenParams<RootTabParamList> | undefined;
  RegisterProperty: NavigatorScreenParams<RootTabParamList> |  { id: number | undefined };
  Register: NavigatorScreenParams<RootTabParamList> | undefined;
  RegisterEmployee: NavigatorScreenParams<RootTabParamList> | undefined;
  LoginUser: NavigatorScreenParams<RootTabParamList> | undefined;
  Profile: NavigatorScreenParams<RootTabParamList> | undefined;
  LoginEmployee: NavigatorScreenParams<RootTabParamList> | undefined;
  Employee: NavigatorScreenParams<RootTabParamList> | undefined;
  Employees: undefined;
  RegisterInterest: NavigatorScreenParams<RootTabParamList> | { id: number } | undefined;
  Interested: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Properties: undefined;
  Register: undefined;
  Announcements: undefined;
  Employees: undefined;
  LoginUser: undefined;
  Profile: undefined;
  LoginEmployee: undefined;
  Employee: undefined;
  RegisterInterest: undefined;
  Interested: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
