import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
    }
));
app.use(cookieParser());
connectDB();

app.listen(port,()=>{
    console.log("Server is running on port ",port);
})
