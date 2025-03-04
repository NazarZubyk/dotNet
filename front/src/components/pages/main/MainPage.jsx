import MovieCreateForm from "../../movie/MovieCreateForm";
import MovieCards from "../../movie/MovieCards";
import React, {useState} from "react";
import { Container } from "@mui/material";

const MainPage = () => {
  const [update, setUpdate] = useState(false);

  const handleMovieCreate = ()=>{
    setUpdate(!update)
  }

  return (
    <Container>
      <MovieCreateForm onCreate={handleMovieCreate}></MovieCreateForm>
      <MovieCards update={update}></MovieCards>
    </Container>
  );
};

export default MainPage;
