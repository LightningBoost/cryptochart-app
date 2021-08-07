import React from 'react';
import {useTheme} from 'react-native-paper';

import dayjs from 'dayjs';
import {VictoryAxis, VictoryCandlestick} from 'victory-native';

import {CandleStickDataset} from '../../generated/graphql';
import Currency from '../../utils/currencyjs';

interface ICandleStickChart {
  data: CandleStickDataset;
  maxima: number;
  minima: number;
}

const CandleStickChart = ({
  data,
  maxima,
  minima,
}: ICandleStickChart): Element[] => {
  const theme = useTheme();

  return [
    <VictoryCandlestick
      key={1}
      data={data.values}
      x={(datum) => dayjs(parseInt(datum.x, 10)).toDate()}
      open={(datum) => ((datum as any).open - minima) / (maxima - minima)}
      close={(datum) => ((datum as any).close - minima) / (maxima - minima)}
      high={(datum) => ((datum as any).high - minima) / (maxima - minima)}
      low={(datum) => ((datum as any).low - minima) / (maxima - minima)}
      candleColors={{positive: 'green', negative: 'red'}}
    />,
    <VictoryAxis
      key={2}
      dependentAxis
      gridComponent={<></>}
      tickValues={[0.25, 0.5, 0.75, 1]}
      tickFormat={(t) =>
        Currency(
          Currency(t)
            .multiply(maxima - minima)
            .add(minima),
          {
            precision: 0,
            symbol: '',
          },
        ).format()
      }
      style={{
        tickLabels: {textAnchor: 'start', fill: theme.colors.text},
        ticks: {padding: -15, size: -5},
      }}
    />,
  ];
};

export default CandleStickChart;
