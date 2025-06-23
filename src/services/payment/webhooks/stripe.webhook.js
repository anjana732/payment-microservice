import Stripe from "stripe";
import config from "../../../config/payment.config.js"
import { logger } from "../../../utils/logger.js";

const stripe = Stripe(config.stripe.secretKey);
const webhookSecret = Stripe(config.stripe.webhookSecret);

const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        logger.info('Event captured');
    } catch (error) {
        logger.error(`Stripe Webhook Error: ${error.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

     switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('Stripe PaymentIntent was successful:', paymentIntent.id);
         
            break;
        case 'payment_intent.payment_failed':
            const failedPaymentIntent = event.data.object;
            console.log('Stripe PaymentIntent failed:', failedPaymentIntent.id, failedPaymentIntent.last_payment_error);
            break;
        default:
             console.log(`Unhandled Stripe event type ${event.type}`);
    }

        res.json({ received: true });
}

export default stripeWebhook;