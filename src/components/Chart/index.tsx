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
  BarDataset,
  CandleStickDataset,
  CombinedData,
} from '../../generated/graphql';
import CandleStickChart from './CandleStickChart';
import {filterData, filterLinesData} from '../../utils/filterData';
import LineChart from './LineChart';
import BarChart from './BarChart';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface IProps {
  data: CombinedData;
}

const MAX_VALUES = 50;

const generateBarChart = (data: CombinedData) => {
  if (data.barData) {
    return BarChart({data: data.barData.dataSets});
  }
  return null;
};

const generateLineChart = ({
  data,
  maxima,
  minima,
}: {
  data: CombinedData;
  maxima: number;
  minima: number;
}) => {
  if (data.lineData) {
    return LineChart({data: data.lineData.dataSets, maxima, minima});
  }
  return null;
};

const Chart: React.FC<IProps> = ({data}) => {
  const theme = useTheme();

  const initialDate = useMemo(() => {
    return dayjs(
      parseInt(
        data.candleData.dataSets.values[
          data.candleData.dataSets.values.length - MAX_VALUES
        ].x,
        10,
      ),
    ).toDate();
  }, [data]);

  const lastDate = useMemo(() => {
    return dayjs(
      parseInt(
        data.candleData.dataSets.values[
          data.candleData.dataSets.values.length - 1
        ].x,
        10,
      ),
    ).toDate();
  }, [data]);

  const [dimensions, setDimensions] = useState({width: 1, height: 1});
  const [xDomain, setXDomain] = useState([initialDate, lastDate]);

  const filteredData = useMemo(() => {
    let filteredBarDataSets;
    let filteredLineDataSets;
    const filteredCandleDataSets = filterData({
      dataSet: data.candleData.dataSets,
      initialDate: dayjs(xDomain[0]),
      finalDate: dayjs(xDomain[1]),
    });
    if (data.barData) {
      filteredBarDataSets = filterData({
        dataSet: data.barData.dataSets,
        initialDate: dayjs(xDomain[0]),
        finalDate: dayjs(xDomain[1]),
      });
    }
    if (data.lineData) {
      filteredLineDataSets = filterLinesData({
        dataSet: data.lineData.dataSets,
        initialDate: dayjs(xDomain[0]),
        finalDate: dayjs(xDomain[1]),
      });
    }

    return {
      candleData: {
        dataSets: filteredCandleDataSets as CandleStickDataset,
      },
      ...(data.barData && {
        barData: {
          dataSets: filteredBarDataSets as BarDataset,
        },
      }),
      ...(data.lineData && {
        lineData: {
          dataSets: filteredLineDataSets,
        },
      }),
    };
  }, [data, xDomain]);

  const entireDomain = useMemo(() => {
    return {
      y: [0, 1] as [number, number],
      x: [
        dayjs(parseInt(data.candleData.dataSets.values[0].x, 10)).toDate(),
        dayjs(
          parseInt(
            data.candleData.dataSets.values[
              data.candleData.dataSets.values.length - 1
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
            data.candleData.dataSets.values[
              data.candleData.dataSets.values.length - MAX_VALUES
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

  const maxima = useMemo(() => {
    const lineMaxima = filteredData.lineData?.dataSets
      ? Math.max(
          ...filteredData?.lineData?.dataSets?.map((dataSet) =>
            Math.max(...dataSet.values.map((value) => value.y)),
          ),
        )
      : undefined;

    const candleMaxima = Math.max(
      ...filteredData.candleData.dataSets.values.map((d) => d.high),
    );

    return lineMaxima ? Math.max(candleMaxima, lineMaxima) : candleMaxima;
  }, [filteredData.candleData.dataSets, filteredData.lineData]);

  const minima = useMemo(() => {
    const lineMinima = filteredData.lineData?.dataSets
      ? Math.min(
          ...filteredData?.lineData?.dataSets?.map((dataSet) =>
            Math.min(...dataSet.values.map((value) => value.y)),
          ),
        )
      : undefined;

    const candleMinima = Math.min(
      ...filteredData.candleData.dataSets.values.map((d) => d.low),
    );

    return lineMinima ? Math.min(candleMinima, lineMinima) : candleMinima;
  }, [filteredData.candleData.dataSets, filteredData.lineData]);

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
        {generateLineChart({data, maxima, minima})}
        {generateBarChart(data)}
        {CandleStickChart({
          data: filteredData.candleData.dataSets,
          maxima,
          minima,
        })}
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
