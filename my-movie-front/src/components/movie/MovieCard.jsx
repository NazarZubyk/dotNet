import React from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { updateMoviesState, editMovieField } from "../../features/movie/movieSlice";
import { deleteMoviesState} from "../../features/movie/movieSlice"


const MovieCards = ({
  
  id
}) => {
  const dispatch = useAppDispatch()
  const movie = useAppSelector(state =>
    state.movies.movies.find(movie => movie.id === id)
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateMoviesState({
          Id : movie.id,
          Title: movie.title,
          ReleaseDate: movie.releaseDate,
          Genre: movie.genre,
          Price: movie.price,
    }))
  };

  const handleDelete = ()=>{
      dispatch(deleteMoviesState({
        Id : movie.id,
        Title: movie.title,
        ReleaseDate: movie.releaseDate,
        Genre: movie.genre,
        Price: movie.price,
  }));
  };

  const handleChange = (event)=>{
    dispatch(editMovieField({ id, field: event.target.name, value: event.target.value }));
  };

  return (
    <Card>
      <CardContent >
        <form onSubmit={handleSubmit} className="gap-2 flex flex-wrap">
          <TextField
            label={"Movie title"}
            type={"text"}
            name="title"
            value={movie.title}
            onChange={handleChange}
            required={true}
          ></TextField>
          <TextField 
            label={"Release date"}
            type={"date"}
            name="releaseDate"
            value={movie.releaseDate.slice(0, 10)}
            onChange={handleChange}
            required={true}
          ></TextField>
          <TextField
            label={"Genre"}
            type={"text"}
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            required={true}
          ></TextField>
          <TextField
            label={"Price"}
            type={"number"}
            inputMode="decimal"
            step="0.01"
            name="price"
            value={movie.price}
            onChange={handleChange}
            required={true}
            error={movie.price < 0}
          ></TextField>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default MovieCards;
