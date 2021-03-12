import React, {useMemo} from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from 'react-native-paper';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {DrawerParamList, StackParamList} from './interfaces';
import ChartScreen from '../screens/Chart';

const Stack = createStackNavigator<StackParamList>();

const DrawerIcon: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<DrawerParamList>>();
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <MaterialIcons
        name="menu"
        color={theme.colors.text}
        size={28}
        style={styles.drawerIcon}
      />
    </TouchableOpacity>
  );
};

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

const styles = StyleSheet.create({
  drawerIcon: {
    marginLeft: 20,
  },
});

export default ChartRoutes;
