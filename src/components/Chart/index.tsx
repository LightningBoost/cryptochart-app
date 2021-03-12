import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CombinedData} from 'react-native-charts-wrapper';
import CombinedChart from './combinedChart';

interface IProps {
  data: CombinedData;
}

const Chart: React.FC<IProps> = ({data}) => {
  return (
    <View style={styles.container}>
      <CombinedChart data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chart;
