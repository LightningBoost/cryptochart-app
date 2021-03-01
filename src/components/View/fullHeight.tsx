import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

const FullHeightView: React.FC<ViewProps> = ({children, style, ...rest}) => {
  return (
    <View style={[elementStyle.view, style]} {...rest}>
      {children}
    </View>
  );
};

const elementStyle = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default FullHeightView;
