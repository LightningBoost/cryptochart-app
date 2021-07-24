import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Paragraph, Switch} from 'react-native-paper';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {ChartQuery} from '../../../generated/graphql';
import FullWidthView from '../../View/fullWidth';
import {addChart, removeChart} from '../../../actions/chartActions';

const Volume: React.FC = () => {
  const {t} = useTranslation();
  const {charts} = useTypedSelector((state) => state.chart);
  const dispatch = useDispatch();

  const isSelected = useMemo(() => {
    return charts.includes(ChartQuery.Volume);
  }, [charts]);

  const handleClick = () => {
    if (charts.includes(ChartQuery.Volume)) {
      dispatch(removeChart(ChartQuery.Volume));
      return;
    }
    dispatch(addChart(ChartQuery.Volume));
  };

  return (
    <FullWidthView style={styles.container}>
      <Paragraph style={styles.paragraph}>{t('Show volume')}</Paragraph>
      <Switch
        value={isSelected}
        onValueChange={handleClick}
        style={styles.switch}
      />
    </FullWidthView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paragraph: {
    fontWeight: 'bold',
  },
  switch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
});

export default Volume;
