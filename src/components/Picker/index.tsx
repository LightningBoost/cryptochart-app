import React from 'react';
import RNPickerSelect, {Item} from 'react-native-picker-select';

interface IProps {
  items: Item[];
  value: string | number;
  onValueChange: (value: string | number, index: number) => void;
}

const Picker: React.FC<IProps> = ({items, value, onValueChange}) => {
  return (
    <RNPickerSelect onValueChange={onValueChange} items={items} value={value} />
  );
};

export default Picker;
