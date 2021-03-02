import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StackParamList} from './interfaces';
import ChartScreen from '../screens/Chart';

const Stack = createStackNavigator<StackParamList>();

const ChartRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chart" component={ChartScreen} />
    </Stack.Navigator>
  );
};

export default ChartRoutes;
