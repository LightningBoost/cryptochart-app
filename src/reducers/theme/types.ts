export enum ThemeTypes {
  SET_THEME = '@theme/SET_THEME',
}

export interface IThemeState {
  readonly dark: boolean;
}

export interface IThemeAction {
  type: ThemeTypes;
  value: IThemeState;
}
