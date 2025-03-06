import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from "../features/movie/movieSlice"
export default configureStore({
    reducer: {
        movies: moviesReducer,
    }
})