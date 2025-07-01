import express from 'express';
// const user = require('../modules/user');
import user from '../modules/user.js';
const Router = express.Router();

Router.post('/', async (req, res) => {
   try {
     const { name, email, password } = req.body;

    const newUser = new user({name,email,password});
    await newUser.save();
    res.status(200).json({message : "user created" , User : newUser});
   } catch(err) {
    console.error(err.message);
    res.status(500).json({error : "somting wrong"});
   }

});

export default Router;
