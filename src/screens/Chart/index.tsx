import React, {useEffect, useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Entypo from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import Chart from '../../components/Chart';
import FullHeightView from '../../components/View/fullHeight';
import SafeAreaView from '../../components/View/safeAreaView';
import {
  Candles,
  Exchanges,
  Interval,
  QueryCandleOhlcArgs,
  QueryTicker24hArgs,
  Ticker24h,
} from '../../generated/graphql';
import ActivityIndicator from '../../components/ActivityIndicator';
import Price from '../../components/Price';
import {StackParamList} from '../../routes/interfaces';
import RefreshButton from '../../components/RefreshButton';
import OpenHighLowClose from '../../components/OpenHighLowClose';
import {openBottomSheet} from '../../actions/bottomSheetActions';
import ChartOptions from '../../components/ChartOptions';
import {useTypedSelector} from '../../hooks/useTypedSelector';

Entypo.loadFont();

type ChartScreenNavigationProp = StackNavigationProp<StackParamList, 'Chart'>;

type Props = {
  navigation: ChartScreenNavigationProp;
};

const CHART_CANDLES = gql`
  query getData($exchange: Exchanges!, $interval: Interval!, $symbol: String!) {
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
  const theme = useTheme();
  const dispatch = useDispatch();
  const {pollInterval} = useTypedSelector((state) => state.chart);

  const {data, refetch} = useQuery<
    {candleOHLC: Candles[]; ticker24h: Ticker24h},
    QueryCandleOhlcArgs | QueryTicker24hArgs
  >(CHART_CANDLES, {
    variables: {
      exchange: Exchanges.Binance,
      interval: Interval.M15,
      symbol: 'BTCUSDT',
    },
    pollInterval,
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

  const handleOption = () => {
    dispatch(
      openBottomSheet({
        children: <ChartOptions />,
      }),
    );
  };

  if (!data) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView edges={['bottom']}>
      <FullHeightView style={styles.container}>
        <View style={styles.pricing}>
          <OpenHighLowClose
            open={data.ticker24h.openPrice}
            high={data.ticker24h.highPrice}
            low={data.ticker24h.lowPrice}
          />
          <View style={styles.innerPricing}>
            <Price ticker24h={data.ticker24h} />
            <TouchableOpacity
              style={styles.touchableOptions}
              onPress={handleOption}>
              <Entypo name="cog" size={18} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        <Chart data={data} />
      </FullHeightView>
    </SafeAreaView>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  innerPricing: {
    flexDirection: 'row',
  },
  touchableOptions: {
    marginLeft: 15,
    marginRight: -25,
  },
});

export default ChartScreen;
