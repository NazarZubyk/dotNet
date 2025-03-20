import React, { useState } from "react";
import { TextField, Grid2, Button, styled} from "@mui/material";
import { fetchCreateMovie } from "../../api/movieApi";
import { useAppDispatch } from '../../app/hooks';
import { fetchMoviesState} from "../../features/movie/movieSlice"

const MovieCreateForm = () => {

  const MyButton = styled(Button)({
    backgroundColor: '#e3f2fd',         
    color: '#1976d2',                  
    padding: '10px 20px',
    fontWeight: 'bold',
    borderRadius: '8px',           
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)', 
    '&:hover': {
      backgroundColor: '#bbdefb',       
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', 
    },
  });

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
    <form onSubmit={handleSubmit} className="flex justify-center w-60" >
      <Grid2 container spacing={2} margin={2} >
        <Grid2 size={12} >
          <TextField
            label={"Movie title"}
            type={"text"}
            value={movie.title}
            onChange={(e) => setMovie({
              ...movie,
              title: e.target.value
            })}
            required
          ></TextField>
        </Grid2>
        <Grid2 size={12}>
          <div className="border-gray-300 border-1 rounded-sm p-2  hover:border-gray-400" >
            <label className="text-gray-500">
              Release date
            </label>
            <input 
              className=""
              id="releaseDate"
              type="date"
              required
              value={movie.releaseDate}
              onChange={(e) =>
                setMovie({
                  ...movie,
                  releaseDate: e.target.value,
                })
              }
            />
          </div>
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
          <MyButton fullWidth type="submit">
            Submit
          </MyButton>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default MovieCreateForm;
