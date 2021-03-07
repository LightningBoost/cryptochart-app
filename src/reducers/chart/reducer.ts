import {ChartTypes, IChartActions, IChartState, PollInterval} from './types';
import updateChart from './updateChart';

const initialState: IChartState = {
  pollInterval: PollInterval.M1,
  data: {
    lineData: {
      dataSets: [],
    },
    barData: {
      dataSets: [],
    },
    candleData: {
      dataSets: [],
    },
    scatterData: {
      dataSets: [],
    },
    bubbleData: {
      dataSets: [],
    },
  },
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
    case ChartTypes.ADD_CHART_TO_DATA:
      return {
        ...state,
        data: {
          lineData: {
            dataSets: action.lineDataset
              ? state.data.lineData?.dataSets?.concat(action.lineDataset)
              : state.data.lineData?.dataSets,
          },
          barData: {
            dataSets: action.barDataset
              ? state.data.barData?.dataSets?.concat(action.barDataset)
              : state.data.barData?.dataSets,
          },
          candleData: {
            dataSets: action.candleDataset
              ? state.data.candleData?.dataSets?.concat(action.candleDataset)
              : state.data.candleData?.dataSets,
          },
        },
      };

    case ChartTypes.UPDATE_CHART_DATA:
      return {
        ...state,
        data: updateChart(action, state.data),
      };

    default:
      return state;
  }
};
