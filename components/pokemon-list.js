import { List, Progress, Card, Row, Col, Typography, Skeleton } from 'antd';
import TypesTag from '../helper/types-tag';
import getColor from '../helper/get-color';
import { capitalizeFirstLetter } from '../helper/string-format';

const { Title } = Typography;

export default function PokemonList({ pokemons, isLoading }) {
  return (
    <>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={pokemons}
        renderItem={(item) => {
          let backgroundColor = '';
          if (item.types.length > 1) {
            backgroundColor = `linear-gradient(to right, ${getColor(
              item.types[0].type.name
            )}59, ${getColor(item.types[1].type.name)}59)`;
          } else {
            backgroundColor = `${getColor(item.types[0].type.name)}59`;
          }

          return (
            <List.Item>
              <Card
                style={{
                  borderRadius: '10px',
                  backgroundImage: backgroundColor,
                  background: backgroundColor,
                }}
              >
                <Row>
                  <Col span={11}>
                    <Row>
                      <Col span={5}>
                        <MeasurementCard value={item.height} measurement="m" />
                      </Col>
                      <Col span={14} style={{ textAlign: 'center' }}>
                        <Pokemon
                          id={item.id}
                          name={item.name}
                          image={item.image}
                          types={item.types}
                        />
                      </Col>
                      <Col span={5}>
                        <MeasurementCard value={item.weight} measurement="kg" />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={13}>
                    <PokemonStats stats={item.stats} />
                  </Col>
                </Row>
              </Card>
            </List.Item>
          );
        }}
      />
      {isLoading && (
        <Card
          style={{
            borderRadius: '10px',
          }}
        >
          <Row>
            <Col span={11}>
              <Row>
                <Col span={5}>
                  <Skeleton.Button active={true} />
                </Col>
                <Col span={14} style={{ textAlign: 'center', padding: '20px' }}>
                  <Skeleton.Avatar active={true} size="large" />
                  <Skeleton.Input active={true} style={{ marginTop: '30px' }} />
                </Col>
                <Col span={5}>
                  <Skeleton.Button active={true} />
                </Col>
              </Row>
            </Col>
            <Col span={13}>
              <Row>
                <Col span={8} style={{ paddingLeft: '10px' }}>
                  <Skeleton.Input active={true} style={{ height: '150px' }} />
                </Col>
                <Col span={3} style={{ paddingLeft: '10px' }}>
                  <Skeleton.Input active={true} style={{ height: '150px' }} />
                </Col>
                <Col span={13} style={{ paddingLeft: '10px' }}>
                  <Skeleton.Input active={true} style={{ height: '150px' }} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
}

function MeasurementCard({ value, measurement }) {
  const cardBodyStyle = {
    borderRadius: '50px',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: 0,
  };
  const textStyle = {
    textAlign: 'center',
    margin: 0,
    fontWeight: 'bold',
  };

  return (
    <Card style={{ borderRadius: '50px' }} bodyStyle={cardBodyStyle}>
      <p style={textStyle}>{`${value / 10}${measurement}`}</p>
    </Card>
  );
}

function Pokemon({ id, name, image, types }) {
  const imgStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '135px',
    height: 'auto',
  };

  return (
    <div style={{ height: '100%' }}>
      <img
        style={imgStyle}
        alt={name}
        src={image !== null ? image : window.location.origin + '/pokeball.png'}
      />
      <Title level={4}>{`#${id} ${name.toUpperCase()}`}</Title>
      <TypesTag types={types} />
    </div>
  );
}

function PokemonStats({ stats }) {
  const statsDesc = stats.map((value, index) => (
    <p style={{ fontWeight: 'bold' }} key={index}>
      {capitalizeFirstLetter(value.stat.name)}
    </p>
  ));
  const statsNumber = stats.map((value, index) => (
    <p key={index}>{value.base_stat}</p>
  ));
  const statsGraph = stats.map((value, index) => {
    let strokeColor = '';
    if (value.base_stat < 50) {
      strokeColor = '#e35655';
    } else if (value.base_stat < 100) {
      strokeColor = '#f6a52d';
    } else if (value.base_stat < 150) {
      strokeColor = '#f6ca2a';
    } else {
      strokeColor = '#6ba84e';
    }
    return (
      <div style={{ marginTop: 0, marginBottom: '1em' }} key={index}>
        <Progress
          key={index}
          percent={(value.base_stat * 100) / 255}
          strokeColor={strokeColor}
          showInfo={false}
          status="active"
        />
      </div>
    );
  });

  return (
    <Row>
      <Col span={8} style={{ textAlign: 'right' }}>
        {statsDesc}
      </Col>
      <Col span={3} style={{ textAlign: 'center' }}>
        {statsNumber}
      </Col>
      <Col span={13}>{statsGraph}</Col>
    </Row>
  );
}
