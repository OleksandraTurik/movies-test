import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateMovieDto, Movie } from "../types";
import { addMovie, deleteMovieById, getMovie, getMovies } from "../../api";

export const fetchMoviesWithActors = createAsyncThunk<Movie[]>(
  "movies/fetchMoviesWithActors",
  async () => {
    const movies = await getMovies();

    const moviesWithActors = await Promise.all(
      movies.map(async (movie) => {
        const fullMovie = await getMovie(movie.id);
        return { ...movie, actors: fullMovie.actors ?? [] };
      })
    );

    return moviesWithActors;
  }
);

export const createMovie = createAsyncThunk<Movie, CreateMovieDto>(
  "movies/create",
  async (dto) => {
    const movie = await addMovie(dto);
    return movie;
  }
);

export const deleteMovie = createAsyncThunk<number, number>(
  "movies/delete",
  async (id) => {
    await deleteMovieById(id);
    return id;
  }
);
