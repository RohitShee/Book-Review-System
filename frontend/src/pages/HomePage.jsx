// pages/Home.jsx
import { Plus, Filter } from "lucide-react";
import { Link } from "react-router-dom";
const dummyBooks = [
  {
    title: "1984",
    author: "George Orwell",
    genre: "Science Fiction",
    rating: 4.2,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1588776814546-ec7f963d7ba3",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    rating: 4.0,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    rating: 4.1,
    reviews: 23,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
];

export default function Home() {
  return (
    <div className="px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Book Library</h1>
        <p className="text-gray-600">Discover and review amazing books</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search books or authors..."
          className="border rounded px-4 py-2 w-full sm:w-64"
        />

        {/* Genre filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select className="border rounded px-3 py-2 text-sm">
            <option>All Genres</option>
            <option>Fiction</option>
            <option>Science Fiction</option>
            <option>Non-fiction</option>
          </select>
        </div>

        {/* Sort */}
        <select className="border rounded px-3 py-2 text-sm">
          <option>Title A-Z</option>
          <option>Title Z-A</option>
          <option>Rating High-Low</option>
          <option>Rating Low-High</option>
        </select>

        {/* Add Book */}
        <Link to="/add-book" className="flex items-center gap-1 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 text-sm">
          <Plus className="w-4 h-4" /> Add Book
        </Link>
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyBooks.map((book, i) => (
          <div key={i} className="bg-white shadow rounded overflow-hidden">
            <img src={book.image} alt={book.title} className="h-64 w-full object-cover" />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{book.title}</h2>
              <p className="text-sm text-gray-600">by {book.author}</p>

              <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                {book.genre}
              </span>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1 text-orange-400 text-sm">
                  {"★".repeat(Math.round(book.rating))}
                  {"☆".repeat(5 - Math.round(book.rating))}
                </div>
                <span className="text-gray-500 text-xs">{book.reviews} reviews</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
