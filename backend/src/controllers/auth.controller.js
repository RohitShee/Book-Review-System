import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/token.js';
export const Signup = async (req,res) =>{
    const {name, email, password} = req.body;
    try {
        if(!name || !email || !password){
            return res.staus(400).json({message: "All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        if(user){
            generateToken(user._id, res);
            await user.save();
            res.status(201).json({message: "User created successfully"});
        }else{
            return res.status(400).json({message: "failed to create user"});
        }  
        
    } catch (error) {
        console.log("Error in Signup controller:", error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const Login = async (req,res) =>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        generateToken(user._id, res);
        return res.status(200).json({
            message: "Login successful"
        });
    } catch (error) {
        console.log("Login controller error: ", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const logout = async (req,res)=>{
   try {
    res.cookie('jwt','',{maxAge: 0})
    res.status(200).json({'message':'Logged out Successfully'})
   } catch (error) {
    console.log('login controller error: ',error.message);
    return res.status(500).json({'message' : 'Internal Server Error'})
   }
}

export const checkAuth = async(req,res) =>{
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log('checkAuth controller error: '+error)
        return res.status(500).json({'message' : 'Internal Server Error'})
    }
}