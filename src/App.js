import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    const response = await fetch('https://swapi.dev/api/films/');
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
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      {isLoading && (
        <section>
          <p>Loading...</p>
        </section>
      )}
      {movies.length && (
        <section>
          <MoviesList movies={movies} />
        </section>
      )}
    </React.Fragment>
  );
}

export default App;
