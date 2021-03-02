import React from 'react';
import {StyleSheet, View} from 'react-native';
import CombinedChart from './combinedChart';
import {ChartContext, ChartContextData} from './chartContext';

const Chart: React.FC<ChartContextData> = ({data}) => {
  return (
    <ChartContext.Provider value={{data}}>
      <View style={styles.container}>
        <CombinedChart />
      </View>
    </ChartContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chart;
