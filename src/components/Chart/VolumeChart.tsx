import React, {ReactElement, useCallback, useMemo} from 'react';

import dayjs from 'dayjs';
import {maxBy, minBy} from 'lodash';
import {VictoryBar} from 'victory-native';

import {BarDataset} from '../../generated/graphql';

interface IVolumeChart {
  data: BarDataset;
}

const MAX_BAR_PERCENT = 0.25;

const VolumeChart = ({data}: IVolumeChart): ReactElement[] => {
  const getDomain = useCallback((chart: BarDataset) => {
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
    return Math.max(...data.values.map((d) => d.y)) / MAX_BAR_PERCENT;
  }, [data]);

  return [
    <VictoryBar
      key={data.label}
      data={data.values}
      domain={getDomain(data)}
      x={(datum) => dayjs(parseInt(datum.x, 10)).toDate()}
      y={(datum) => datum.y / maxima}
      style={{data: {fillOpacity: 0.7}}}
    />,
  ];
};

export default VolumeChart;
