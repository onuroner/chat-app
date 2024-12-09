import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import {connectDB} from "./lib/db.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //allow you to extract the json data out of body
app.use("/api/auth", authRoutes);

app.listen(PORT, ()=> {
    console.log('Server is listening on port ' + PORT);
    connectDB();
});