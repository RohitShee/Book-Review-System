import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  const randomImage = `/book${Math.floor(Math.random() * 10)}.jpg`;
  return (
    <div className="bg-white shadow rounded overflow-hidden flex flex-col">
      <img
        src={randomImage}
        alt={book.title}
        className="h-64 w-full object-cover"
      />
      <div className="flex justify-between ">
        <div className="p-4 flex flex-col flex-grow">
            <h2 className="font-semibold text-lg">{book.title}</h2>
            <p className="text-sm text-gray-600">by {book.author}</p>
            <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded w-fit">
                {book.genre}
            </span>
        </div>
        <div className="p-2 flex items-center">
          <Link
            to={`/book/${book._id}`}

            className="inline-block bg-teal-500 text-white text-sm px-4 py-2 rounded hover:bg-teal-600 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
