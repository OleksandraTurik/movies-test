import { useState } from "react";
import type { CreateMovieDto } from "../../store/types";
import { addMovie } from "../../api";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

interface AddMovieFormProps {
  onClose: () => void;
  onChange: () => void;
}

export const AddMovieForm = ({ onClose, onChange }: AddMovieFormProps) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [format, setFormat] = useState<"VHS" | "DVD" | "Blu-ray">("DVD");
  const [actors, setActors] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const dto: CreateMovieDto = {
      title,
      year: Number(year),
      format,
      actors: actors.split(",").map((a) => a.trim()),
    };

    try {
      await addMovie(dto);
      onChange();
      onClose();
      setTitle("");
      setYear("");
      setFormat("DVD");
      setActors("");
    } catch (err) {
      console.error("Failed to add movie", err);
    }
  };

  return (
    <>
      <h2 className="modal-title">Add a new movie</h2>
      <form onSubmit={handleAdd} className="modal-form">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          required
        />
        <Select
          label="Format"
          value={format}
          options={["VHS", "DVD", "Blu-ray"]}
          onChange={(e) =>
            setFormat(e.target.value as "VHS" | "DVD" | "Blu-ray")
          }
          className="modal-select"
        />
        <Input
          label="Actors (comma separated)"
          value={actors}
          onChange={(e) => setActors(e.target.value)}
          placeholder="e.g. Tom Hanks, Meg Ryan"
        />
        <div className="modal-actions">
          <Button type="button" onClick={onClose} variant="cancel">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Movie
          </Button>
        </div>
      </form>
    </>
  );
};
