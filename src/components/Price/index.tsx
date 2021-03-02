import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Title, Subheading, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import Currency from '../../utils/currencyjs';
import {Ticker24h} from '../../generated/graphql';

interface Props {
  ticker24h: Ticker24h;
}

const Price: React.FC<Props> = ({ticker24h}) => {
  const {t} = useTranslation();

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
