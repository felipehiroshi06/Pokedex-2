import React from 'react';
import PokemonList from '../components/PokemonList';
import '../pages/Home.css'; 

function Home() {
  return (
    <div className="home-container"> 
        <img src="../assets/pokemon.png" alt="Pokemon" className="pokemon-logo" /> 
        <PokemonList />
    </div>
  );
}

export default Home;
