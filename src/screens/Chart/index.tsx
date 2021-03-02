import React, {useEffect} from 'react';
import {gql, useQuery} from '@apollo/client';
import {StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
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
import {StackParamList} from '../../routes/chart';
import RefreshButton from '../../components/RefreshButton';

type ChartScreenNavigationProp = StackNavigationProp<StackParamList, 'Chart'>;

type Props = {
  navigation: ChartScreenNavigationProp;
};

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

const ChartScreen: React.FC<Props> = ({navigation}) => {
  const {loading, error, data, refetch} = useQuery<
    {candleOHLC: Candles[]; ticker24h: Ticker24h},
    QueryCandleOhlcArgs | QueryTicker24hArgs
  >(CHART_CANDLES, {
    variables: {exchange: Exchanges.Binance, interval: 900, symbol: 'BTCUSDT'},
    pollInterval: 60000,
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButton}>
          <RefreshButton onPress={() => refetch()} />
        </View>
      ),
    });
    // eslint-disable-next-line
  }, []);

  if (!data) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ChartContext.Provider value={{data, fetchData: refetch, loading, error}}>
      <SafeAreaView edges={['bottom']}>
        <FullHeightView style={styles.container}>
          <View style={styles.pricing}>
            <Price ticker24h={data.ticker24h} />
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
  headerButton: {
    padding: 10,
  },
  pricing: {
    alignSelf: 'flex-end',
    margin: 20,
  },
});

export default ChartScreen;
