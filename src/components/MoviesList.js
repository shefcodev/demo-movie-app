import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = ({ movies }) => {
  return (
    <ul className={classes['movies-list']}>
      {movies.map(
        ({
          title,
          episode_id: episodeID,
          release_data: releaseData,
          opening_crawl: openingCrawl,
        }) => (
          <Movie
            key={episodeID}
            title={title}
            releaseDate={releaseData}
            openingText={openingCrawl}
          />
        )
      )}
    </ul>
  );
};

export default MovieList;
