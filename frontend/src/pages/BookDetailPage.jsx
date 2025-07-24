import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useBookStore from "../stores/useBookStore";
import { Star, MessageSquare, ArrowLeft } from "lucide-react";
import AddReview from "../components/AddReview";
import { useState } from "react";
import useReviewStore from "../stores/useReviewStore";
import ReviewsSection from "../components/ReviewsSection";

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById, book, loading } = useBookStore();
  const {reviews, getReviewsByBookId,avg_rating,reviewLoading} = useReviewStore();
  const[reviewing,setReviewing]=useState(false);
  useEffect(() => {
    getBookById(id);
    getReviewsByBookId(id);
  }, [id]);

  if (loading || reviewLoading || !book) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 p-2 border-1 flex items-center text-m rounded-lg text-gray-600 hover:underline"
      >
        <ArrowLeft size={16} className="mr-1"  />
        Back to Library
      </button>

      <div className="bg-[#fbf9f6] p-6 rounded-xl max-h-96 shadow-md flex flex-col md:flex-row gap-6">
        <img
          src={`/book${Math.floor(Math.random() * 10)}.jpg`}
          alt={book.title}
          className="w-full md:w-1/3 rounded object-cover"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">{book.title}</h1>
          <p className="text-gray-700 mb-2">
            by <span className="font-medium">{book.author}</span>
          </p>

          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {book.genre}
          </span>

          <div className="flex items-center gap-2 mb-4">
            <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
            <span className="font-semibold">{avg_rating || "N/A"}</span>
            <span className="flex items-center text-sm text-gray-500 ml-2">
              <MessageSquare className="w-4 h-4 mr-1" /> {reviews.length} reviews
            </span>
          </div>


          <button 
          className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded shadow"
          onClick={() => setReviewing(prev => !prev)}
          >
            {!reviewing ? "Write a Review" : "Close Review Form"}
          </button>
        
        </div>
      </div>
    </div>
    {reviewing && (  
        <AddReview book={book} reviewing={reviewing} setReviewing={setReviewing} />
    )}
    <div className="max-w-6xl mx-auto px-4 py-8">
    <ReviewsSection reviews={reviews} />
    </div>
    
    </>
    
  );
}
