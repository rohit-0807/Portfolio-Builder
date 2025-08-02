import express from 'express';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../modules/user.js';
import dotenv from 'dotenv';

const Router = express.Router();

Router.post('/', async (req, res) => {
   try {
     const {email, password } = req.body;
     if (!email || !password) {
       return res.status(400).json({error: "Please fill all the fields"});
     }
     const existingUser = await user.findOne({email});
     if(!existingUser) {
        return res.status(400).json({error: "User not found"});
     }

     const isMatch = await bycrypt.compare(password, existingUser.password);
     if(!isMatch) {
        return res.status(400).json({message: "invalid credentials"});
        } 

        const token = jwt.sign(
            {id: existingUser._id},
            process.env.SECRET_KEY,
            {expiresIn: '3h'}
        );
        
        res.status(200).json({ token, 
            user : {
                id: existingUser._id,
                name : existingUser.name,
                email: existingUser.email,
            },
        });

     } catch(err) {
    console.error(err.message);
    res.status(500).json({error : "somting wrong"});
   }

});

export default Router;