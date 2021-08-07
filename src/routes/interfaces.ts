import {NavigatorScreenParams} from '@react-navigation/native';

export type ChartStackParamList = {
  Chart: NavigatorScreenParams<undefined>;
};

export type RampStackParamList = {
  Ramp: NavigatorScreenParams<undefined>;
  RampView: NavigatorScreenParams<undefined>;
};

export type DrawerParamList = {
  ChartRoutes: undefined;
  Ramp: undefined;
};
