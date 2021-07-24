import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {updateChartOptions} from '../../../actions/chartActions';
import {PollInterval} from '../../../reducers/chart/types';
import Picker from '../../Picker';
import {useTypedSelector} from '../../../hooks/useTypedSelector';

const RefreshInterval: React.FC = () => {
  const {t} = useTranslation();
  const {pollInterval} = useTypedSelector((state) => state.chart);
  const dispatch = useDispatch();

  const pollIntervalOptions = useMemo(
    () => [
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
    ],
    [t],
  );

  return (
    <Picker
      label={t('Refresh interval')}
      items={pollIntervalOptions}
      value={pollInterval}
      onValueChange={(value) => {
        dispatch(updateChartOptions({pollInterval: value as PollInterval}));
      }}
    />
  );
};

export default RefreshInterval;
