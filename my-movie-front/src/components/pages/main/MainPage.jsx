import MovieCreateForm from "../../movie/MovieCreateForm";
import MovieCards from "../../movie/MovieCards";
import React, { useState } from "react";

const MainPage = () => {
  const [update, setUpdate] = useState(false);
  
  const handleMovieCreate = () => {
    setUpdate(!update);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <MovieCreateForm onCreate={handleMovieCreate} ></MovieCreateForm>
      <MovieCards update={update}></MovieCards>
    </div>
  );
};

export default MainPage;
