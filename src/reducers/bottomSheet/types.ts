import BottomSheet, {BottomSheetProps} from '@gorhom/bottom-sheet';
import {RefObject} from 'react';

export enum BottomSheetTypes {
  OPEN_BOTTOMSHEET = '@bottomSheet/OPEN_BOTTOMSHEET',
  CLOSE_BOTTOMSHEET = '@bottomSheet/CLOSE_BOTTOMSHEET',
  UPDATE_BOTTOMSHEET_PROPS = '@bottomSheet/UPDATE_BOTTOMSHEET_PROPS',
  MOUNT_BOTTOMSHEET = '@bottomSheet/MOUNT_BOTTOMSHEET',
}

export interface IBottomSheetState {
  readonly children: null | Element;
  readonly props: Partial<BottomSheetProps>;
  readonly ref: RefObject<BottomSheet> | null;
}

export interface IBottomSheetActions {
  type: BottomSheetTypes;
  children: null | Element;
  props: Partial<BottomSheetProps>;
  ref: RefObject<BottomSheet> | null;
}
