import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useDispatch} from 'react-redux';
import {useTheme} from 'react-native-paper';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {mountBottomSheet} from '../../actions/bottomSheetActions';

interface IStyles {
  theme: ReactNativePaper.Theme;
}

export const BottomSheet: React.FC = () => {
  const initialRef = useRef<Modalize>(null);
  const {children, ref, props} = useTypedSelector((state) => state.bottomSheet);
  const dispatch = useDispatch();
  const theme = useTheme();

  // pass ref to redux state
  useEffect(() => {
    if (initialRef.current && initialRef !== ref) {
      dispatch(mountBottomSheet({ref: initialRef}));
    }
    // eslint-disable-next-line
  }, [initialRef, ref]);

  return (
    <Modalize
      ref={initialRef}
      disableScrollIfPossible={Platform.OS === 'ios'}
      avoidKeyboardLikeIOS
      scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}
      childrenStyle={styles({theme}).childrenStyle}
      adjustToContentHeight
      {...props}>
      {children}
    </Modalize>
  );
};

const styles = ({theme}: IStyles) =>
  StyleSheet.create({
    childrenStyle: {
      alignItems: 'center',
      paddingBottom: 100,
      backgroundColor: theme.colors.background,
    },
  });
