import paymentManager from "../services/payment/managers/payment.manager.js";
import stripeWebhook from "../services/payment/webhooks/stripe.webhook.js";
import razorpayWebhook from "../services/payment/webhooks/razorpay.webhook.js";
import { logger } from "../utils/logger.js";
import order from "../models/order.model.js";

const processPayement = async (req, res, next) => {
    const {amount, currency, gateway, orderId, paymentDetails} = req.body;

    if(!amount || !currency || !gateway || !orderId){
        logger.warn(`Validation Error: Missing required payment details`);
        return res.status(400).json({
            success: false,
            message: 'Missing required payment details'
        })
    }

    try {

        const result = await paymentManager.processPayment(
            gateway,
            amount,
            currency,
            orderId,
            paymentDetails
        )

          res.status(200).json({
            success: true,
            message: 'Payment initiation successful. Awaiting payment completion via webhook.',
            data: result
        });
    } catch (error) {
        logger.error(`Error in paymentController.processPayment for gateway ${gateway}:`, error);
        next(error);
    }
}

const handleStripeWebhook = (req, res) =>{
    stripeWebhook(req, res);
}

const handleRazorPayWebhook = (req, res) => {
    razorpayWebhook(req, res);
}

export {
    processPayement,
    handleStripeWebhook,
    handleRazorPayWebhook
}