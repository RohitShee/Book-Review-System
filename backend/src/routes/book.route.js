import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addBook, getAllBooks, getBookById } from "../controllers/book.controller.js";
const router = Router();

router.post("/add-book",protectRoute,addBook);
router.get("/all-books",protectRoute,getAllBooks);
router.get("/:id",protectRoute,getBookById);

export default router;