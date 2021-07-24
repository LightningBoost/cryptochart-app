import React, {useCallback, useMemo} from 'react';
import {VictoryBar} from 'victory-native';
import dayjs from 'dayjs';
import {minBy, maxBy} from 'lodash';
import {BarDatasets} from '../../generated/graphql';

interface IBarChart {
  data: BarDatasets[];
}

const MAX_BAR_PERCENT = 0.25;

const BarChart = ({data}: IBarChart): Element[] => {
  const getDomain = useCallback((chart: BarDatasets) => {
    return {
      y: [
        minBy(chart.values, (d) => d.y)?.y || 0,
        maxBy(chart.values, (d) => d.y)?.y || 0,
      ] as [number, number],
      x: [
        dayjs(parseInt(chart.values[0].x, 10)).toDate(),
        dayjs(parseInt(chart.values[chart.values.length - 1].x, 10)).toDate(),
      ] as [Date, Date],
    };
  }, []);

  const maxima = useMemo(() => {
    return data.map(
      (dataset) =>
        Math.max(...dataset.values.map((d) => d.y)) / MAX_BAR_PERCENT,
    );
  }, [data]);

  return data.map((chart, i) => (
    <VictoryBar
      key={chart.label}
      data={chart.values}
      domain={getDomain(chart)}
      x={(datum) => dayjs(parseInt(datum.x, 10)).toDate()}
      y={(datum) => datum.y / maxima[i]}
      style={{data: {fillOpacity: 0.7}}}
    />
  ));
};

export default BarChart;
