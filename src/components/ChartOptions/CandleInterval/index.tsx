import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import {updateChartOptions} from '../../../actions/chartActions';
import {Interval} from '../../../generated/graphql';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import Picker from '../../Picker';

const CandleInterval: React.FC = () => {
  const {t} = useTranslation();
  const {interval} = useTypedSelector((state) => state.chart);
  const dispatch = useDispatch();

  const intervalOptions = useMemo(
    () => [
      {
        label: t('1 minute'),
        value: Interval.M1,
      },
      {
        label: t('3 minutes'),
        value: Interval.M3,
      },
      {
        label: t('5 minutes'),
        value: Interval.M5,
      },
      {
        label: t('15 minutes'),
        value: Interval.M15,
      },
      {
        label: t('30 minutes'),
        value: Interval.M30,
      },
      {
        label: t('1 hour'),
        value: Interval.H1,
      },
      {
        label: t('2 hours'),
        value: Interval.H2,
      },
      {
        label: t('4 hours'),
        value: Interval.H4,
      },
      {
        label: t('6 hours'),
        value: Interval.H6,
      },
      {
        label: t('8 hours'),
        value: Interval.H8,
      },
      {
        label: t('12 hours'),
        value: Interval.H12,
      },
      {
        label: t('1 day'),
        value: Interval.D1,
      },
    ],
    [t],
  );

  return (
    <Picker
      label={t('Chart interval')}
      items={intervalOptions}
      value={interval}
      onValueChange={(value) =>
        dispatch(updateChartOptions({interval: value as Interval}))
      }
    />
  );
};

export default CandleInterval;
