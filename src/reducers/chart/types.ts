import {ChartQuery} from '../../generated/graphql';

export enum ChartTypes {
  UPDATE_PROPS = '@chart/UPDATE_PROPS',
  ADD_CHART = '@chart/ADD_CHART',
  REMOVE_CHART = '@chart/REMOVE_CHART',
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

interface IProps {
  pollInterval: PollInterval;
}

export interface IChartState {
  readonly pollInterval: PollInterval;
  readonly charts: ChartQuery[];
}

export interface IChartActions {
  type: ChartTypes;
  props?: IProps;
  chart?: ChartQuery;
}

export interface IChartOptions {
  pollInterval?: PollInterval;
}
