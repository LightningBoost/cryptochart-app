import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

import Currency from '../../utils/currencyjs';

interface Props {
  open: string;
  high: string;
  low: string;
}

const OpenHighLowClose: React.FC<Props> = ({open, high, low}) => {
  const {t} = useTranslation();

  return (
    <View>
      <View style={styles.innerView}>
        <Text>{t('Open:')} </Text>
        <Text style={styles.values}>{Currency(open).format()}</Text>
      </View>
      <View style={styles.innerView}>
        <Text>{t('High:')} </Text>
        <Text style={[styles.values, {color: 'green'}]}>
          {Currency(high).format()}
        </Text>
      </View>
      <View style={styles.innerView}>
        <Text>{t('Low:')} </Text>
        <Text style={[styles.values, {color: 'red'}]}>
          {Currency(low).format()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  values: {
    textAlign: 'right',
  },
});

export default OpenHighLowClose;
