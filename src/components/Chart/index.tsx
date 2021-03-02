import React from 'react';
import {StyleSheet, View} from 'react-native';
import CombinedChart from './combinedChart';

const Chart: React.FC = () => {
  return (
    <View style={styles.container}>
      <CombinedChart />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chart;
