import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import ChartScreen from '../screens/Chart';

export type StackParamList = {
  Chart: NavigatorScreenParams<undefined>;
};

const Stack = createStackNavigator<StackParamList>();

const ChartRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chart" component={ChartScreen} />
    </Stack.Navigator>
  );
};

export default ChartRoutes;
