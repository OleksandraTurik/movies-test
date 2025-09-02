import type { Movie } from "../../store/types";
import { deleteMovieById } from "../../api";
import { Button } from "../ui/Button";

interface DeleteMovieConfirmProps {
  movie?: Movie;
  onClose: () => void;
  onChange: () => void;
}

export const DeleteMovieConfirm = ({
  movie,
  onClose,
  onChange,
}: DeleteMovieConfirmProps) => {
  const handleDelete = async () => {
    if (!movie) return;
    try {
      await deleteMovieById(movie.id);
      onChange();
      onClose();
    } catch (err) {
      console.error("Failed to delete movie", err);
    }
  };

  return (
    <>
      <h2 className="modal-title">Delete movie</h2>
      <p className="modal-message">
        Are you sure you want to delete <strong>{movie?.title}</strong>?
      </p>
      <div className="modal-actions">
        <Button type="button" onClick={onClose} variant="cancel">
          Cancel
        </Button>
        <Button type="button" variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </>
  );
};
