import { capitalizeFirstLetter } from '../helper/string-format';

it('properly format string to capitalize first letter', () => {
  expect(capitalizeFirstLetter('pokemon')).toBe('Pokemon');
});
