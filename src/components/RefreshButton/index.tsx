import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'react-native-paper';

FontAwesome5Icon.loadFont();

interface Props {
  onPress: () => void;
}

const RefreshButton = ({onPress}: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome5Icon name="refresh" size={18} color={theme.colors.text} />
    </TouchableOpacity>
  );
};

export default RefreshButton;
