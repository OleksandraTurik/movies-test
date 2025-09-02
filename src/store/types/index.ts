export interface Actor {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type MovieFormat = "VHS" | "DVD" | "Blu-ray";

export interface Movie {
  id: number;
  title: string;
  year: number;
  format: MovieFormat;
  actors: Actor[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovieDto {
  title: string;
  year: number;
  format: "VHS" | "DVD" | "Blu-ray";
  actors: string[];
}