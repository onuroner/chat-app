import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import {connectDB} from "./lib/db.js"
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //allow you to extract the json data out of body
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}
));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, ()=> {
    console.log('Server is listening on port ' + PORT);
    connectDB();
});