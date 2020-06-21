import { Tag } from 'antd';
import { capitalizeFirstLetter } from '../helper/string-format';
import getColor from '../helper/get-color';

export default function TypesTag({ types }) {
  return types.map((value, key) => {
    return (
      <Tag key={key} color={getColor(value.type.name)}>
        {capitalizeFirstLetter(value.type.name)}
      </Tag>
    );
  });
}
