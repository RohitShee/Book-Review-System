import { useState } from "react";
import { Star } from "lucide-react"; 
import useReviewStore from "../stores/useReviewStore";

export default function ReviewForm({ book,reviewing, setReviewing }) {
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  
  const { addReview } = useReviewStore();

  const handleSubmit = async() => {
    if (  !rating || !review) return;
    await addReview({
      bookId: book._id,
      rating,
      reviewText : review
    });   
    setRating(0);
    setReview("");
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Write a Review for "{book.title || 'Book'}"
      </h2>


      <label className="block mb-2 font-medium">Rating *</label>
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className={`h-6 w-6 cursor-pointer ${
              (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
            }`}
            fill={(hover || rating) >= star ? "#facc15" : "none"}
          />
        ))}
        <span className="ml-2 text-sm text-gray-500">Select a rating</span>
      </div>

      <label className="block mb-2 font-medium">Your Review *</label>
      <textarea
        rows={3}
        value={review}
        onChange={e => setReview(e.target.value)}
        placeholder="Share your thoughts about this book..."
        className="w-full border rounded px-4 py-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          Submit Review
        </button>
      </div>

    </div>
  );
}
