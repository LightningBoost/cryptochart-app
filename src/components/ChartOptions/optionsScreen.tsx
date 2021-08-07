import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Paragraph, useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';

import FullWidthView from '../View/fullWidth';
import CandleInterval from './CandleInterval';
import RefreshInterval from './RefreshInterval';
import Volume from './Volume';

MaterialIcons.loadFont();

const OptionsScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <FullWidthView>
      <View style={styles.rows}>
        <RefreshInterval />
      </View>
      <View style={styles.rows}>
        <CandleInterval />
      </View>
      <View style={styles.rows}>
        <Volume />
      </View>
      <View style={styles.rows}>
        <Paragraph style={styles.paragraph}>{t('Indicators')}</Paragraph>
        <TouchableOpacity
          onPress={() => navigation.navigate('TechnicalOptions')}>
          <MaterialIcons name="edit" size={28} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    </FullWidthView>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    fontWeight: 'bold',
  },
  rows: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default OptionsScreen;
