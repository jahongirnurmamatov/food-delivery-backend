import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator';


export const login =async(req,res,next)=>{
    try {
        const {email,password} =req.body;
        const user = await User.findOne({email});
        if(!user) return res.json({success:false,message:"Invalid credentials!"})
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.json({success:false,message:"Invalid credentials!"})
        const token = createToken(user._id);
        res.status(200).json({success:true, token});
    } catch (error) {
        res.json({success:false,message:error})
    }
}

export const register =async(req,res,next)=>{
    try {
        const {name,password, email} =req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.json({success:false,message:"User email is already registered"})
        };
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter valid email!"})
        }
        if(password.length<6){
            return  res.json({success:false,message:"Password length must be more than 6 characters!"})
        }
        const salt= await bcrypt.genSalt(10);
        const hashedPass= bcrypt.hashSync(password,salt)
        const newUser=new User({
            name,
            email, 
            password:hashedPass
        });
        await newUser.save();
        const token = createToken(newUser._id);
        res.status(201).json({success:true,token});

    } catch (error) {
        res.json({success:false, message:error})
    }
}
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}