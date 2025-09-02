import { useState, type ChangeEvent } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { importMovies } from "../../api";

import "./style.css";

interface ImportModalProps {
  open: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

export const ImportModal = ({
  open,
  onClose,
  onUploadSuccess,
}: ImportModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const result = await importMovies(file);
      alert(`Imported ${result.importedCount} movies`);
      onUploadSuccess();
      onClose();
      setFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Import Movies</h3>
        <Input type="file" accept=".txt" onChange={handleFileChange} />
        <div className="modal-actions">
          <Button onClick={onClose} variant="cancel">
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!file || loading}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
};
