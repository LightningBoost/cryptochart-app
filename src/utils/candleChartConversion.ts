import {processColor} from 'react-native';
import {CandleStickDataset} from 'react-native-charts-wrapper';
import dayjs from 'dayjs';
import {Candles} from '../generated/graphql';

const generateMarker = (d: Candles) =>
  `${dayjs(d.timestamp).format('lll')}\n\n${'Open:'} ${parseFloat(
    d.open,
  ).toFixed(2)}\n${'Low:'} ${parseFloat(d.low).toFixed(
    2,
  )}\n${'High:'} ${parseFloat(d.high).toFixed(2)}\n${'Close:'} ${parseFloat(
    d.close,
  ).toFixed(2)}\n${'Volume:'} ${parseInt(d.volume, 10)} BTC`;

const candleChartConversion = (
  data: Candles[],
  label: string,
): CandleStickDataset => {
  return {
    values: data.map((d) => ({
      timestamp: d.timestamp,
      shadowH: parseFloat(d.high),
      shadowL: parseFloat(d.low),
      open: parseFloat(d.open),
      close: parseFloat(d.close),
      marker: generateMarker(d),
    })),
    label,
    config: {
      drawValues: false,
      increasingColor: processColor('green'),
      increasingPaintStyle: 'FILL',
      decreasingColor: processColor('red'),
      shadowColorSameAsCandle: true,
      shadowColor: processColor('black'),
    },
  };
};

export default candleChartConversion;
