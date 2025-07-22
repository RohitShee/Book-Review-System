import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { addBook, getAllBooks, getBookById } from "../controllers/book.controller.js";
const router = Router();

router.post("/add-book",protectRoute,addBook);
router.get("/all-books",protectRoute,getAllBooks);
router.get("/book/:id",protectRoute,getBookById);

export default router;