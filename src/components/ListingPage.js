import React, { useEffect, useState } from 'react';
import { useHistory,Link } from 'react-router-dom';
import { Grid } from 'gridjs-react';
import axios from 'axios';
import { html } from 'gridjs';

const ListingPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPage, setNextPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * 10}&limit=10`);
        const data = response.data.results;
        setPokemonList((prevList) => [...prevList, ...data]);
        setNextPage(response.data.next);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchPokemonList();
  }, [currentPage]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const formatterViewLink = (Linkurl) => {
    const id = Linkurl.split('/').filter(Boolean).pop();
    const html = `<a href="/details/${id}">View Full Details</a>`;
    return html;
  }
  const columns = [
    {
      name: "Name",
      sort: true,
     
    },{
      name:"Url",
      formatter: (cell) => html(formatterViewLink(cell))
    } 
  ];
  const handleClick = (pokemonName) => {
    // Navigate to the details page with the selected Pokémon's name as a route parameter
    history.push(`/details/${pokemonName}`);
  };
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Grid
            data={pokemonList}
            columns={columns}
            search={true}
            pagination={{
              enabled: false,
            }}
          />
          {nextPage && (
            <div className="text-center mt-3">
              <button className="btn btn-primary" onClick={loadMore}>
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListingPage;
