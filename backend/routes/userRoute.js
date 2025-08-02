import express from 'express';
// import user from '../models/userModel.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
    try{
        res.status(200).json(req.user);
    }catch(error){
        res.status(500).json({ message: 'Error fetching user profile' });
    }
})

export default router;