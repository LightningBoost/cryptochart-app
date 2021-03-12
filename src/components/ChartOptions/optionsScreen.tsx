import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {Paragraph} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import FullWidthView from '../View/fullWidth';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import Picker from '../Picker';
import {PollInterval} from '../../reducers/chart/types';
import {updateChartOptions} from '../../actions/chartActions';

MaterialIcons.loadFont();

const OptionsScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {pollInterval} = useTypedSelector((state) => state.chart);
  const dispatch = useDispatch();
  const pollIntervalOptions = [
    {
      label: t('1 minute'),
      value: PollInterval.M1,
    },
    {
      label: t('5 minutes'),
      value: PollInterval.M5,
    },
    {
      label: t('10 minutes'),
      value: PollInterval.M10,
    },
    {
      label: t('15 minutes'),
      value: PollInterval.M15,
    },
    {
      label: t('30 minutes'),
      value: PollInterval.M30,
    },
    {
      label: t('1 hour'),
      value: PollInterval.H1,
    },
    {
      label: t('6 hours'),
      value: PollInterval.H6,
    },
    {
      label: t('12 hours'),
      value: PollInterval.H12,
    },
  ];

  return (
    <FullWidthView>
      <View style={styles.rows}>
        <Picker
          label={t('Poll interval')}
          items={pollIntervalOptions}
          value={pollInterval}
          onValueChange={(value) => {
            dispatch(updateChartOptions({pollInterval: value as PollInterval}));
          }}
        />
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
