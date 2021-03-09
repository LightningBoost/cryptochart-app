import React, {useEffect, useRef} from 'react';
import BS from '@gorhom/bottom-sheet';
import {useDispatch} from 'react-redux';
import {useTheme} from 'react-native-paper';
import {View} from 'react-native';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {mountBottomSheet} from '../../actions/bottomSheetActions';

const BottomSheet: React.FC = () => {
  const initialRef = useRef<BS>(null);

  const {children, ref, props} = useTypedSelector((state) => state.bottomSheet);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (initialRef.current && initialRef !== ref) {
      dispatch(mountBottomSheet({ref: initialRef}));
    }
    // eslint-disable-next-line
  }, [initialRef, ref]);

  return (
    <BS ref={initialRef} snapPoints={['0%', '25%', '50%']} {...props}>
      <View>{children}</View>
    </BS>
  );
};

export default BottomSheet;
