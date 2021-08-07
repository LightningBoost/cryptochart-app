import {Dispatch} from 'redux';

import {ChartQuery} from '../generated/graphql';
import {ChartTypes, IChartOptions} from '../reducers/chart/types';

export const updateChartOptions =
  ({...options}: IChartOptions) =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: ChartTypes.UPDATE_PROPS,
      props: options,
    });
  };

export const addChart =
  (chart: ChartQuery) =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: ChartTypes.ADD_CHART,
      chart,
    });
  };

export const removeChart =
  (chart: ChartQuery) =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: ChartTypes.REMOVE_CHART,
      chart,
    });
  };
