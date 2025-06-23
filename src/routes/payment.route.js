import express from "express"

import {processCreatePayement,   
        processRetrievePayment,
        processCapturePayment,
        processCancelPayment,
        handleStripeWebhook,
        handleRazorPayWebhook} from "../controllers/payment.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/process-create', authMiddleware, processCreatePayement);
router.post('/process-retrieve', authMiddleware, processRetrievePayment);
router.post('/process-capture', authMiddleware, processCapturePayment);
router.post('/process-cancel', authMiddleware, processCancelPayment);
router.post('/process-stripewebhook', handleStripeWebhook);
router.post('/process-razorpaywebhook', handleRazorPayWebhook);

export default router;

