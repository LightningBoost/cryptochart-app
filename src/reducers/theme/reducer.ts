import {ThemeTypes, IThemeAction, IThemeState} from './types';

const initialState: IThemeState = {
  dark: false,
};

export const themeReducer = (
  state: IThemeState = initialState,
  action: IThemeAction,
): IThemeState => {
  switch (action.type) {
    case ThemeTypes.SET_THEME:
      return {
        dark: action.value.dark,
      };
    default:
      return state;
  }
};
