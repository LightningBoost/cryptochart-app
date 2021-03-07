import React from 'react';
import {render} from '@testing-library/react-native';
import {View} from 'react-native';
import FullHeightView from '../fullHeight';

it('should match the snapshot', () => {
  const component = render(
    <FullHeightView>
      <View />
    </FullHeightView>,
  ).toJSON();

  expect(component).toMatchSnapshot();
});
