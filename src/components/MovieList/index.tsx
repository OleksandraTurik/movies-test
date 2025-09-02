import { useEffect, useState } from "react";
import type { Movie } from "../../store/types";
import { getMovie } from "../../api";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchMoviesWithActors } from "../../store/thunks/moviesThunks";
import { selectMovies } from "../../store/slices/moviesSlice";
import { MovieModal } from "../Modals";
import { SearchBar } from "../ui/SearchBar";
import { ImportModal } from "../Modals/ImportModal";
import { Button } from "../ui/Button";

import "./style.css";

export const MoviesList = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "delete">("add");
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);

  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    dispatch(fetchMoviesWithActors());
  }, [dispatch]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleSearch = async (query: string, type: "title" | "actor") => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      setFilteredMovies(movies);
      return;
    }

    setSearching(true);

    try {
      if (type === "title") {
        setFilteredMovies(
          movies.filter((m) => m.title.toLowerCase().includes(trimmedQuery))
        );
      } else {
        const moviesWithActors = await Promise.all(
          movies.map(async (m) => {
            const fullInfo = await getMovie(m.id);
            return { ...m, actors: fullInfo.actors ?? [] };
          })
        );

        setFilteredMovies(
          moviesWithActors.filter((m) =>
            m.actors?.some((actor) =>
              actor.name.toLowerCase().includes(trimmedQuery)
            )
          )
        );
      }
    } finally {
      setSearching(false);
    }
  };

  const handleClick = async (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
      setSelectedMovie(null);
      return;
    }
    const movie = await getMovie(id);
    setSelectedMovie(movie);
    setExpandedId(id);
  };

  const handleAddMovie = () => {
    setModalMode("add");
    setModalOpen(true);
  };

  const handleDeleteMovie = (movie: Movie) => {
    setMovieToDelete(movie);
    setModalMode("delete");
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setMovieToDelete(null);
  };

  const handleModalChange = () => {
    dispatch(fetchMoviesWithActors());
  };

  const handleImportSuccess = () => {
    dispatch(fetchMoviesWithActors());
  };

  return (
    <div>
      <div className="header">
        <h1>🎬 Movie Library</h1>
        <div className="header-actions">
          <button onClick={handleAddMovie} className="add-movie-btn">
            Add Movie
          </button>
          <div>
            <Button onClick={() => setImportOpen(true)} variant="primary">
              Import File 📥
            </Button>
            <ImportModal
              open={importOpen}
              onClose={() => setImportOpen(false)}
              onUploadSuccess={handleImportSuccess}
            />
          </div>
        </div>
      </div>
      <div className="movies-container">
        <SearchBar onSearch={handleSearch} />
        {searching ? (
          <p>Searching...</p>
        ) : filteredMovies.length === 0 ? (
          <p className="not-found">No movies found</p>
        ) : (
          <ul>
            {filteredMovies.map((movie) => (
              <li
                key={movie.id}
                className={`movie-list-item${
                  expandedId === movie.id ? " expanded" : ""
                }`}
              >
                <div className="movie-main-row">
                  <span className="movie-title">
                    {movie.id}. {movie.title}
                  </span>
                  <div className="movie-actions">
                    <button
                      className="see-details-btn"
                      onClick={() => handleClick(movie.id)}
                    >
                      {expandedId === movie.id ? "Hide Details" : "See Details"}
                    </button>
                    <button
                      className="delete-movie-btn"
                      onClick={() => handleDeleteMovie(movie)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {expandedId === movie.id && selectedMovie && (
                  <div className="movie-actors">
                    <p>Year: {movie.year}</p>
                    <p>Format: {movie.format}</p>
                    <strong>Actors:</strong>
                    <ul>
                      {selectedMovie.actors?.map((actor) => (
                        <li key={actor.id}>{actor.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <MovieModal
          open={modalOpen}
          mode={modalMode}
          movie={movieToDelete ?? undefined}
          onClose={handleModalClose}
          onChange={handleModalChange}
        />
      </div>
    </div>
  );
};
