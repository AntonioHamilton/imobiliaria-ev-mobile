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
  MyLists: NavigatorScreenParams<RootTabParamList> | { list: string };
  Home: NavigatorScreenParams<RootTabParamList> | undefined;
  Login: NavigatorScreenParams<RootTabParamList> | undefined;
  Register: NavigatorScreenParams<RootTabParamList> | undefined;
  RecoverPassword: NavigatorScreenParams<RootTabParamList> | undefined;
  SearchContent: NavigatorScreenParams<RootTabParamList> | undefined;
  Main: NavigatorScreenParams<RootTabParamList> | undefined;
  ContentDetail: NavigatorScreenParams<RootTabParamList> | undefined;
  ContentForm:
    | NavigatorScreenParams<RootTabParamList>
    | { isEdit: boolean; list: string; rate: number; review: string };
  ProfileLists: NavigatorScreenParams<RootTabParamList> | undefined;
  UserList: NavigatorScreenParams<RootTabParamList> | { route: string };
  UserProfile: NavigatorScreenParams<RootTabParamList> | { id: string };
  EditProfile: NavigatorScreenParams<RootTabParamList> | { refresh?: number };
  Notification: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Notes: undefined;
  Lists: undefined;
  Profile: undefined | { refresh?: number };
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export enum ApiEnum {
  'anime' = 'anime',
  'book' = 'book',
  'movie' = 'movie',
  'manga' = 'manga',
  'serie' = 'serie',
}

export enum ApiNamesEnum {
  jikan = 'jikan',
  googleBooks = 'GoogleBooks',
  tmdb = 'TMDB',
}

export type ApiContent = {
  id: string | number;
  imageUrl: string;
  title: string;
  description?: string;
};

export type ExternalApi = {
  getTopRated: (limit?: number) => Promise<ApiContent[]>;
  getById: (id: string | number) => Promise<ApiContent>;
  getBySearch: (query: string, limit?: number) => Promise<ApiContent[]>;
};
