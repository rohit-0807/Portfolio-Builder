import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../modules/user.js';
import User from '../modules/user.js';

const router = express.Router();

router.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const User = await user.findOne({email});
    if(!User) {
        return res.status(404).json({message : "user not find"});
    }

    const isMatch = await bcrypt.compare(password, User.password);
    if(!isMatch) {
        return res.status(401).json({message : " invalid password"})
    }
})