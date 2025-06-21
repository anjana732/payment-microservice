import express from "express"

import {processPayement} from "../controllers/payment.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/process', authMiddleware, processPayement);

export default router;

