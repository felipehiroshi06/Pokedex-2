import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      setPokemonList(data.results);
    };

    fetchPokemon();
  }, []);

  return (
    <div className="pokemon-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pokémon"
        />
      </div>
      <div className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
