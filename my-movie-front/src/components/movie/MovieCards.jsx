import { Grid2 } from "@mui/material";
import React, { useEffect } from "react";
import MovieCard from "../movie/MovieCard";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectAllMovies,
  fetchMoviesState,
} from "../../features/movie/movieSlice";
const MovieCards = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectAllMovies);

  useEffect(() => {
    dispatch(fetchMoviesState());
  }, [dispatch]);

  return (
    <div className="flex flex-wrap justify-around gap-4 ">
      {movies.map((movie) => (
        <div key={movie.id} className="w-60">
          
            <MovieCard
              
              title={movie.title}
              releaseDate={movie.releaseDate}
              genre={movie.genre}
              price={movie.price}
              id={movie.id}
            />
          
        </div>
      ))}
    </div>
  );
};

export default MovieCards;
