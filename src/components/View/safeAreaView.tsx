import React from 'react';
import {StyleSheet} from 'react-native';
import {
  NativeSafeAreaViewProps,
  SafeAreaView as SAV,
} from 'react-native-safe-area-context';

const SafeAreaView: React.FC<NativeSafeAreaViewProps> = ({
  children,
  style,
  ...rest
}) => {
  return (
    <SAV style={[elementStyle.container, style]} {...rest}>
      {children}
    </SAV>
  );
};

const elementStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default SafeAreaView;
