import React from 'react';
import {ActivityIndicator as RNPActivity, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

interface IProps {
  size?: 'small' | 'large' | number;
}

const ActivityIndicator: React.FC<IProps> = ({size}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <RNPActivity animating color={theme.colors.primary} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActivityIndicator;
