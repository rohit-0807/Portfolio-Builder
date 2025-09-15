import mongoose, { mongo } from "mongoose";

const otpSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    code: {type: String, required: true},
    purpose: {type: String, required: true},
    payload: {type: String},
    expiresAt: { type: Date, required: true }
});

export default mongoose.model('Otp', otpSchema);