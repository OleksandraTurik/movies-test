import React, { useState } from "react";
import { Select } from "../Select";
import { Button } from "../Button";

import "./style.css";

interface SearchBarProps {
  onSearch: (query: string, type: "title" | "actor") => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"title" | "actor">("title");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, type);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("", type);
  };

  return (
    <form onSubmit={handleSubmit} className="searchbar-form">
      <div>
        <input
          type="text"
          placeholder={
            type === "title" ? "Search by title..." : "Search by actor..."
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="modal-input"
        />
        <Select
          label=""
          value={type}
          options={["title", "actor"]}
          onChange={(e) => setType(e.target.value as "title" | "actor")}
          className="modal-input"
        />
      </div>

      <div className="searchbar-buttons">
        <Button type="submit">Search</Button>
        {query && (
          <Button type="button" onClick={handleClear} variant="danger">
            ✕ Clear
          </Button>
        )}
      </div>
    </form>
  );
};
