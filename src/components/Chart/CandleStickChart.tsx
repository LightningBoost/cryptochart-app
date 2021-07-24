import React, {useMemo} from 'react';
import {VictoryAxis, VictoryCandlestick} from 'victory-native';
import dayjs from 'dayjs';
import {CandleStickDatasets} from '../../generated/graphql';
import Currency from '../../utils/currencyjs';

interface ICandleStickChart {
  data: CandleStickDatasets[];
}

const CandleStickChart = ({data}: ICandleStickChart): Element[] => {
  const maxima = useMemo(() => {
    return data.map((dataset) =>
      Math.max(...dataset.values.map((d) => d.high)),
    );
  }, [data]);

  const minima = useMemo(() => {
    return data.map((dataset) => Math.min(...dataset.values.map((d) => d.low)));
  }, [data]);

  return [
    data.map((chart, i) => (
      <VictoryAxis
        key={chart.label}
        dependentAxis
        tickValues={[0.25, 0.5, 0.75, 1]}
        tickFormat={(t) =>
          Currency(
            Currency(t)
              .multiply(maxima[i] - minima[i])
              .add(minima[i]),
            {
              precision: 0,
              symbol: '',
            },
          ).format()
        }
        style={{
          tickLabels: {textAnchor: 'start'},
          ticks: {padding: -15, size: -5},
        }}
      />
    )),
    data.map((chart, i) => (
      <VictoryCandlestick
        key={chart.label}
        data={chart.values}
        x={(datum) => dayjs(parseInt(datum.x, 10)).toDate()}
        open={(datum) =>
          ((datum as any).open - minima[i]) / (maxima[i] - minima[i])
        }
        close={(datum) =>
          ((datum as any).close - minima[i]) / (maxima[i] - minima[i])
        }
        high={(datum) =>
          ((datum as any).high - minima[i]) / (maxima[i] - minima[i])
        }
        low={(datum) =>
          ((datum as any).low - minima[i]) / (maxima[i] - minima[i])
        }
        candleColors={{positive: 'green', negative: 'red'}}
      />
    )),
  ];
};

export default CandleStickChart;
