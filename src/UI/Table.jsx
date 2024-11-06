import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Filter from "./Filter";

const Table = () => {
  const [filterParams, setFilterParams] = useState({ title: "", author: "" });
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, totalPages, error } = useFetch(filterParams, page, limit);

  const handleFilterChange = (key, value) => {
    setFilterParams((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div>
      <Filter filterParams={filterParams} onFilterChange={handleFilterChange} />
      <table className="language-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan="3">Error: {error}</td>
            </tr>
          ) : data.length > 0 ? (
            data.map((book) => (
              <tr key={book.key}>
                <td>{book.title}</td>
                <td>{book.author_name?.join(", ") || "Unknown"}</td>
                <td>{book.first_publish_year || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No results found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
