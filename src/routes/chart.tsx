import React, {useMemo} from 'react';

import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import DrawerIcon from '../components/StackNavigator/Drawer';
import ChartScreen from '../screens/Chart';
import {ChartStackParamList} from './interfaces';

const Stack = createStackNavigator<ChartStackParamList>();

const ChartRoutes: React.FC = () => {
  const screenOptions = useMemo<StackNavigationOptions>(
    () => ({
      headerLeft: () => <DrawerIcon />,
    }),
    [],
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Chart" component={ChartScreen} />
    </Stack.Navigator>
  );
};

export default ChartRoutes;
