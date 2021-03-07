import React from 'react';
import renderer from 'react-test-renderer';
import RefreshButton from '../index';

it('should match the snapshot', () => {
  const mockFn = jest.fn();

  const tree = renderer.create(<RefreshButton onPress={mockFn} />).toJSON();

  expect(tree).toMatchSnapshot();
});
