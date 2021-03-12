import React from 'react';
import {
  AxisDependency,
  CandleStickValue,
  CombinedChart as CChart,
  CombinedData,
  xAxis as xAxisInterface,
} from 'react-native-charts-wrapper';
import dayjs from 'dayjs';
import {processColor, Platform, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

interface IValuesWithTimestamp extends CandleStickValue {
  timestamp?: number;
}

interface IProps {
  data: CombinedData;
}

const CombinedChart: React.FC<IProps> = ({data}) => {
  const theme = useTheme();

  const zoom = data.candleData?.dataSets
    ? {
        scaleX: 10,
        scaleY: 1,
        xValue: data.candleData.dataSets[0].values
          ? data.candleData.dataSets[0].values.length
          : 0,
        yValue: 0,
        axisDependency: 'LEFT' as AxisDependency,
      }
    : undefined;

  const xAxis: xAxisInterface = {
    position: 'BOTTOM',
    valueFormatter: data.candleData?.dataSets
      ? data.candleData.dataSets[0].values?.map((obj: IValuesWithTimestamp) =>
          dayjs(obj.timestamp).format(
            dayjs(obj.timestamp).hour() === 0 ? 'DD' : 'LT',
          ),
        )
      : undefined,
    labelCount: 5,
    axisMaximum:
      data.candleData?.dataSets && data.candleData.dataSets[0].values
        ? data.candleData.dataSets[0].values.length + 1
        : undefined,
    textColor: processColor(theme.colors.text),
    drawGridLines: false,
  };

  return (
    <CChart
      style={styles.chartContainer}
      data={data}
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

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
  },
});

export default CombinedChart;
