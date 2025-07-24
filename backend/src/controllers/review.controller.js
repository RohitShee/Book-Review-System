import Review from "../models/review.model.js";
import User from "../models/user.model.js";
export const addReview = async(req , res) =>{
    const { bookId, reviewText, rating } = req.body;
    const user = req.user;
    try {
        if(!user){
            return res.status(401).json({ message: "Unauthorized access" });
        }
        if(!bookId || !reviewText || !rating){
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingReview = await Review.findOne({ bookId, userId: user._id });
        if(existingReview){
            return res.status(400).json({ message: "You have already reviewed this book" });
        }
        const review = new Review({
            bookId,
            userId: user._id,
            review_text: reviewText,
            rating
        });
        await review.save();
        return res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        console.log("Error in addReview controller:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getReviewsByBookId = async(req, res) => {
    const { bookId } = req.params;
    try {
        if(!bookId){
            return res.status(400).json({ message: "Book ID is required" });
        }
        const reviews = await Review.find({ bookId }).populate('userId', 'name email');
        if(reviews.length === 0){
            return res.status(404).json({ message: "No reviews found for this book" });
        }
        const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
        return res.status(200).json({ reviews , avg_rating: avgRating });
    } catch (error) {
        console.log("Error in getReviewsByBookId controller:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}