import React, { useState } from "react";
import { API_URL_BACK } from "../../static/configFront";
import { TextField, Grid2, Button } from "@mui/material";

const MovieCreateForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      Title: title,
      ReleaseDate: releaseDate,
      Genre: genre,
      Price: price,
    };

    fetch(`${API_URL_BACK}Movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => {
        console.log(resp.json());
      })
      .catch((err) => {
        console.error(err);
      });

    onCreate();

    setTitle("");
    setReleaseDate("");
    setGenre("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid2 container spacing={2} margin={2}>
        <Grid2 size={12}>
          <TextField
            label={"Movie title"}
            type={"text"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required={true}
          ></TextField>
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label={"Release date"}
            type={"date"}
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required={true}
          ></TextField>
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label={"Genre"}
            type={"text"}
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required={true}
          ></TextField>
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label={"Price"}
            type={"number"}
            inputMode="decimal"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required={true}
            error={price < 0}
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
