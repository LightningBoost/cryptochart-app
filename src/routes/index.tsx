import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChartRoutes from './chart';
import {CombinedDarkTheme, CombinedDefaultTheme} from '../style/theme';
import {useTypedSelector} from '../hooks/useTypedSelector';
import DrawerComponent from '../components/Drawer';
import BottomSheet from '../components/BottomSheet';
import {DrawerParamList} from './interfaces';

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
        </Drawer.Navigator>
      </NavigationContainer>
      <NavigationContainer theme={appTheme}>
        <BottomSheet />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default DefaultRoutes;
