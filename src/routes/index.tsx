import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import ChartRoutes from './chart';
import {CombinedDarkTheme, CombinedDefaultTheme} from '../style/theme';
import {useTypedSelector} from '../hooks/useTypedSelector';
import DrawerComponent from '../components/Drawer';

type DrawerParamList = {
  ChartRoutes: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DefaultRoutes: React.FC = () => {
  const {dark} = useTypedSelector((state) => state.theme);
  const appTheme = dark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={appTheme}>
      <NavigationContainer theme={appTheme}>
        <Drawer.Navigator
          initialRouteName="ChartRoutes"
          drawerContent={(props) => <DrawerComponent {...props} />}>
          <Drawer.Screen name="ChartRoutes" component={ChartRoutes} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default DefaultRoutes;
