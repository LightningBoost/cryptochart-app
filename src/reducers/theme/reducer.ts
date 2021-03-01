import {ThemeTypes, IThemeAction, IThemeState} from './types';

const initialState: IThemeState = {
  theme: 'light',
};

export const themeReducer = (
  state: IThemeState = initialState,
  action: IThemeAction,
): IThemeState => {
  switch (action.type) {
    case ThemeTypes.SET_THEME:
      return {
        theme: action.value.theme,
      };
    default:
      return state;
  }
};
