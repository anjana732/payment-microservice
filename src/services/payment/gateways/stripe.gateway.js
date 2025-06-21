// import Stripe from "stripe";
// import config from "../../../config/payment.config.js";

// const stripe = Stripe(config.stripe.secretKey, {
//     apiVersion: '2022-11-15',
// });

// const stripeGateway = {
//     createPaymentIntent: async (amount,currency,orderId, paymentMethodId, customerId) => {

//         const params = {
//             amount: Math.round(amount * 100),
//             currency: currency,
//             description: `Order ${orderId}`,
//             metadata: {order_id: orderId},
//             // confirm: true,
//             // off_session: true
//         };

//         if(paymentMethodId) params.payment_method = paymentMethodId;
//         if(customerId) params.customer = customerId;

//         return stripe.paymentIntents.create(params);
//     },

//     retrievePaymentIntent: async (paymentIntentId) => {
//         return stripe.paymentIntents.retrieve(paymentIntentId);
//     }
// };

// export default stripeGateway;
import Stripe from "stripe";
import config from "../../../config/payment.config.js";

const stripe = new Stripe(config.stripe.secretKey, {
    apiVersion: '2022-11-15',
});

const stripeGateway = {
    // 1. Create Payment Intent
    createPaymentIntent: async (amount, currency, userId, paymentMethodId, customerId) => {
        const params = {
            amount: Math.round(amount * 100),
            currency: currency,
            description: `Order ${userId}`,
            metadata: { order_id: userId },
            // confirm: true, // Optional
            // off_session: true // Optional for subscriptions
        };

        if (paymentMethodId) params.payment_method = paymentMethodId;
        if (customerId) params.customer = customerId;

        return stripe.paymentIntents.create(params);
    },

    retrievePaymentIntent: async (paymentIntentId) => {
        return stripe.paymentIntents.retrieve(paymentIntentId);
    },

    // 3. Capture Payment (for manually authorized flows)
    capturePayment: async (paymentIntentId) => {
        return stripe.paymentIntents.capture(paymentIntentId);
    },

    // 4. Cancel Payment (only if not yet confirmed)
    cancelPayment: async (paymentIntentId) => {
        return stripe.paymentIntents.cancel(paymentIntentId);
    },

    // 5. Create Refund (can be full or partial)
    createRefund: async (paymentIntentId, amount) => {
        const params = {
            payment_intent: paymentIntentId,
        };
        if (amount) {
            params.amount = Math.round(amount * 100);
        }
        return stripe.refunds.create(params);
    }
};

export default stripeGateway;
