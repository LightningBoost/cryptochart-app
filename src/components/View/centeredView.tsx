import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

const CenteredView: React.FC<ViewProps> = ({children, style, ...rest}) => {
  return (
    <View style={[elementStyle.container, style]} {...rest}>
      {children}
    </View>
  );
};

const elementStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default CenteredView;
