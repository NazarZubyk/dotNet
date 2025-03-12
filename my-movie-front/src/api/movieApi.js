import { API_URL_BACK } from "../static/configFront";

export const fetchMovies = async () => {
  const resp = await fetch(API_URL_BACK + "Movies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!resp.ok) {
    new Error("Cant fetch data - movies");
  }
  const data = await resp.json();
  console.log(data)
  return data;
};

export const fetchUpdateMovie = async (movie) => {
  const resp = await fetch(API_URL_BACK + "Movies", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...movie,
    }),
  });
  if (!resp.ok) {
    new Error("Cant update data - movies");
  }
  const data = await resp.json();
  return data;
};

export const fetchDeleteMovies = async (movie) => {
  const resp = await fetch(API_URL_BACK + "Movies", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...movie,
    }),
  });

  if (!resp.ok) {
    new Error("Cant delete data - movies");
  }
  const data = await resp.json();
  return data;
};

export const fetchCreateMovie = async (newData) => {
  const resp = await fetch(`${API_URL_BACK}Movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  if (!resp.ok) {
    new Error("Cant delete data - movies");
  }
  const data = await resp.json();
  return data;
};
