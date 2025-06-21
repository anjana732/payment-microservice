import express from "express"

import {processCreatePayement} from "../controllers/payment.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/process', authMiddleware, processCreatePayement);

export default router;

