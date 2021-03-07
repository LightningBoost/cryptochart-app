import React from 'react';
import {render} from '@testing-library/react-native';
import {View} from 'react-native';
import SafeAreaView from '../safeAreaView';

it('should match the snapshot', () => {
  const component = render(
    <SafeAreaView>
      <View />
    </SafeAreaView>,
  ).toJSON();

  expect(component).toMatchSnapshot();
});
