import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {DrawerActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {DrawerParamList} from '../../routes/interfaces';

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

const styles = StyleSheet.create({
  drawerIcon: {
    marginLeft: 20,
  },
});

export default DrawerIcon;
