import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Title, Subheading, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {ChartContext} from '../../screens/Chart/ChartContext';
import Currency from '../../utils/currencyjs';

const Price: React.FC = () => {
  const {t} = useTranslation();
  const {data} = useContext(ChartContext);

  if (!data) {
    return null;
  }

  const ticker24h = data?.ticker24h;

  if (!ticker24h) {
    return null;
  }

  const last = ticker24h.lastPrice;
  const open = ticker24h.openPrice;
  const {priceChangePercent} = ticker24h;

  return (
    <View style={styles.container}>
      <Text>{t('Last 24h change')}</Text>
      <View style={styles.innerItems}>
        <Title
          style={
            textStyles({open: parseFloat(open), close: parseFloat(last)}).text
          }>
          {Currency(last).format()}
        </Title>
        <Subheading
          style={
            textStyles({open: parseFloat(open), close: parseFloat(last)}).text
          }>
          {Currency(priceChangePercent, {symbol: ''}).format()}%
        </Subheading>
      </View>
    </View>
  );
};

const textStyles = ({open, close}: {open: number; close: number}) =>
  StyleSheet.create({
    text: {
      color: open > close ? 'red' : 'green',
    },
  });

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  innerItems: {
    alignItems: 'flex-end',
  },
});

export default Price;
