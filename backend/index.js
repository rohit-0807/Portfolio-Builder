import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import signRoute from './routes/signupRoute.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send("server is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/signup', signRoute);