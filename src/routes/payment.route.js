import express from "express"

import {processPayement} from "../controllers/payment.controller.js"

const router = express.Router();

router.post('/process', processPayement);

export default router;

