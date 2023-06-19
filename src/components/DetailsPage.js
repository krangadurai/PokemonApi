import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DetailsPage = (params) => {
  console.log(params)
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);


  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.match.params.pokemonId}`);
      console.log(response);
      setPokemonDetails(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked((prevValue) => !prevValue);
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {pokemonDetails && (
        <div>
          <h2>{pokemonDetails.name}</h2>
          <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />

          <button onClick={toggleBookmark}>{isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}</button>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
