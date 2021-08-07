import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';

import {NetworkStatus, useQuery} from '@apollo/client';
import {StackNavigationProp} from '@react-navigation/stack';

import {openBottomSheet} from '../../actions/bottomSheetActions';
import ActivityIndicator from '../../components/ActivityIndicator';
import Chart from '../../components/Chart';
import ChartOptions from '../../components/ChartOptions';
import OpenHighLowClose from '../../components/OpenHighLowClose';
import Price from '../../components/Price';
import RefreshButton from '../../components/RefreshButton';
import FullHeightView from '../../components/View/fullHeight';
import SafeAreaView from '../../components/View/safeAreaView';
import {
  CombinedData,
  Exchanges,
  QueryChartArgs,
  QueryTicker24hArgs,
  Ticker24h,
} from '../../generated/graphql';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import chartQueries from '../../queries/chartQueries';
import {ChartStackParamList} from '../../routes/interfaces';

Entypo.loadFont();

type ChartScreenNavigationProp = StackNavigationProp<
  ChartStackParamList,
  'Chart'
>;

type Props = {
  navigation: ChartScreenNavigationProp;
};

const ChartScreen: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const chart = useTypedSelector((state) => state.chart);
  const {pollInterval, interval} = useTypedSelector((state) => state.chart);

  const {data, refetch, networkStatus} = useQuery<
    {chart: CombinedData; ticker24h: Ticker24h},
    QueryChartArgs & QueryTicker24hArgs
  >(chartQueries, {
    variables: {
      exchange: Exchanges.Binance,
      interval,
      symbol: 'BTCUSDT',
      queryData: chart.charts,
      ema: [5, 10, 15, 200],
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
      title: data && data.chart.candleData.label,
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
        <Chart data={data.chart} />
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
