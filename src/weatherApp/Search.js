import React, { useState } from "react";

export function Search({ query, setQuery }) {
  return (
    <div className="search-box">
      <input
        className="search"
        type="text"
        placeholder="Search wheather..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
