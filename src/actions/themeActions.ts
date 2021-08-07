import {Dispatch} from 'redux';

import {IThemeState, ThemeTypes} from '../reducers/theme/types';

export const setThemeMode =
  ({dark}: IThemeState) =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: ThemeTypes.SET_THEME,
      value: {dark},
    });
  };
