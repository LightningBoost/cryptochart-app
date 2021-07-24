import React, {useMemo} from 'react';
import {VictoryLine} from 'victory-native';
import dayjs from 'dayjs';
import {LineDatasets} from '../../generated/graphql';

interface ILineChart {
  data: LineDatasets[];
}

const LineChart = ({data}: ILineChart): Element[] => {
  const maxima = useMemo(() => {
    return data.map((dataset) => Math.max(...dataset.values.map((d) => d.y)));
  }, [data]);

  const minima = useMemo(() => {
    return data.map((dataset) => Math.min(...dataset.values.map((d) => d.y)));
  }, [data]);

  return data.map((chart, i) => (
    <VictoryLine
      key={chart.label}
      data={chart.values}
      x={(datum) => dayjs(parseInt(datum.x, 10)).toDate()}
      y={(datum) => (datum.y - minima[i]) / (maxima[i] - minima[i])}
    />
  ));
};

export default LineChart;
