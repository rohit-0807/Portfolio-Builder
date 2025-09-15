import express from 'express';
import Otp from '../modules/otp.js';
import { sendOtpEmail } from '../utils/sendOtpEmail.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/request-otp',protect, async(req,res)=>{
    try{
        const {newEmail} = req.body;
        if(!newEmail){
            return res.status(400).json({message: "New email is required"});
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString(); // gives 6 digit OTP
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        await Otp.create({
            user: req.user._id,
            code,
            purpose: 'profile-update',
            payload: newEmail,
            expiresAt
        });

        await sendOtpEmail(req.user.email, code);

        return res.json({message: "OTP sent to your email"});

    }catch(err){
        console.error(err);
        return res.status(500).json({message: "failed to send OTP"});;
    }
});

export default router;