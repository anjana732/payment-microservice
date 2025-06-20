import express from 'express';
import dotenv from 'dotenv';
import cors from  'cors';
import paymentRoute from "./routes/payment.route.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/payment',paymentRoute);

export default app;
