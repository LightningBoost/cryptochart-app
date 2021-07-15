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
          marker: v.marker || '',
        })) as Array<number | LineValue>,
        config: {
          color: processColor(d.config?.color || 'blue'),
          drawValues: false,
          drawCircles: false,
          mode: 'CUBIC_BEZIER',
          lineWidth: 2,
        } as LineDatasetConfig,
        label: d.label || '',
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
