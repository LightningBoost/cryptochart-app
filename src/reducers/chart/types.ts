import {
  BarDataset,
  CandleStickDataset,
  CombinedData,
  LineDataset,
} from 'react-native-charts-wrapper';

export enum ChartTypes {
  UPDATE_PROPS = '@chart/UPDATE_PROPS',
  ADD_CHART_TO_DATA = '@chart/ADD_CHART_TO_DATA',
  REMOVE_CHART_FROM_DATA = '@chart/REMOVE_CHART_FROM_DATA',
  UPDATE_CHART_DATA = '@chart/UPDATE_CHART_DATA',
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
  readonly data: CombinedData;
}

export interface IChartActions {
  type?: ChartTypes;
  props?: IChartState;
  lineDataset?: LineDataset;
  barDataset?: BarDataset;
  candleDataset?: CandleStickDataset;
}
