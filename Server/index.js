import express from "express";
import cors from "cors";
import dotenv from "dotenv";  // to load environment variables from .env
import cookieParser from "cookie-parser";
import connectDatabase from './Db/Database.js';
import TSB from './routes/authRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;
connectDatabase();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

// API End-Points
app.get('/', (req, res) => {
    res.send("Completely Working Buddy");
});

app.use('/api/auth', TSB);

app.listen(port, () => {
    console.log(`Server is Running On Port No. ${port}`);
});
