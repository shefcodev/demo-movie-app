import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = ({ movies }) => {
  return (
    <ul className={classes['movies-list']}>
      {movies.map(({ id, title, releaseDate, openingText }) => (
        <Movie
          key={id}
          title={title}
          releaseDate={releaseDate}
          openingText={openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
