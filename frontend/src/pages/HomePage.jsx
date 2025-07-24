import { useEffect, useState } from "react";
import { Plus, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import useBookStore from "../stores/useBookStore";
import { genres } from "../lib/genre";
import BookCard from "../components/BookCard";
import useReviewStore from "../stores/useReviewStore";
export default function HomePage() {
  const {
    books,
    loading,
    getAllBooks,
    totalPages,
    currentPage,
  } = useBookStore();
  const {clearReviews} = useReviewStore();
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    genre: "",
    page: 1,
    limit: 9,
  });

  useEffect(() => {
    getAllBooks(filters);
    clearReviews();

  }, [filters]);

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handlePageChange = (direction) => {
    setFilters((prev) => ({
      ...prev,
      page: direction === "next" ? prev.page + 1 : prev.page - 1,
    }));
  };

  return (
    <div className="px-8 py-6">

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
        <input
          type="text"
          name="title"
          placeholder="Search by title..."
          value={filters.title}
          onChange={handleInputChange}
          className="border rounded px-4 py-2 w-full sm:w-48"
        />
        <input
          type="text"
          name="author"
          placeholder="Search by author..."
          value={filters.author}
          onChange={handleInputChange}
          className="border rounded px-4 py-2 w-full sm:w-48"
        />
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            name="genre"
            value={filters.genre}
            onChange={handleInputChange}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">All Genres</option>
            {
              genres.map((genre)=>{
                return (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                );
              })
            }
          </select>
        </div>
        <Link
          to="/add-book"
          className="flex items-center gap-1 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 text-sm"
        >
          <Plus className="w-4 h-4" /> Add Book
        </Link>
      </div>

      {/* Book Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, i) => (
            <BookCard key={i} book={book} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={filters.page <= 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
