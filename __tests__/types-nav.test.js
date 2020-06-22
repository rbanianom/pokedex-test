import React from 'react';
import renderer from 'react-test-renderer';
import TypesNav from '../components/types-nav';

it('type nav render correctly', () => {
  const tree = renderer
    .create(<TypesNav isResponsive={false} handleNavButton={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
