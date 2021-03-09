import {Dispatch} from 'redux';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  IBottomSheetState,
  BottomSheetTypes,
} from '../reducers/bottomSheet/types';

export const openBottomSheet = ({
  children,
  props = {},
  snapTo,
}: Partial<IBottomSheetState> &
  Pick<IBottomSheetState, 'children'> & {snapTo: 1 | 2 | 3}) => (
  dispatch: Dispatch,
): void => {
  dispatch({
    type: BottomSheetTypes.OPEN_BOTTOMSHEET,
    children,
    props,
    snapTo,
  });
};

export const closeBottomSheet = () => (dispatch: Dispatch): void => {
  dispatch({
    type: BottomSheetTypes.CLOSE_BOTTOMSHEET,
  });
};

export const updateBottomSheetProps = ({
  props,
}: Pick<IBottomSheetState, 'props'>) => (dispatch: Dispatch): void => {
  dispatch({
    type: BottomSheetTypes.UPDATE_BOTTOMSHEET_PROPS,
    props,
  });
};

export const mountBottomSheet = ({ref}: Pick<IBottomSheetState, 'ref'>) => (
  dispatch: Dispatch,
): void => {
  dispatch({
    type: BottomSheetTypes.MOUNT_BOTTOMSHEET,
    ref,
  });
};
