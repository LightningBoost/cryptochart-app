import React, {useMemo} from 'react';
import {
  createStackNavigator,
  HeaderBackButton,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import OptionsScreen from './optionsScreen';
import TechnicalOptions from './technicalOptions';

const Stack = createStackNavigator();

const ChartOptions: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const screenOptions = useMemo<StackNavigationOptions>(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: true,
      safeAreaInsets: {top: 0},
      headerStyle: {
        backgroundColor: theme.colors.background,
        shadowColor: 'transparent',
        elevation: 0,
      },
      headerHideShadow: true,
      headerLeft: ({onPress, ...props}) => (
        <TouchableOpacity onPress={onPress}>
          <HeaderBackButton {...props} />
        </TouchableOpacity>
      ),
      cardStyle: {
        backgroundColor: theme.colors.background,
      },
      cardShadowEnabled: false,
    }),
    [theme.colors.background],
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
      <Stack.Screen
        name="TechnicalOptions"
        component={TechnicalOptions}
        options={{headerTitle: t('Technical indicators')}}
      />
    </Stack.Navigator>
  );
};

export default ChartOptions;
