import {ChartTypes, IChartActions, IChartState, PollInterval} from './types';

const initialState: IChartState = {
  pollInterval: PollInterval.M1,
};

export const chartReducer = (
  state: IChartState = initialState,
  action: IChartActions,
): IChartState => {
  switch (action.type) {
    case ChartTypes.UPDATE_PROPS:
      return {
        ...state,
        ...action.props,
      };
    default:
      return state;
  }
};
