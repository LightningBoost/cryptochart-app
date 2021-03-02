import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {StyleSheet, View} from 'react-native';
import Chart from '../../components/Chart';
import FullHeightView from '../../components/View/fullHeight';
import SafeAreaView from '../../components/View/safeAreaView';
import {
  Candles,
  Exchanges,
  QueryCandleOhlcArgs,
  QueryTicker24hArgs,
  Ticker24h,
} from '../../generated/graphql';
import {ChartContext} from './ChartContext';
import ActivityIndicator from '../../components/ActivityIndicator';
import Price from '../../components/Price';

const CHART_CANDLES = gql`
  query getData($exchange: Exchanges!, $interval: Int!, $symbol: String!) {
    candleOHLC(exchange: $exchange, interval: $interval) {
      timestamp
      open
      high
      low
      close
      volume
    }
    ticker24h(exchange: $exchange, symbol: $symbol) {
      openTime
      closeTime
      openPrice
      lastPrice
      highPrice
      lowPrice
      volume
      priceChange
      priceChangePercent
    }
  }
`;

const ChartScreen: React.FC = () => {
  const {loading, error, data, refetch} = useQuery<
    {candleOHLC: Candles[]; ticker24h: Ticker24h},
    QueryCandleOhlcArgs | QueryTicker24hArgs
  >(CHART_CANDLES, {
    variables: {exchange: Exchanges.Binance, interval: 900, symbol: 'BTCUSDT'},
    pollInterval: 60000,
  });

  if (!data) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ChartContext.Provider value={{data, fetchData: refetch, loading, error}}>
      <SafeAreaView edges={['bottom']}>
        <FullHeightView style={styles.container}>
          <View style={styles.pricing}>
            <Price />
          </View>
          <Chart />
        </FullHeightView>
      </SafeAreaView>
    </ChartContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 5,
  },
  pricing: {
    alignSelf: 'flex-end',
    margin: 20,
  },
});

export default ChartScreen;
