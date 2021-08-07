import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import DrawerIcon from '../components/StackNavigator/Drawer';
import RampScreen from '../screens/Ramp';
import RampWebView from '../screens/Ramp/webview';
import {RampStackParamList} from './interfaces';

const Stack = createStackNavigator<RampStackParamList>();

const RampRoutes: React.FC = () => {
  const {t} = useTranslation();

  const screenOptions = useMemo<StackNavigationOptions>(
    () => ({
      headerLeft: () => <DrawerIcon />,
      title: t('Buy/Sell'),
    }),
    [t],
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Ramp" component={RampScreen} />
      <Stack.Screen name="RampView" component={RampWebView} />
    </Stack.Navigator>
  );
};

export default RampRoutes;
