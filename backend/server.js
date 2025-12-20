import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './routes/authRoutes.js';
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
app.use("/api/auth", router );
app.use("/api/users", router);

connectDB();

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`); 
});