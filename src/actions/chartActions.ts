import {Dispatch} from 'redux';
import {IChartState, ChartTypes} from '../reducers/chart/types';

export const updateChartOptions = ({...options}: IChartState) => (
  dispatch: Dispatch,
): void => {
  dispatch({
    type: ChartTypes.UPDATE_PROPS,
    props: options,
  });
};
