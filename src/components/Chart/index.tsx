import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';

const Chart = () => {
  return (
    <View style={styles.container}>
      <LineChart
        style={styles.chart}
        data={{dataSets: [{label: 'demo', values: [{y: 1}, {y: 2}, {y: 1}]}]}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});

export default Chart;
