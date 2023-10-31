import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        'https://react-movie-app-979be-default-rtdb.firebaseio.com/movies.json'
      );

      if (!response.ok) {
        throw new Error('Invalid Request URL');
      }

      const data = await response.json();

      console.log(data);

      const loadedMovies = [];

      for (let key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      const transformedMovies = loadedMovies.map(
        ({ id, title, openingText, releaseDate }) => ({
          id,
          title,
          openingText,
          releaseDate,
        })
      );

      setMovies(transformedMovies);
      setIsLoading(false);
    } catch ({ message }) {
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      'https://react-movie-app-979be-default-rtdb.firebaseio.com/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    console.log(data);
  };

  let content = <p>No Movies Found.</p>;

  if (isLoading) {
    content = (
      <p>
        <i>Loading...</i>
      </p>
    );
  } else if (error) {
    content = (
      <p>
        <i>{error}</i>
      </p>
    );
  } else if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
