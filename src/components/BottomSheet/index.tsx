import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {mountBottomSheet} from '../../actions/bottomSheetActions';

export const BottomSheet: React.FC = () => {
  const initialRef = useRef<Modalize>(null);
  const {children, ref, props} = useTypedSelector((state) => state.bottomSheet);
  const dispatch = useDispatch();

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
      {...props}>
      <View style={styles.container}>{children}</View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 100,
  },
});
