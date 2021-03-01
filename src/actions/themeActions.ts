import {Dispatch} from 'redux';
import {IThemeState, ThemeTypes} from '../reducers/theme/types';

export const setThemeMode = ({theme}: {theme: IThemeState}) => (
  dispatch: Dispatch,
): void => {
  dispatch({
    type: ThemeTypes.SET_THEME,
    value: {theme},
  });
};
