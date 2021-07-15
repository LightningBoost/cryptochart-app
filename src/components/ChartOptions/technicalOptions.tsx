import React from 'react';
import {Paragraph} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import FullWidthView from '../View/fullWidth';
import {addChart, removeChart} from '../../actions/chartActions';
import {ChartQuery} from '../../generated/graphql';
import {useTypedSelector} from '../../hooks/useTypedSelector';

MaterialIcons.loadFont();

const TechnicalOptions: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {charts} = useTypedSelector((state) => state.chart);

  const handlePress = (chart: ChartQuery): void => {
    if (charts.includes(chart)) {
      dispatch(removeChart(chart));
      return;
    }
    dispatch(addChart(chart));
  };

  return (
    <FullWidthView>
      <View style={styles.rows}>
        <Paragraph>{t('Exponential moving average (10d)')}</Paragraph>
        <TouchableOpacity onPress={() => handlePress(ChartQuery.Ema)}>
          <MaterialIcons
            name={
              charts.includes(ChartQuery.Ema) ? 'remove-circle' : 'add-circle'
            }
            size={28}
            color={charts.includes(ChartQuery.Ema) ? 'red' : 'green'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rows}>
        <Paragraph>{t('Bollinger Bands')}</Paragraph>
        <TouchableOpacity
          onPress={() => handlePress(ChartQuery.Bollingerbands)}>
          <MaterialIcons
            name={
              charts.includes(ChartQuery.Bollingerbands)
                ? 'remove-circle'
                : 'add-circle'
            }
            size={28}
            color={charts.includes(ChartQuery.Bollingerbands) ? 'red' : 'green'}
          />
        </TouchableOpacity>
      </View>
    </FullWidthView>
  );
};

const styles = StyleSheet.create({
  rows: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default TechnicalOptions;
