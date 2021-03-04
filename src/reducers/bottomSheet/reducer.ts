import {
  BottomSheetTypes,
  IBottomSheetActions,
  IBottomSheetState,
} from './types';

const initialState: IBottomSheetState = {
  children: null,
  props: {},
  ref: null,
};

export const bottomSheetReducer = (
  state: IBottomSheetState = initialState,
  action: IBottomSheetActions,
): IBottomSheetState => {
  switch (action.type) {
    case BottomSheetTypes.OPEN_BOTTOMSHEET:
      if (state.ref !== null && state.ref.current) {
        state.ref.current.open();
      }
      return {
        ...state,
        children: action.children,
        props: action.props || {},
      };
    case BottomSheetTypes.CLOSE_BOTTOMSHEET:
      if (state.ref !== null && state.ref.current) {
        state.ref.current.close();
      }
      return {
        ...state,
        children: null,
        props: {},
      };
    case BottomSheetTypes.UPDATE_BOTTOMSHEET_PROPS:
      return {
        ...state,
        ref: action.ref,
      };
    case BottomSheetTypes.MOUNT_BOTTOMSHEET:
      return {
        ...state,
        ref: action.ref,
      };
    default:
      return state;
  }
};
