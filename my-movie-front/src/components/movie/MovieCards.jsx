import { Grid2 } from "@mui/material";
import React, { useEffect } from "react";
import MovieCard from "../movie/MovieCard";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAllMovies, fetchMoviesState} from "../../features/movie/movieSlice"
const MovieCards = () => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(selectAllMovies)
 
  useEffect(() => {
    dispatch(fetchMoviesState())
  }, [dispatch]);

  

  return (
    <Grid2 container spacing={2} margin={2}>
      {movies.map((movie) => (
        <Grid2 key={movie.id}>
          <MovieCard
            title={movie.title}
            releaseDate={movie.releaseDate}
            genre={movie.genre}
            price={movie.price}
            id={movie.id}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default MovieCards;
