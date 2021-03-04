import React from 'react';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import FullWidthView from '../View/fullWidth';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import Picker from '../Picker';
import {PollInterval} from '../../reducers/chart/types';
import {updateChartOptions} from '../../actions/chartActions';

const ChartOptions: React.FC = () => {
  const {t} = useTranslation();
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
      <Picker
        items={pollIntervalOptions}
        value={pollInterval}
        onValueChange={(value) => {
          dispatch(updateChartOptions({pollInterval: value as PollInterval}));
        }}
      />
    </FullWidthView>
  );
};

export default ChartOptions;
