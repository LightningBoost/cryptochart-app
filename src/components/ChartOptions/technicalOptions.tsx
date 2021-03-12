import React from 'react';
import {Paragraph} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FullWidthView from '../View/fullWidth';

MaterialIcons.loadFont();

const TechnicalOptions: React.FC = () => {
  const {t} = useTranslation();

  return (
    <FullWidthView>
      <View style={styles.rows}>
        <Paragraph>{t('Exponential moving average (10d)')}</Paragraph>
        <TouchableOpacity onPress={() => console.log('pressed')}>
          <MaterialIcons name="add-circle" size={28} color="green" />
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
