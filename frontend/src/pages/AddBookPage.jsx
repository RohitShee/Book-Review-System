// pages/AddBook.jsx
import { useState } from "react";
import { genres } from "../lib/genre";
import useBookStore from "../stores/useBookStore";
export default function AddBookPage() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
  });

  const {loading,addBook} = useBookStore();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook(form);
    setForm({
      title: "",
      author:"",
      genre : "",
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-md rounded-xl border">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Add New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-600">Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Author *</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Genre *</label>
          <select
            name="genre"
            value={form.genre}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
            <option value="">Select genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
            </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-400 to-teal-400 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
