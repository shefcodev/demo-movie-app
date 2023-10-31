import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('https://swapi.dev/api/film/');

      if (!response.ok) {
        throw new Error('Invalid Request URL');
      }

      const data = await response.json();

      const transformedMovies = data.results.map(
        ({ episode_id, title, opening_crawl, release_date }) => ({
          episodeID: episode_id,
          title,
          openingText: opening_crawl,
          releaseDate: release_date,
        })
      );

      setMovies(transformedMovies);
      setIsLoading(false);
    } catch ({ message }) {
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && (
          <p>
            <i>No Movies Found.</i>
          </p>
        )}
        {isLoading && (
          <p>
            <i>Loading...</i>
          </p>
        )}
        {!isLoading && error && (
          <p>
            <i>{error}</i>
          </p>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
