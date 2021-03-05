import React, {useEffect} from 'react';
import {TouchableOpacity, Animated, Easing} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'react-native-paper';

FontAwesome5Icon.loadFont();

interface Props {
  onPress: () => void;
  size?: number;
  spin?: boolean;
}

const RefreshButton: React.FC<Props> = ({onPress, spin = false, size = 18}) => {
  const theme = useTheme();
  const spinValue = new Animated.Value(0);

  const spinFunction = () => {
    spinValue.setValue(0);

    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      if (spin) {
        spinFunction();
      }
    });
  };

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    if (spin) {
      spinFunction();
    }
    // eslint-disable-next-line
  }, [spin]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={{transform: [{rotate}]}}>
        <FontAwesome5Icon
          name="refresh"
          size={size}
          color={theme.colors.text}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default RefreshButton;
