import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {
  AxisDependency,
  CombinedChart as CChart,
  CombinedData,
  xAxis as xAxisInterface,
} from 'react-native-charts-wrapper';
import dayjs from 'dayjs';
import {processColor, Platform} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Candles} from '../../generated/graphql';
import {ChartContext} from './chartContext';

const CombinedChart: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {data} = useContext(ChartContext);

  const candleOHLC = data?.candleOHLC;

  const generateMarker = (d: Candles) =>
    `${dayjs(d.timestamp).format('lll')}\n\n${t('Open:')} ${parseFloat(
      d.open,
    ).toFixed(2)}\n${t('Low:')} ${parseFloat(d.low).toFixed(2)}\n${t(
      'High:',
    )} ${parseFloat(d.high).toFixed(2)}\n${t('Close:')} ${parseFloat(
      d.close,
    ).toFixed(2)}\n${t('Volume:')} ${parseInt(d.volume, 10)} BTC`;

  const chartData: CombinedData = {
    candleData: candleOHLC
      ? {
          dataSets: [
            {
              label: 'BTCUSD',
              values: candleOHLC.map((d) => ({
                shadowH: parseFloat(d.high),
                shadowL: parseFloat(d.low),
                open: parseFloat(d.open),
                close: parseFloat(d.close),
                marker: generateMarker(d),
              })),
              config: {
                drawValues: false,
                increasingColor: processColor('green'),
                increasingPaintStyle: 'FILL',
                decreasingColor: processColor('red'),
                shadowColorSameAsCandle: true,
                shadowColor: processColor('black'),
              },
            },
          ],
        }
      : undefined,
    barData: candleOHLC
      ? {
          dataSets: [
            {
              values: candleOHLC.map((d) => ({
                y: parseFloat(d.volume),
                marker: generateMarker(d),
              })),
              label: t('Volume'),
              config: {
                axisDependency: 'RIGHT',
                drawValues: false,
                color: processColor(theme.colors.disabled),
              },
            },
          ],
        }
      : undefined,
  };

  const zoom = candleOHLC
    ? {
        scaleX: 10,
        scaleY: 1,
        xValue: candleOHLC.length,
        yValue: 0,
        axisDependency: 'LEFT' as AxisDependency,
      }
    : undefined;

  const xAxis: xAxisInterface = {
    position: 'BOTTOM',
    valueFormatter: candleOHLC
      ? candleOHLC?.map((obj) =>
          dayjs(obj.timestamp).format(
            dayjs(obj.timestamp).hour() === 0 ? 'DD' : 'LT',
          ),
        )
      : undefined,
    labelCount: 5,
    axisMaximum: candleOHLC ? candleOHLC.length + 1 : undefined,
    textColor: processColor(theme.colors.text),
    drawGridLines: false,
  };

  return (
    <CChart
      style={{flex: 1}}
      data={chartData}
      xAxis={xAxis}
      yAxis={{
        right: {
          enabled: false,
          spaceBottom: 0,
          spaceTop: Platform.OS === 'ios' ? 15 : 100,
        },
        left: {
          enabled: true,
          position: 'INSIDE_CHART',
          textColor: processColor(theme.colors.text),
          gridDashedLine: {
            lineLength: 5,
            spaceLength: 5,
          },
        },
      }}
      autoScaleMinMaxEnabled
      pinchZoom
      chartDescription={{text: ''}}
      marker={{
        enabled: true,
        markerColor: processColor('#2c3e50'),
        textColor: processColor('white'),
      }}
      legend={{enabled: false}}
      zoom={zoom}
    />
  );
};

export default CombinedChart;
