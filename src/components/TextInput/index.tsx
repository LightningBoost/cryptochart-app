import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput as TI} from 'react-native-paper';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';

import {useTypedSelector} from '../../hooks/useTypedSelector';
import {CombinedDarkTheme, CombinedDefaultTheme} from '../../style/theme';

const TextInput: React.FC<Omit<TextInputProps, 'theme'>> = (props) => {
  const {style} = props;
  const {dark} = useTypedSelector((state) => state.theme);
  const appTheme = dark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <TI
      style={[styles({theme: appTheme}).input, style]}
      theme={appTheme}
      {...props}
    />
  );
};

const styles = ({theme}: {theme: ReactNativePaper.Theme}) =>
  StyleSheet.create({
    input: {
      backgroundColor: theme.colors.background,
    },
  });

export default TextInput;
