import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'react-native-paper';

FontAwesome5Icon.loadFont();

interface Props {
  onPress: () => void;
  size?: number;
}

const RefreshButton: React.FC<Props> = ({onPress, size = 18}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome5Icon name="refresh" size={size} color={theme.colors.text} />
    </TouchableOpacity>
  );
};

export default RefreshButton;
