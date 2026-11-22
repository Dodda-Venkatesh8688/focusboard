import { Search, X } from "lucide-react";

export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-box">
      <Search size={17} className="search-icon" aria-hidden="true" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks by title..."
        aria-label="Search tasks by title"
        className="search-input"
      />
      {searchQuery && (
        <button
          type="button"
          className="clear-search-btn"
          onClick={() => onSearchChange("")}
          aria-label="Clear search query"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}