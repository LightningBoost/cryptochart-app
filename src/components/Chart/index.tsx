import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
} from 'victory-native';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {useTheme} from 'react-native-paper';
import {
  BarDatasets,
  CandleStickDatasets,
  CombinedData,
  LineDatasets,
} from '../../generated/graphql';
import CandleStickChart from './CandleStickChart';
import filterData from '../../utils/filterData';
import LineChart from './LineChart';
import BarChart from './BarChart';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface IProps {
  data: CombinedData;
}

const MAX_VALUES = 50;

const Chart: React.FC<IProps> = ({data}) => {
  const theme = useTheme();

  const initialDate = useMemo(() => {
    return dayjs(
      parseInt(
        data.candleData.dataSets[0].values[
          data.candleData.dataSets[0].values.length - MAX_VALUES
        ].x,
        10,
      ),
    ).toDate();
  }, [data]);

  const lastDate = useMemo(() => {
    return dayjs(
      parseInt(
        data.candleData.dataSets[0].values[
          data.candleData.dataSets[0].values.length - 1
        ].x,
        10,
      ),
    ).toDate();
  }, [data]);

  const [dimensions, setDimensions] = useState({width: 1, height: 1});
  const [xDomain, setXDomain] = useState([initialDate, lastDate]);

  const filteredData = useMemo(() => {
    const filteredCandleDataSets = filterData({
      dataSet: data.candleData.dataSets,
      initialDate: dayjs(xDomain[0]),
      finalDate: dayjs(xDomain[1]),
    });
    const filteredBarDataSets = filterData({
      dataSet: data.barData.dataSets,
      initialDate: dayjs(xDomain[0]),
      finalDate: dayjs(xDomain[1]),
    });
    const filteredLineDataSets = filterData({
      dataSet: data.lineData.dataSets,
      initialDate: dayjs(xDomain[0]),
      finalDate: dayjs(xDomain[1]),
    });

    return {
      candleData: {
        dataSets: filteredCandleDataSets as CandleStickDatasets[],
      },
      barData: {
        dataSets: filteredBarDataSets as BarDatasets[],
      },
      lineData: {
        dataSets: filteredLineDataSets as LineDatasets[],
      },
    };
  }, [data, xDomain]);

  const entireDomain = useMemo(() => {
    return {
      y: [0, 1] as [number, number],
      x: [
        dayjs(parseInt(data.candleData.dataSets[0].values[0].x, 10)).toDate(),
        dayjs(
          parseInt(
            data.candleData.dataSets[0].values[
              data.candleData.dataSets[0].values.length - 1
            ].x,
            10,
          ),
        ).toDate(),
      ] as [Date, Date],
    };
  }, [data]);

  const initialZoom = useMemo(() => {
    return {
      x: [
        dayjs(
          parseInt(
            data.candleData.dataSets[0].values[
              data.candleData.dataSets[0].values.length - MAX_VALUES
            ].x,
            10,
          ),
        ).toDate(),
        dayjs(lastDate).add(1, 'minute').toDate(),
      ] as [Date, Date],
    };
  }, [data, lastDate]);

  const formatXTick = useCallback((value: string) => {
    return dayjs(value).format(dayjs(value).hour() === 0 ? 'DD' : 'LT');
  }, []);

  return (
    <View
      style={styles.container}
      onLayout={(event) =>
        setDimensions({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        })
      }>
      <VictoryChart
        theme={VictoryTheme.material}
        width={dimensions.width + 25}
        height={dimensions.height}
        domain={entireDomain}
        domainPadding={{x: [0, 1]}}
        padding={{top: 50, right: 30, bottom: 50, left: 5}}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            zoomDomain={initialZoom}
            onZoomDomainChange={(domain) => {
              setXDomain([
                dayjs(domain.x[0]).toDate(),
                dayjs(domain.x[1]).toDate(),
              ]);
            }}
          />
        }>
        <VictoryAxis
          gridComponent={<></>}
          tickFormat={formatXTick}
          style={{tickLabels: {fill: theme.colors.text}}}
        />
        {CandleStickChart({data: filteredData.candleData.dataSets})}
        {LineChart({data: filteredData.lineData.dataSets})}
        {BarChart({data: filteredData.barData.dataSets})}
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chart;
