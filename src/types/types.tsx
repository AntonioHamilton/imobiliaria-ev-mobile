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
  Announcements: NavigatorScreenParams<RootTabParamList> | undefined;
  AnnouncementDetail: NavigatorScreenParams<RootTabParamList> | undefined;
  Properties: NavigatorScreenParams<RootTabParamList> | undefined;
  PropertyDetail: NavigatorScreenParams<RootTabParamList> | undefined;
  RegisterProperty: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Properties: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
