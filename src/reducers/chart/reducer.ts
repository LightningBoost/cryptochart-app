import remove from 'lodash/remove';
import {ChartTypes, IChartActions, IChartState, PollInterval} from './types';
import {ChartQuery} from '../../generated/graphql';

const initialState: IChartState = {
  pollInterval: PollInterval.M1,
  charts: [ChartQuery.Candlestick],
};

export const chartReducer = (
  state: IChartState = initialState,
  action: IChartActions,
): IChartState => {
  switch (action.type) {
    case ChartTypes.ADD_CHART: {
      const charts = state.charts.slice();
      if (action.chart) {
        charts.push(action.chart);
      }
      return {
        ...state,
        charts,
      };
    }
    case ChartTypes.REMOVE_CHART: {
      const charts = state.charts.slice();
      if (action.chart) {
        remove(charts, (c) => c === action.chart);
      }
      return {
        ...state,
        charts,
      };
    }
    case ChartTypes.UPDATE_PROPS:
      return {
        ...state,
        ...action.props,
      };

    default:
      return state;
  }
};
