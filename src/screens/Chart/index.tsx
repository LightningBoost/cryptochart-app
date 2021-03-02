import React from 'react';
import {gql, useQuery} from '@apollo/client';
import Chart from '../../components/Chart';
import FullHeightView from '../../components/View/fullHeight';
import SafeAreaView from '../../components/View/safeAreaView';
import {Candles, Exchanges, QueryCandleOhlcArgs} from '../../generated/graphql';
import {ChartContext} from './ChartContext';
import ActivityIndicator from '../../components/ActivityIndicator';

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

const ChartScreen: React.FC = () => {
  const {loading, error, data, refetch} = useQuery<
    {candleOHLC: Candles[]},
    QueryCandleOhlcArgs
  >(CHART_CANDLES, {
    variables: {exchange: Exchanges.Binance, interval: 900},
  });

  if (!data) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ChartContext.Provider
      value={{data: data.candleOHLC, fetchData: refetch, loading, error}}>
      <SafeAreaView edges={['bottom']}>
        <FullHeightView>
          <Chart />
        </FullHeightView>
      </SafeAreaView>
    </ChartContext.Provider>
  );
};

export default ChartScreen;
