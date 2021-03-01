import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import MoonIcon from 'react-native-vector-icons/Entypo';
import SunIcon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {setThemeMode} from '../../actions/themeActions';
import SafeAreaView from '../View/safeAreaView';

MoonIcon.loadFont();
SunIcon.loadFont();

const Drawer: React.FC<DrawerContentComponentProps> = (props) => {
  const {dark} = useTypedSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={styles.container}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <View style={styles.darkMode}>
          <TouchableOpacity
            onPress={() => dispatch(setThemeMode({dark: !dark}))}
            style={styles.darkModeButton}>
            {dark ? (
              <SunIcon name="sun" size={30} color="yellow" />
            ) : (
              <MoonIcon name="moon" size={30} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkMode: {
    alignSelf: 'flex-end',
    marginBottom: Platform.OS === 'ios' ? 0 : 25,
    marginRight: 15,
  },
  darkModeButton: {
    padding: 10,
  },
});

export default Drawer;
