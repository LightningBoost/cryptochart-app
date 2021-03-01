import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

const FullWidthView: React.FC<ViewProps> = ({children, style, ...rest}) => {
  return (
    <View style={[elementStyle.view, style]} {...rest}>
      {children}
    </View>
  );
};

const elementStyle = StyleSheet.create({
  view: {
    width: '100%',
  },
});

export default FullWidthView;
