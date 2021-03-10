import React from 'react';
import RNPickerSelect, {Item} from 'react-native-picker-select';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import TextInput from '../TextInput';

Entypo.loadFont();

interface IProps {
  items: Item[];
  value: string | number;
  label?: string;
  onValueChange: (value: string | number, index: number) => void;
  placeholder?: {label: string; value: null} | Record<string, never>;
}

const Picker: React.FC<IProps> = ({
  label,
  items,
  value,
  onValueChange,
  placeholder = {},
}) => {
  const theme = useTheme();

  return (
    <TextInput
      label={label}
      value={String(value)}
      style={pickerStyles(theme).inputContainer}
      render={() => (
        <RNPickerSelect
          items={items}
          value={value}
          onValueChange={onValueChange}
          placeholder={placeholder}
          useNativeAndroidPickerStyle={false}
          style={pickerStyles(theme)}
          Icon={() => (
            <Entypo name="chevron-down" size={24} color={theme.colors.text} />
          )}
        />
      )}
    />
  );
};

const pickerStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    iconContainer: {
      justifyContent: 'center',
      height: '100%',
      marginRight: 5,
    },
    inputContainer: {
      width: '100%',
    },
    inputIOS: {
      fontSize: 16,
      height: 56,
      paddingHorizontal: 12,
      paddingTop: 28,
      color: theme.colors.text,
      textAlignVertical: 'center',
      width: '100%',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      height: 66,
      paddingHorizontal: 12,
      paddingTop: 38,
      color: theme.colors.text,
      textAlignVertical: 'center',
      width: '100%',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

export default Picker;
