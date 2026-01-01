import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { axiosConfig } from './config/axios.js';
import authRouter from './routes/authRoutes.js';
import eventRouter from './routes/eventRoutes.js';
import './config/passport.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter );
app.use("/api/users", authRouter);
app.use("/api/events", eventRouter);

connectDB();
axiosConfig();

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`); 
});