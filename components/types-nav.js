import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spin, List, Button } from 'antd';
import { capitalizeFirstLetter } from '../helper/string-format';
import getColor from '../helper/get-color';

export default function TypesNav({ isResponsive }) {
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

  const handleAll = (e) => {
    e.preventDefault();
    setActiveNav('');
    router.push({
      pathname: '/',
      query: {},
    });
  };

  if (data === null) {
    return <Spin />;
  }

  return (
    <List
      grid={{
        gutter: 16,
        column: isResponsive ? 2 : 1,
      }}
      style={{ padding: '10px', textAlign: 'center' }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Button
            className="custom-button"
            block
            size="large"
            onClick={(event) => {
              event.preventDefault();
              setActiveNav(item.name);
              router.push(`/?type=${item.name}`);
            }}
            style={{
              fontWeight: 'bold',
              borderRadius: '7px',
              background:
                item.name === activeNav ? getColor(item.name) : '#ecececa6',
              borderColor:
                item.name === activeNav ? getColor(item.name) : '#ecececa6',
              color: item.name === activeNav ? 'white' : getColor(item.name),
            }}
          >
            {capitalizeFirstLetter(item.name)}
          </Button>
        </List.Item>
      )}
    >
      <List.Item>
        <Button
          size="large"
          block
          onClick={(event) => handleAll(event)}
          style={{
            fontWeight: 'bold',
            borderRadius: '7px',
          }}
        >
          All
        </Button>
      </List.Item>
    </List>
  );
}
