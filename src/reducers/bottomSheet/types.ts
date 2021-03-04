import {Modalize, ModalizeProps} from 'react-native-modalize';
import {RefObject} from 'react';

export enum BottomSheetTypes {
  OPEN_BOTTOMSHEET = '@bottomSheet/OPEN_BOTTOMSHEET',
  CLOSE_BOTTOMSHEET = '@bottomSheet/CLOSE_BOTTOMSHEET',
  UPDATE_BOTTOMSHEET_PROPS = '@bottomSheet/UPDATE_BOTTOMSHEET_PROPS',
  MOUNT_BOTTOMSHEET = '@bottomSheet/MOUNT_BOTTOMSHEET',
}

export interface IBottomSheetState {
  readonly children: null | Element;
  readonly props: ModalizeProps;
  readonly ref: RefObject<Modalize> | null;
}

export interface IBottomSheetActions {
  type: BottomSheetTypes;
  children: null | Element;
  props: ModalizeProps;
  ref: RefObject<Modalize> | null;
}
