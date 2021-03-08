import {Dispatch} from 'redux';
import {
  ChartTypes,
  IChartActions,
  IChartOptions,
} from '../reducers/chart/types';

export const updateChartOptions = ({...options}: IChartOptions) => (
  dispatch: Dispatch,
): void => {
  dispatch({
    type: ChartTypes.UPDATE_PROPS,
    props: options,
  });
};

export const addChart = ({
  lineDataset,
  barDataset,
  candleDataset,
}: IChartActions) => (dispatch: Dispatch): void => {
  dispatch({
    type: ChartTypes.ADD_CHART_TO_DATA,
    lineDataset,
    barDataset,
    candleDataset,
  });
};

export const updateChart = ({
  lineDataset,
  barDataset,
  candleDataset,
}: IChartActions) => (dispatch: Dispatch): void => {
  dispatch({
    type: ChartTypes.UPDATE_CHART_DATA,
    lineDataset,
    barDataset,
    candleDataset,
  });
};
