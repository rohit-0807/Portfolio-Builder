import express from 'express';
import bcrypt from 'bcrypt';
import User from '../modules/user.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.patch('/', protect, async (req, res) => {
  try {
    const allowedFields = ['name', 'email','password'];
    const updates = {};

    allowedFields.forEach(field => {
      if (req.body[field]) updates[field] = req.body[field];
    });

    if (updates.email) {
      const existing = await User.findOne({ email: updates.email, _id: { $ne: req.user._id } });
      if (existing) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

export default router;