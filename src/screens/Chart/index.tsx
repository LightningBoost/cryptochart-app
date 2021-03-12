import React, {useEffect} from 'react';
import {gql, NetworkStatus, useQuery} from '@apollo/client';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Entypo from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import Chart from '../../components/Chart';
import FullHeightView from '../../components/View/fullHeight';
import SafeAreaView from '../../components/View/safeAreaView';
import {
  ChartQuery,
  CombinedData,
  Exchanges,
  Interval,
  QueryChartArgs,
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
import chartConversion from '../../utils/chartConversion';

Entypo.loadFont();

type ChartScreenNavigationProp = StackNavigationProp<StackParamList, 'Chart'>;

type Props = {
  navigation: ChartScreenNavigationProp;
};

const CHART_CANDLES = gql`
  query getData(
    $exchange: Exchanges!
    $interval: Interval!
    $symbol: String!
    $queryData: [ChartQuery!]!
  ) {
    chart(
      exchange: $exchange
      interval: $interval
      symbol: $symbol
      queryData: $queryData
    ) {
      candleData {
        dataSets {
          values {
            timestamp
            shadowH
            shadowL
            open
            close
            marker
            volume
          }
          label
          config {
            drawValues
            shadowWidth
            shadowColor
            shadowColorSameAsCandle
            decreasingColor
            increasingColor
            decreasingPaintStyle
            increasingPaintStyle
            axisDependency
          }
        }
      }
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

  const {data, refetch, networkStatus} = useQuery<
    {chart: CombinedData; ticker24h: Ticker24h},
    QueryChartArgs & QueryTicker24hArgs
  >(CHART_CANDLES, {
    variables: {
      exchange: Exchanges.Binance,
      interval: Interval.M15,
      symbol: 'BTCUSDT',
      queryData: [ChartQuery.Candlestick],
    },
    pollInterval,
    notifyOnNetworkStatusChange: true,
  });

  // update refresh button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButton}>
          <RefreshButton
            onPress={() => refetch()}
            spin={networkStatus === NetworkStatus.refetch}
          />
        </View>
      ),
      title: data && data.chart.candleData?.dataSets[0].label,
    });
    // eslint-disable-next-line
  }, [networkStatus]);

  // open bottomsheet with options
  const handleOption = () => {
    dispatch(
      openBottomSheet({
        children: <ChartOptions />,
        snapTo: 1,
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
        <Chart data={chartConversion(data.chart)} />
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
