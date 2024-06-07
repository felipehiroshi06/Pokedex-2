import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailsPokemon.css';

function DetailsPokemon() {
  const { name } = useParams();
  const [details, setDetails] = useState(null);
  const [types, setTypes] = useState([]);
  const [moves, setMoves] = useState([]);
  const [weaknesses, setWeaknesses] = useState({});

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setDetails(data);
      setTypes(data.types.map(typeInfo => typeInfo.type.name));
      setMoves(data.moves.map(moveInfo => moveInfo.move.name));
    };

    fetchPokemonDetails();
  }, [name]);

  const fetchTypeWeaknesses = async (types) => {
    const weaknesses = {};
    for (const type of types) {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      weaknesses[type] = data.damage_relations.double_damage_from.map(t => t.name);
    }
    return weaknesses;
  };

  useEffect(() => {
    if (types.length > 0) {
      const getWeaknesses = async () => {
        const weaknessesData = await fetchTypeWeaknesses(types);
        setWeaknesses(weaknessesData);
      };
      getWeaknesses();
    }
  }, [types]);

  if (!details) return <div>Loading...</div>;

  return (
    <div className="details-container">
      <Link to="/" className="back-link">Back to Home</Link>
      <div className="details-content">
        <h1>{details.name}</h1>
        <img src={details.sprites.front_default} alt={details.name} />
        <div>
          <h2>Types</h2>
          <ul>
            {types.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Moves</h2>
          <ul>
            {moves.map((move, index) => (
              <li key={index}>{move}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Weaknesses</h2>
          <ul>
            {Object.keys(weaknesses).map((type, index) => (
              <li key={index}>
                {type}: {weaknesses[type].join(', ')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetailsPokemon;
