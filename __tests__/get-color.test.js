import getColor from '../helper/get-color';

it('properly get color by type', () => {
  expect(getColor('bug')).toBe('#88960e');
});
