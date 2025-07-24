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

export const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 9, author, genre, title } = req.query;

    const filters = {};

    if (author) {
      filters.author = { $regex: new RegExp(author, 'i') }; // case-insensitive match
    }

    if (genre) {
      filters.genre = genre; // exact match
    }

    if (title) {
      filters.title = { $regex: new RegExp(title, 'i') }; // case-insensitive partial match
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const books = await Book.find(filters)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(filters);

    return res.status(200).json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalBooks: total
    });

  } catch (error) {
    console.error("Error in getAllBooks controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


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