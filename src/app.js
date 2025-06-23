import express from 'express';
import dotenv from 'dotenv';
import cors from  'cors';
import paymentRoute from "./routes/payment.route.js"
import swaggerDocument from '../swagger/swagger.js';
import swaggerUi from 'swagger-ui-express';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/payment',paymentRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
