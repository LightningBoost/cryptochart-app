import React from 'react';
import {useTranslation} from 'react-i18next';
import {Provider as PaperProvider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import BottomSheet from '../components/BottomSheet';
import DrawerComponent from '../components/Drawer';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {CombinedDarkTheme, CombinedDefaultTheme} from '../style/theme';
import ChartRoutes from './chart';
import {DrawerParamList} from './interfaces';
import RampRoutes from './ramp';

MaterialCommunityIcons.loadFont();

const Drawer = createDrawerNavigator<DrawerParamList>();

const DefaultRoutes: React.FC = () => {
  const {t} = useTranslation();
  const {dark} = useTypedSelector((state) => state.theme);
  const appTheme = dark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={appTheme}>
      <NavigationContainer theme={appTheme}>
        <Drawer.Navigator
          initialRouteName="ChartRoutes"
          drawerContent={(props) => <DrawerComponent {...props} />}>
          <Drawer.Screen
            name="ChartRoutes"
            component={ChartRoutes}
            options={{
              title: t('Chart'),
              drawerIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="chart-line"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Ramp"
            component={RampRoutes}
            options={{
              title: t('Buy/Sell'),
              drawerIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="bitcoin"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
      <NavigationContainer theme={appTheme}>
        <BottomSheet />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default DefaultRoutes;
