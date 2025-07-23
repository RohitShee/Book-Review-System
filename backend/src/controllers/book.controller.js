import Book from "../models/book.model.js";

export const addBook = async (req, res) => {
    const { title, author, genre } = req.body;
    try {
        const user = req.user;
        if (!title || !author || !genre) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if(!user) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        const existingBook = await Book.findOne({ title,author });
        if (existingBook) {
            return res.status(400).json({ message: "Book already exists" });
        }
        const book = new Book({
            title,
            author,
            genre
        });
        await book.save();
        return res.status(201).json({ message: "Book added successfully", book });
    } catch (error) {
        console.log("Error in addBook controller:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllBooks = async (req,res) =>{
    try {
        const books = await Book.find();
        return res.status(200).json({ books });
    } catch (error) {
        console.log("Error in getAllBooks controller:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getBookById = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ book });
    } catch (error) {
        console.log("Error in getBookById controller:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}