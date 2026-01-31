import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { axiosConfig } from './config/axios.js';
import './config/passport.js';
import authRouter from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; 
import eventRouter from './routes/eventRoutes.js';
import counselorRouter from './routes/counselorRoutes.js';
import { isAuthenticated } from './middleware/isAuthenticated.js';


dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(`[DEBUG] Incoming Request: ${req.method} ${req.url}`);
    console.log(`[DEBUG] Origin Header: ${req.headers.origin}`);
    console.log(`[DEBUG] Cookies received:`, req.cookies); 
    next();
});

app.use("/api/auth", authRouter );
app.use("/api/users", authRouter);
app.use('/api/admin', adminRoutes);
app.use("/api/events", eventRouter);
app.use("/api/counselor", isAuthenticated, counselorRouter);

connectDB();
axiosConfig();

app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server started at port ${PORT}`); 
});