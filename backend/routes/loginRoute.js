import express from 'express';
import bycrypt from 'bcrypt';

import user from '../modules/user.js';
const Router = express.Router();

Router.post('/', async (req, res) => {
   try {
     const {email, password } = req.body;
     if (!email || !password) {
       return res.status(400).json({error: "Please fill all the fields"});
     }

   } catch(err) {
    console.error(err.message);
    res.status(500).json({error : "somting wrong"});
   }

});

export default Router;