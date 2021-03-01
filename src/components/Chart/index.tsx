import React from 'react';
import {processColor, StyleSheet, View} from 'react-native';
import {CandleStickChart} from 'react-native-charts-wrapper';
import {gql, useQuery} from '@apollo/client';
import {useTheme} from 'react-native-paper';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';
import {Candles, Exchanges, QueryCandleOhlcArgs} from '../../generated/graphql';
import CombinedChart from './combinedChart';

const CHART_CANDLES = gql`
  query getOHLC($exchange: Exchanges!, $interval: Int!) {
    candleOHLC(exchange: $exchange, interval: $interval) {
      timestamp
      open
      high
      low
      close
      volume
    }
  }
`;

const Chart: React.FC = () => {
  const {t} = useTranslation();
  const {loading, error, data} = useQuery<
    {candleOHLC: Candles[]},
    QueryCandleOhlcArgs
  >(CHART_CANDLES, {
    variables: {exchange: Exchanges.Binance, interval: 900},
  });

  if (loading) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CombinedChart data={{candleStick: data.candleOHLC}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chart;
