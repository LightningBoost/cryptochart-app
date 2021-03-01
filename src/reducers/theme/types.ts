export enum ThemeTypes {
  SET_THEME = '@theme/SET_THEME',
}

export interface IThemeState {
  readonly theme: 'light' | 'dark';
}

export interface IThemeAction {
  type: ThemeTypes;
  value: IThemeState;
}
