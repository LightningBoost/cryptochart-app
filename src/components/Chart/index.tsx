import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';

import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
} from 'victory-native';

import intervalEnum from '../../domain/enum/intervalEnum';
import {CandleStickDataset, CombinedData} from '../../generated/graphql';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {
  filterBarData,
  filterData,
  filterLinesData,
} from '../../utils/filterData';
import CandleStickChart from './CandleStickChart';
import EMAChart from './EMAChart';
import VolumeChart from './VolumeChart';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface IProps {
  data: CombinedData;
}

const MAX_VALUES = 50;

const generateCandleStickChart = ({
  data,
  maxima,
  minima,
}: {
  data: CandleStickDataset;
  maxima: number;
  minima: number;
}) => {
  return CandleStickChart({data, maxima, minima});
};

const Chart: React.FC<IProps> = ({data}) => {
  const theme = useTheme();
  const {interval} = useTypedSelector((state) => state.chart);

  const initialDate = useMemo(() => {
    return dayjs(
      parseInt(
        data.candleData.values[data.candleData.values.length - MAX_VALUES].x,
        10,
      ),
    ).toDate();
  }, [data]);

  const lastDate = useMemo(() => {
    return dayjs(
      parseInt(data.candleData.values[data.candleData.values.length - 1].x, 10),
    ).toDate();
  }, [data]);

  const [dimensions, setDimensions] = useState({width: 1, height: 1});
  const [xDomain, setXDomain] = useState([initialDate, lastDate]);

  const filteredData = useMemo(() => {
    const filteredCandleDataSets = filterData({
      dataSet: data.candleData,
      initialDate: dayjs(xDomain[0]),
      finalDate: dayjs(xDomain[1]),
    });

    return {
      candleData: {
        dataSets: filteredCandleDataSets as CandleStickDataset,
      },
    };
  }, [data.candleData, xDomain]);

  const entireDomain = useMemo(() => {
    return {
      y: [0, 1] as [number, number],
      x: [
        dayjs(parseInt(data.candleData.values[0].x, 10)).toDate(),
        dayjs(
          parseInt(
            data.candleData.values[data.candleData.values.length - 1].x,
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
            data.candleData.values[data.candleData.values.length - MAX_VALUES]
              .x,
            10,
          ),
        ).toDate(),
        dayjs(lastDate)
          .add(intervalEnum(interval).time, intervalEnum(interval).period)
          .toDate(),
      ] as [Date, Date],
    };
  }, [data, lastDate, interval]);

  const formatXTick = useCallback((value: string) => {
    return dayjs(value).format(dayjs(value).hour() === 0 ? 'DD' : 'LT');
  }, []);

  const maxima = useMemo(() => {
    return Math.max(
      ...filteredData.candleData.dataSets.values.map((d) => d.high),
    );
  }, [filteredData.candleData.dataSets]);

  const minima = useMemo(() => {
    return Math.min(
      ...filteredData.candleData.dataSets.values.map((d) => d.low),
    );
  }, [filteredData.candleData.dataSets]);

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
        {generateCandleStickChart({
          data: filteredData.candleData.dataSets,
          maxima,
          minima,
        })}
        {data.volume &&
          VolumeChart({
            data: filterBarData({
              dataSet: data.volume,
              initialDate: dayjs(xDomain[0]),
              finalDate: dayjs(xDomain[1]),
            }),
          })}
        {data.ema &&
          EMAChart({
            data: filterLinesData({
              dataSet: data.ema.dataSets,
              initialDate: dayjs(xDomain[0]),
              finalDate: dayjs(xDomain[1]),
            }),
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
