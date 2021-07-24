import React from 'react';
import {VictoryLine} from 'victory-native';
import dayjs from 'dayjs';
import {LineDatasets} from '../../generated/graphql';

interface ILineChart {
  data: LineDatasets[];
  maxima: number;
  minima: number;
}

const LineChart = ({data, maxima, minima}: ILineChart): Element[] => {
  return data.map((chart) => (
    <VictoryLine
      key={chart.label}
      data={chart.values}
      x={(datum) => dayjs(parseInt(datum.x, 10)).toDate()}
      y={(datum) => (datum.y - minima) / (maxima - minima)}
    />
  ));
};

export default LineChart;
