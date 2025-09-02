import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createMovie, deleteMovie, fetchMoviesWithActors } from "../thunks/moviesThunks";
import type { Movie } from "../types";
import type { RootState } from "..";

export interface MoviesState {
  items: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  items: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesWithActors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMoviesWithActors.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchMoviesWithActors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load movies";
      });

    // CREATE MOVIE
    builder.addCase(createMovie.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      createMovie.fulfilled,
      (state, action: PayloadAction<Movie>) => {
        state.items.push(action.payload);
        state.loading = false;
      }
    );
    builder.addCase(createMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to create movie";
    });

    // DELETE MOVIE
    builder.addCase(deleteMovie.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteMovie.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(
          (movie) => movie.id !== action.payload
        );
        state.loading = false;
      }
    );
    builder.addCase(deleteMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to delete movie";
    });
  },
});

export default moviesSlice.reducer;

export const selectMovies = (state: RootState) => state.movies.items;
export const selectMoviesLoading = (state: RootState) => state.movies.loading;
export const selectMoviesError = (state: RootState) => state.movies.error;
