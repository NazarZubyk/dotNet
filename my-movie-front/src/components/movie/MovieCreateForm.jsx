import React, { useState } from "react";
import { TextField, Grid2, Button } from "@mui/material";
import { fetchCreateMovie } from "../../api/movieApi";
import { useAppDispatch } from '../../app/hooks';
import { fetchMoviesState} from "../../features/movie/movieSlice"

const MovieCreateForm = () => {

  const dispatch = useAppDispatch()

  const [movie, setMovie] = useState({
    title: "",
    releaseDate: "",
    genre: "",
    price: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      Title: movie.title,
      ReleaseDate: movie.releaseDate,
      Genre: movie.genre,
      Price: movie.price,
    };

    await fetchCreateMovie(data)

    dispatch(fetchMoviesState())

    setMovie({
      title: "",
      releaseDate: "",
      genre: "",
      price: "",
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid2 container spacing={2} margin={2}>
        <Grid2 size={12}>
          <TextField
            label={"Movie title"}
            type={"text"}
            value={movie.title}
            onChange={(e) => setMovie({
              ...movie,
              title: e.target.value
            })}
            required={true}
          ></TextField>
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label={"Release date"}
            type={"date"}
            value={movie.releaseDate}
            onChange={(e) => setMovie({
              ...movie,
              releaseDate: e.target.value
            })}
            required={true}
          ></TextField>
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label={"Genre"}
            type={"text"}
            value={movie.genre}
            onChange={(e) => setMovie({
              ...movie,
              genre: e.target.value
            })}
            required={true}
          ></TextField>
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label={"Price"}
            type={"number"}
            inputMode="decimal"
            step="0.01"
            value={movie.price}
            onChange={(e) => setMovie({
              ...movie,
              price: e.target.value
            })}
            required={true}
            error={movie.price < 0}
          ></TextField>
        </Grid2>
        <Grid2 size={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default MovieCreateForm;
