import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import BS from '@gorhom/bottom-sheet';
import {useDispatch} from 'react-redux';
import {useTheme} from 'react-native-paper';
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {
  closeBottomSheet,
  mountBottomSheet,
} from '../../actions/bottomSheetActions';

interface IProps {
  active: boolean;
}

const Backdrop: React.FC<IProps> = ({active}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const opacityValue = new Animated.Value(0);

  const backgroundColorFn = () => {
    opacityValue.setValue(0);

    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    backgroundColorFn();
    // eslint-disable-next-line
  }, [active]);

  const opacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.8],
  });

  const handleClose = useCallback(() => {
    dispatch(closeBottomSheet());
    // eslint-disable-next-line
  }, []);

  return active ? (
    <TouchableWithoutFeedback onPress={handleClose}>
      <Animated.View style={[styles({theme}).backdrop, {opacity}]} />
    </TouchableWithoutFeedback>
  ) : null;
};

const BottomSheetHandle: React.FC<IProps> = ({active}) => {
  const theme = useTheme();

  return active ? (
    <View style={styles({theme}).handle}>
      <View style={styles({theme}).indicator} />
    </View>
  ) : null;
};

const BottomSheet: React.FC = () => {
  const initialRef = useRef<BS>(null);

  const theme = useTheme();
  const {children, ref, props} = useTypedSelector((state) => state.bottomSheet);
  const dispatch = useDispatch();
  const snapPoints = useMemo(() => ['0%', '25%', '50%', '75%', '90%'], []);

  useEffect(() => {
    if (initialRef.current && initialRef !== ref) {
      dispatch(mountBottomSheet({ref: initialRef}));
    }
    // eslint-disable-next-line
  }, [initialRef, ref]);

  const handleChange = useCallback((index: number) => {
    if (index === 0) {
      dispatch(closeBottomSheet());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <BS
      ref={initialRef}
      index={-1}
      handleComponent={() => BottomSheetHandle({active: !!children})}
      backdropComponent={() => Backdrop({active: !!children})}
      snapPoints={snapPoints}
      onChange={handleChange}
      {...props}>
      <View style={styles({theme}).container}>
        <View style={styles({theme}).innerChildren}>{children}</View>
      </View>
    </BS>
  );
};

const styles = ({theme}: {theme: ReactNativePaper.Theme}) =>
  StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'black',
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    handle: {
      backgroundColor: theme.colors.background,
      height: 24,
      padding: 10,
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      shadowOffset: {
        width: 0,
        height: -5,
      },
      shadowOpacity: 0.8,
      shadowRadius: 10,
    },
    indicator: {
      backgroundColor: 'gray',
      alignSelf: 'center',
      width: 20,
      height: 4,
      borderRadius: 4,
    },
    innerChildren: {
      alignSelf: 'center',
      width: '90%',
    },
  });

export default BottomSheet;
