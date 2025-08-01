import jwt from 'jsonwebtoken';
import User from '../modules/user.js';

const protect = async (req, res, next) => {
    let token;
    // console.log("Request headers:", req.headers);
    if(
        req.headers.authorization && req.headers.authorization.startsWith('zoro')
    ){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({ message: 'Not authorized, no access' });
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }catch(error){
        res.status(401).json({message: "Invalid token, authorization failed"});
    }
    
}

export default protect;