import paymentManager from "../services/payment/managers/payment.manager.js";
import stripeWebhook from "../services/payment/webhooks/stripe.webhook.js";
import razorpayWebhook from "../services/payment/webhooks/razorpay.webhook.js";
import { logger } from "../utils/logger.js";


const processCreatePayement = async (req, res, next) => {
    const {amount, currency, gateway, paymentDetails} = req.body;
    const userId = req.user?.id;
    console.log('user id is: ',userId);

    if(!amount || !currency || !gateway){
        logger.warn(`Validation Error: Missing required payment details`);
        return res.status(400).json({
            success: false,
            message: 'Missing required payment details'
        })
    }

    try {

        const result = await paymentManager.processCreatePayment(
            gateway,
             userId,
            amount,
            currency,
            // orderId,
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

const processRetrievePayment = async (req, res, next)=>{
     const {gateway, paymentIntent} = req.body;

     if(!gateway || !paymentIntent){
        logger.warn(`Validation Error: Missing required payment details`);
        return res.status(400).json({
            success: false,
            message: 'Missing required payment details'
        })
     }

     try {
        const result = await paymentManager.processRetrievePayment(gateway, paymentIntent);
        res.status(200).json({
            success: true,
            message: 'Payment retrival successful.',
            data: result
        });
     } catch (error) {
        logger.error(`Error in paymentController.paymentManager.processRetrievePayment for gateway ${gateway}:`, error);
        next(error);
     }

}

const processCapturePayment = async (req, res, next)=>{
     const {gateway, paymentIntent} = req.body;

     if(!gateway || !paymentIntent){
        logger.warn(`Validation Error: Missing required payment details`);
        return res.status(400).json({
            success: false,
            message: 'Missing required payment details'
        })
     }

     try {
        const result = await paymentManager.processCapturePayment(gateway, paymentIntent);
        res.status(200).json({
            success: true,
            message: 'Payment capture successful.',
            data: result
        });
     } catch (error) {
        logger.error(`Error in paymentController.paymentManager.processCancelPayment for gateway ${gateway}:`, error);
        next(error);
     }

}


const processCancelPayment = async (req, res, next)=>{
     const {gateway, paymentIntent} = req.body;
     const userId = req.user?.id;

     if(!gateway || !paymentIntent){
        logger.warn(`Validation Error: Missing required payment details`);
        return res.status(400).json({
            success: false,
            message: 'Missing required payment details'
        })
     }

     try {
        const result = await paymentManager.processCancelPayment(gateway, paymentIntent, userId);
        res.status(200).json({
            success: true,
            message: 'Payment cancel successful.',
            data: result
        });
     } catch (error) {
        logger.error(`Error in paymentController.paymentManager.processCancelPayment for gateway ${gateway}:`, error);
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
    processCreatePayement,
    processRetrievePayment,
    processCapturePayment,
    processCancelPayment,
    handleStripeWebhook,
    handleRazorPayWebhook
}