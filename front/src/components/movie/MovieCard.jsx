import React, { useEffect, useState } from "react";
import { API_URL_BACK } from "../../static/configFront";
import { TextField, Button, Card, CardContent } from "@mui/material";
const MovieCards = ({
  title,
  releaseDate,
  genre,
  price,
  id,
  onDelete,
  ...props
}) => {
  const [titleOwn, setTitleOwn] = useState(title);
  const [releaseDateOwn, setReleaseDateOwn] = useState(
    releaseDate.slice(0, 10)
  );
  const [genreOwn, setGenreOwn] = useState(genre);
  const [priceOwn, setPriceOwn] = useState(price);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${API_URL_BACK}Movies?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Title: titleOwn,
        ReleaseDate: releaseDateOwn,
        Genre: genreOwn,
        Price: priceOwn,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp.movie.id)
        console.log(id)
        if (resp.movie.id === id) {
          
          alert("movie updated");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = () => {
    fetch(`${API_URL_BACK}Movies?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.movie.id === id) {
          onDelete(resp.movie.id );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label={"Movie title"}
            type={"text"}
            value={titleOwn}
            onChange={(e) => setTitleOwn(e.target.value)}
            required={true}
          ></TextField>
          <TextField
            label={"Release date"}
            type={"date"}
            value={releaseDateOwn}
            onChange={(e) => setReleaseDateOwn(e.target.value)}
            required={true}
          ></TextField>
          <TextField
            label={"Genre"}
            type={"text"}
            value={genreOwn}
            onChange={(e) => setGenreOwn(e.target.value)}
            required={true}
          ></TextField>
          <TextField
            label={"Price"}
            type={"number"}
            inputMode="decimal"
            step="0.01"
            value={priceOwn}
            onChange={(e) => setPriceOwn(e.target.value)}
            required={true}
            error={price < 0}
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
