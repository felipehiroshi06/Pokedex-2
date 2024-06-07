import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.css';

function PokemonCard({ pokemon }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      setDetails(data);
    };

    fetchPokemonDetails();
  }, [pokemon]);

  if (!details) return null;

  return (
    <div className="pokemon-card">
      <Link to={`/pokemon/${pokemon.name}`}>
        <img src={details.sprites.front_default} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <div className="types">
          {details.types.map((type, index) => (
            <span key={index} className="type">{type.type.name}</span>
          ))}
        </div>
      </Link>
    </div>
  );
}

export default PokemonCard;
