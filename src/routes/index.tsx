import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ChartRoutes from './chart';

type DrawerParamList = {
  ChartRoutes: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DefaultRoutes: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="ChartRoutes">
      <Drawer.Screen name="ChartRoutes" component={ChartRoutes} />
    </Drawer.Navigator>
  );
};

export default DefaultRoutes;
