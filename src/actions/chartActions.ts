import {Dispatch} from 'redux';
import {ChartTypes, IChartOptions} from '../reducers/chart/types';

export const updateChartOptions = ({...options}: IChartOptions) => (
  dispatch: Dispatch,
): void => {
  dispatch({
    type: ChartTypes.UPDATE_PROPS,
    props: options,
  });
};
