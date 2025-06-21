import Stripe from "stripe";
import config from "../../../config/payment.config.js";

const stripe = Stripe(config.stripe.secretKey, {
    apiVersion: '2022-11-15',
});

const stripeGateway = {
    createPaymentIntent: async (amount,currency,orderId, paymentMethodId, customerId) => {
        
        const params = {
            amount: Math.round(amount * 100),
            currency: currency,
            description: `Order ${orderId}`,
            metadata: {order_id: orderId},
            // confirm: true,
            // off_session: true
        };

        if(paymentMethodId) params.payment_method = paymentMethodId;
        if(customerId) params.customer = customerId;

        return stripe.paymentIntents.create(params);
    },

    retrievePaymentIntent: async (paymentIntentId) => {
        return stripe.paymentIntents.retrieve(paymentIntentId);
    }
};

export default stripeGateway;