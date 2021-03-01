import React from 'react';
import Chart from '../../components/Chart';
import FullHeightView from '../../components/View/fullHeight';
import SafeAreaView from '../../components/View/safeAreaView';

const ChartScreen: React.FC = () => {
  return (
    <SafeAreaView edges={['bottom']}>
      <FullHeightView>
        <Chart />
      </FullHeightView>
    </SafeAreaView>
  );
};

export default ChartScreen;
