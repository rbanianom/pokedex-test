import React from 'react';
import renderer from 'react-test-renderer';
import TypesTag from '../helper/types-tag';

const typeList = [
  {
    slot: 1,
    type: {
      name: 'grass',
      url: 'https://pokeapi.co/api/v2/type/12/',
    },
  },
  {
    slot: 2,
    type: {
      name: 'poison',
      url: 'https://pokeapi.co/api/v2/type/4/',
    },
  },
];

it('tag type render correctly', () => {
  const tree = renderer.create(<TypesTag types={typeList} />).toJSON();

  expect(tree).toMatchSnapshot();
});
