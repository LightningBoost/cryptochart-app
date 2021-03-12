import {
  BarValue,
  CandleStickDatasetConfig,
  CandleStickValue,
  CombinedData as CDChart,
  LineDatasetConfig,
  LineValue,
} from 'react-native-charts-wrapper';
import {processColor} from 'react-native';
import {CombinedData} from '../generated/graphql';
import generateMarker from './candleChartConversion';

const chartConversion = (data: CombinedData): CDChart => {
  return {
    lineData: {
      dataSets: data.lineData?.dataSets.map((d) => ({
        values: d.values.map((v) => ({
          x: v.x || undefined,
          y: v.y || undefined,
          marker: v.marker || undefined,
        })) as Array<number | LineValue>,
        config: {
          ...d.config,
          drawCircles: false,
          color: processColor(d.config.color),
        } as LineDatasetConfig,
      })),
    },
    barData: {
      dataSets: data.barData?.dataSets.map((d) => ({
        values: d.values.map((v) => ({
          x: v.x || undefined,
          y: v.y || undefined,
          marker: v.marker || undefined,
        })) as Array<BarValue | number | number[]>,
      })),
    },
    candleData: {
      dataSets: data.candleData?.dataSets.map((d) => ({
        values: d.values.map((v) => ({
          x: v.x || undefined,
          open: v.open,
          shadowH: v.shadowH,
          shadowL: v.shadowL,
          close: v.close,
          marker: generateMarker(v) || undefined,
        })) as CandleStickValue[],
        label: d.label,
        config: {
          ...d.config,
          increasingColor: processColor(d.config.increasingColor || 'green'),
          decreasingColor: processColor(d.config.decreasingColor || 'red'),
          shadowColor: processColor('black'),
        } as CandleStickDatasetConfig,
      })),
    },
  };
};

export default chartConversion;
