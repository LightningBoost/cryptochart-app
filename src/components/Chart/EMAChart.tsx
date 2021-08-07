import React from 'react';

import dayjs from 'dayjs';
import {VictoryLine} from 'victory-native';

import {ILineChart} from './interface';

const EMAChart = ({data, maxima, minima}: ILineChart): Element[] => {
  return data.map((chart) => (
    <VictoryLine
      key={chart.label}
      data={chart.values}
      x={(datum) => dayjs(parseInt(datum.x, 10)).toDate()}
      y={(datum) => (datum.y - minima) / (maxima - minima)}
      style={{data: {stroke: chart?.color || undefined}}}
    />
  ));
};

export default EMAChart;
