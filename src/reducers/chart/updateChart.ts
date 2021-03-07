import remove from 'lodash/remove';
import {CombinedData} from 'react-native-charts-wrapper';
import {IChartActions} from './types';

const updateChart = (
  action: IChartActions,
  data: CombinedData,
): CombinedData => {
  if (action.candleDataset && data.candleData?.dataSets) {
    const newArray = data.candleData.dataSets.slice();
    remove(newArray, (d) => d.label === action.candleDataset?.label);
    newArray.push(action.candleDataset);
    return {
      ...data,
      candleData: {dataSets: newArray},
    };
  }

  if (action.lineDataset && data.lineData?.dataSets) {
    const newArray = data.lineData.dataSets.slice();
    remove(newArray, (d) => d.label === action.lineDataset?.label);
    newArray.push(action.lineDataset);
    return {
      ...data,
      lineData: {dataSets: newArray},
    };
  }

  if (action.barDataset && data.barData?.dataSets) {
    const newArray = data.barData.dataSets.slice();
    remove(newArray, (d) => d.label === action.barDataset?.label);
    newArray.push(action.barDataset);
    return {
      ...data,
      barData: {dataSets: newArray},
    };
  }

  return data;
};

export default updateChart;
