import React, {useMemo} from 'react';
import {
  createStackNavigator,
  HeaderBackButton,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import OptionsScreen from './optionsScreen';

const Stack = createStackNavigator();

const ChartOptions: React.FC = () => {
  const screenOptions = useMemo<StackNavigationOptions>(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: true,
      safeAreaInsets: {top: 0},
      headerLeft: ({onPress, ...props}) => (
        <TouchableOpacity onPress={onPress}>
          <HeaderBackButton {...props} />
        </TouchableOpacity>
      ),
      cardStyle: {
        backgroundColor: 'white',
        overflow: 'visible',
      },
    }),
    [],
  );

  const optionsScreenOptions = useMemo<StackNavigationOptions>(
    () => ({headerLeft: () => null, headerShown: false}),
    [],
  );

  return (
    <Stack.Navigator screenOptions={screenOptions} headerMode="screen">
      <Stack.Screen
        name="OptionsScreen"
        component={OptionsScreen}
        options={optionsScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default ChartOptions;
