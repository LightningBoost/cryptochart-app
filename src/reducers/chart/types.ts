export enum ChartTypes {
  UPDATE_PROPS = '@chart/UPDATE_PROPS',
}

export enum PollInterval {
  M1 = 60000,
  M5 = 300000,
  M10 = 600000,
  M15 = 900000,
  M30 = 1800000,
  H1 = 3600000,
  H6 = 21600000,
  H12 = 43200000,
}

export interface IChartState {
  readonly pollInterval: PollInterval;
}

export interface IChartActions {
  type?: ChartTypes;
  props?: IChartState;
}

export interface IChartOptions {
  pollInterval?: PollInterval;
}
