import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tag, Spin, List, Button } from 'antd';
import { capitalizeFirstLetter } from '../helper/string-format';
import getColor from '../helper/get-color';

export default function TypesNav() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const endpoint = 'https://pokeapi.co/api/v2/type?limit=18';

      const response = await fetch(endpoint, { method: 'GET' });
      const data = await response.json();

      setData(data.results);
    }

    if (router !== null) {
      const { type } = router.query;
      setActiveNav(type);
    }
    loadData();
  }, []);

  if (data === null) {
    return <Spin />;
  }

  const nav = data.map((value, key) => {
    return (
      <List.Item key={key}>
        <Button
          className="custom-button"
          size="large"
          block
          onClick={(event) => {
            event.preventDefault();
            setActiveNav(value.name);
            router.push(`/?type=${value.name}`);
          }}
          style={{
            borderRadius: '7px',
            background:
              value.name === activeNav ? getColor(value.name) : '#ecececa6',
            borderColor:
              value.name === activeNav ? getColor(value.name) : '#ecececa6',
            color: value.name === activeNav ? 'white' : getColor(value.name),
          }}
        >
          {capitalizeFirstLetter(value.name)}
        </Button>
      </List.Item>
    );
  });
  return (
    <List
      grid={{ column: 24 }}
      style={{ padding: '10px', textAlign: 'center' }}
    >
      {nav}
    </List>
  );
}
