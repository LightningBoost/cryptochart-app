import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  AxisDependency,
  CombinedChart as CChart,
  CombinedData,
  xAxis as xAxisInterface,
} from 'react-native-charts-wrapper';
import dayjs from 'dayjs';
import {processColor} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ICombinedChartProps} from './interfaces';

const CombinedChart: React.FC<ICombinedChartProps> = ({data}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  console.log(useTheme());

  const chartData: CombinedData = {
    candleData: data.candleStick
      ? {
          dataSets: [
            {
              label: 'BTCUSD',
              values: data.candleStick?.map((d) => ({
                shadowH: parseFloat(d.high),
                shadowL: parseFloat(d.low),
                open: parseFloat(d.open),
                close: parseFloat(d.close),
                marker: `${dayjs(d.timestamp).format('lll')}\n\n${t(
                  'Open:',
                )} ${parseFloat(d.open).toFixed(2)}\n${t('Low:')} ${parseFloat(
                  d.low,
                ).toFixed(2)}\n${t('High:')} ${parseFloat(d.high).toFixed(
                  2,
                )}\n${t('Close:')} ${parseFloat(d.close).toFixed(2)}\n${t(
                  'Volume:',
                )} ${parseInt(d.volume, 10)} BTC`,
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
  };

  const zoom = data.candleStick
    ? {
        scaleX: 10,
        scaleY: 1,
        xValue: data.candleStick.length,
        yValue: 0,
        axisDependency: 'LEFT' as AxisDependency,
      }
    : undefined;

  const xAxis: xAxisInterface = {
    position: 'BOTTOM',
    valueFormatter: data.candleStick
      ? data.candleStick?.map((obj) =>
          dayjs(obj.timestamp).format(
            dayjs(obj.timestamp).hour() === 0 ? 'DD' : 'LT',
          ),
        )
      : undefined,
    labelCount: 5,
    axisMaximum: data.candleStick ? data.candleStick.length + 1 : undefined,
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
        },
        left: {
          enabled: true,
          position: 'INSIDE_CHART',
          textColor: processColor(theme.colors.text),
        },
      }}
      autoScaleMinMaxEnabled
      pinchZoom
      drawBorders
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
