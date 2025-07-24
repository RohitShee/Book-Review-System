import { Star } from "lucide-react";

export default function ReviewsSection({ reviews }) {
  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Reviews ({reviews.length})</h2>

      {reviews.map((review, idx) => (
        <div
          key={idx}
          className="border p-4 rounded-md shadow-sm bg-white mb-4"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold">{review.userId.name}</h3>
            <div className="flex items-center text-yellow-500">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" stroke="none" />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            {new Date(review.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-700 text-sm">{review.review_text}</p>
        </div>
      ))}
    </section>
  );
}
