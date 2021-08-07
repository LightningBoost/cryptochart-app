import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

const ContainerWidth: React.FC<ViewProps> = ({children, style, ...rest}) => {
  return (
    <View style={elementStyle.externalContainer}>
      <View style={[elementStyle.container, style]} {...rest}>
        {children}
      </View>
    </View>
  );
};

const elementStyle = StyleSheet.create({
  externalContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    width: '90%',
  },
});

export default ContainerWidth;
