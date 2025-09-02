import type { CreateMovieDto, Movie } from "../store/types";
import api from "./api";

export async function getMovies(): Promise<Movie[]> {
  const response = await api.get("/movies");
  return response.data.data;
}

export async function getMovie(id: number): Promise<Movie> {
  const response = await api.get(`/movies/${id}`);
  return response.data.data;
}

export async function addMovie(dto: CreateMovieDto): Promise<Movie> {
  const res = await api.post("/movies", dto);
  return res.data.data;
}

export async function deleteMovieById(id: number): Promise<void> {
  await api.delete(`/movies/${id}`);
}

export async function importMovies(file: File): Promise<{ importedCount: number }> {
  const formData = new FormData();
  formData.append("movies", file);

  const res = await api.post("/movies/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}