import React from 'react';
import {render} from '@testing-library/react-native';
import {View} from 'react-native';
import FullWidthView from '../fullWidth';

it('should match the snapshot', () => {
  const component = render(
    <FullWidthView>
      <View />
    </FullWidthView>,
  ).toJSON();

  expect(component).toMatchSnapshot();
});
