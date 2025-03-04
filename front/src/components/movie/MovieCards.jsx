import { Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieCard from "../movie/MovieCard"

const MovieCards = ({update}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5019/apiV1/Movies")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setMovies(data.movies);
      })
      .catch((err) => console.err(err));
  }, [update]);

  const handleDelete = (id)=>{
    setMovies(movies.filter((movie)=>movie.id!==id))
  }

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
            onDelete={handleDelete}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default MovieCards;
