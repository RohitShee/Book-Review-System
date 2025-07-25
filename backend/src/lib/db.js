import mongoose from 'mongoose';

export const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(e){
        console.error(`DataBase connection Error: ${e.message}`);
    }
}