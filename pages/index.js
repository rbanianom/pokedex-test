import { useState, useEffect } from 'react';
import { Col, message, notification, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import PokemonList from '../components/pokemon-list';

export default function Index({ type }) {
  const [pokemons, setPokemons] = useState([]);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [initLoading, setInitLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function loadData() {
      let endpoint = '';

      try {
        if (type !== undefined) {
          endpoint = `https://pokeapi.co/api/v2/type/${type}`;
        } else {
          endpoint = `https://pokeapi.co/api/v2/pokemon?limit=20`;
        }

        const response = await fetch(endpoint, { method: 'GET' });
        const data = await response.json();

        let pokemonList = [];
        let count = 0;
        let results = [];

        if (type !== undefined) {
          count = data.pokemon.length;
          results = data.pokemon;
        } else {
          count = data.count;
          results = data.results;
        }
        setTotalPokemon(count);

        for (let i = 0; i < results.length; i++) {
          const pokemonName =
            type !== undefined ? results[i].pokemon.name : results[i].name;

          const detailEndpoint = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
          const detailResponse = await fetch(detailEndpoint, {
            method: 'GET',
          });
          const detailData = await detailResponse.json();

          const detailedPokemon = {
            id: detailData.id,
            name: detailData.name,
            height: detailData.height,
            weight: detailData.weight,
            image: detailData.sprites.front_default,
            stats: detailData.stats,
            types: detailData.types,
          };

          if (type !== undefined) {
            setInitLoading(false);
            pokemonList.push(detailedPokemon);
            setPokemons(pokemonList);
          } else {
            pokemonList.push(detailedPokemon);
          }
        }

        setPokemons(pokemonList);
        setIsLoading(false);
        setInitLoading(false);
      } catch (err) {
        notification.error({
          message: 'Error',
          description: 'Please reload your browser',
        });
      }
    }

    if (type !== undefined) {
      setHasMore(false);
    }

    setInitLoading(true);
    setIsLoading(true);
    loadData();
  }, [type]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    if (pokemons.length > totalPokemon) {
      message.warning('Pokemon List loaded all');
      setHasMore(false);
      setIsLoading(false);
      return;
    }
    if (isLoading) {
      const endpoint = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${pokemons.length}`;

      try {
        let pokemonList = pokemons;

        const response = await fetch(endpoint, { method: 'GET' });
        const data = await response.json();
        const { results } = data;

        for (let i = 0; i < results.length; i++) {
          const detailEndpoint = `https://pokeapi.co/api/v2/pokemon/${results[i].name}`;
          const detailResponse = await fetch(detailEndpoint, {
            method: 'GET',
          });
          const detailData = await detailResponse.json();
          const detailedPokemon = {
            id: detailData.id,
            name: detailData.name,
            height: detailData.height,
            weight: detailData.weight,
            image: detailData.sprites.front_default,
            stats: detailData.stats,
            types: detailData.types,
          };

          pokemonList.push(detailedPokemon);
        }

        setPokemons(pokemonList);
        setIsLoading(false);
      } catch (err) {
        notification.error({
          message: 'Error',
          description: 'Please reload your browser',
        });
      }
    }
  };

  if (initLoading) {
    return (
      <div
        style={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Spin tip="Loading..." />
      </div>
    );
  }

  return (
    <Col
      xs={{ span: 24 }}
      sm={{ offset: 1, span: 22 }}
      md={{ offset: 3, span: 20 }}
      xl={{ offset: 4, span: 18 }}
      xxl={{ offset: 5, span: 16 }}
    >
      <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore}>
        <PokemonList pokemons={pokemons} isLoading={isLoading} />
      </InfiniteScroll>
    </Col>
  );
}

Index.getInitialProps = async (ctx) => {
  const { type } = ctx.query;

  return {
    type,
  };
};
