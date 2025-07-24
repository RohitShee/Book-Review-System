import Router from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { addReview, getReviewsByBookId } from '../controllers/review.controller.js';
const router = Router();

router.post('/add-review', protectRoute, addReview);
router.get('/reviews/:bookId', protectRoute, getReviewsByBookId);

export default router;