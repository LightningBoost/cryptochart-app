import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {Paragraph} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import FullWidthView from '../View/fullWidth';
import RefreshInterval from './RefreshInterval';
import CandleInterval from './CandleInterval';
import Volume from './Volume';

MaterialIcons.loadFont();

const OptionsScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

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
        <Paragraph style={styles.paragraph}>
          {t('Add technical analysis')}
        </Paragraph>
        <TouchableOpacity
          onPress={() => navigation.navigate('TechnicalOptions')}>
          <MaterialIcons name="add-circle" size={28} color="green" />
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
