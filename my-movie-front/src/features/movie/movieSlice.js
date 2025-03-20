import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchMovies, fetchUpdateMovie, fetchDeleteMovies } from "../../api/movieApi"

const initialState = {
    movies : [],
    loading: false,
    error: false
}

export const fetchMoviesState = createAsyncThunk(
    'movies/fetchMoviesState',
    async () => {
        const movies = await fetchMovies()
        return movies;
    }
)

export const updateMoviesState = createAsyncThunk(
    'movies/updateMoviesState',
    async (movie) => {
        const updatedMovie = await fetchUpdateMovie(movie)
        return updatedMovie;
    }
)

export const deleteMoviesState = createAsyncThunk(
    'movies/deleteMoviesState',
    async (movie, ) => {
        const deletedMovie = await fetchDeleteMovies(movie)
        return deletedMovie;
    }
)


const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        deleteMovie : (state, action)=>{
            console.log(action.payload)
            state.movies = state.movies.filter(movie => movie.movieGuid !== action.payload.movie.movieGuid);
        },
        addMovie : (state, action)=>{
            state.movies.push(action.payload.movie)
        },
        updateMovie : (state, action)=>{
            const index = state.movies.findIndex(movie => movie.movieGuid === action.payload.movie.movieGuid);
            if(index !== -1){
                state.movies[index] = action.payload.movie
            }
        },
        editMovieField: (state, action) => {
            const { movieGuid, field, value } = action.payload;
            const movie = state.movies.find(movie => movie.movieGuid === movieGuid);
            
            if (movie) {
                movie[field] = value;  
            }
        }
    },
    extraReducers : builder =>{
        builder
            .addCase(fetchMoviesState.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoviesState.fulfilled,(state, action)=>{
                state.loading = false;
                state.movies = action.payload.movies;
            })
            .addCase(fetchMoviesState.rejected,(state, action)=>{
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateMoviesState.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMoviesState.fulfilled,(state, action)=>{
                state.loading = false;
                const index = state.movies.findIndex((movie) => movie.movieGuid === action.payload.movie.movieGuid);
                if (index !== -1) {
                    state.movies[index] = action.payload.movie;
                } 
            })
            .addCase(updateMoviesState.rejected,(state, action)=>{
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteMoviesState.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMoviesState.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.movies.findIndex((movie) => movie.movieGuid === action.payload.movie.movieGuid);
                if (index !== -1) {
                    state.movies.splice(index, 1);
                }
            })
            .addCase(deleteMoviesState.rejected,(state, action)=>{
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export const {deleteMovie, addMovie, updateMovie, editMovieField} = moviesSlice.actions

export default moviesSlice.reducer

export const selectAllMovies = (state) => state.movies.movies
