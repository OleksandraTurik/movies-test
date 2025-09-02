import Portal from "./Portal";
import type { Movie } from "../../store/types";
import { AddMovieForm } from "./AddMovie";
import { DeleteMovieConfirm } from "./DeleteMovieConfirm";

import "./style.css";

interface MovieModalProps {
  open: boolean;
  mode: "add" | "delete";
  movie?: Movie;
  onClose: () => void;
  onChange: () => void;
}

export const MovieModal = ({
  open,
  mode,
  movie,
  onClose,
  onChange,
}: MovieModalProps) => {
  if (!open) return null;

  return (
    <Portal>
      <div className="modal-overlay">
        <div className="modal-container">
          {mode === "add" ? (
            <AddMovieForm onClose={onClose} onChange={onChange} />
          ) : (
            <DeleteMovieConfirm
              movie={movie}
              onClose={onClose}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    </Portal>
  );
};
