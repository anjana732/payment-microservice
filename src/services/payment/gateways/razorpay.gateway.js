// import Razorpay from "razorpay";
// import config from "../../../config/payment.config.js"

// const razorpay = new Razorpay({
//     key_id: config.razorpay.keyId,
//     key_secret: config.razorpay.keySecret,
// })

// const razorpayGateway = {
//     createOrder: async (amount, currency, orderId, notes={}) => {
//         const options ={
//             amount: Math.round(amount *100),
//             currency: currency,
//             receipt: `receipt_${orderId || Date.now()}`,
//             payment_capture: 1,
//             notes: {...notes, order_id: orderId},
//         }
//         return razorpay.orders.create(options);
//     },

//     capturePayment: async(paymentId, amount) => {
//         return razorpay.payments.capture(paymentId, Math.round(amount * 100));
//     }
// }

// export default razorpayGateway;



import Razorpay from "razorpay";
import config from "../../../config/payment.config.js";

const razorpay = new Razorpay({
    key_id: config.razorpay.keyId,
    key_secret: config.razorpay.keySecret,
});

const razorpayGateway = {
 
    createOrder: async (amount, currency, orderId, notes = {}) => {
        const options = {
            amount: Math.round(amount * 100), // in paise
            currency: currency,
            receipt: `receipt_${orderId || Date.now()}`,
            payment_capture: 1,
            notes: { ...notes, order_id: orderId },
        };
        return razorpay.orders.create(options);
    },

 
    capturePayment: async (paymentId, amount) => {
        return razorpay.payments.capture(paymentId, Math.round(amount * 100));
    },

   
    retrievePayment: async (paymentId) => {
        return razorpay.payments.fetch(paymentId);
    },

    createRefund: async (paymentId, amount) => {
        const refundPayload = { payment_id: paymentId };
        if (amount) {
            refundPayload.amount = Math.round(amount * 100); // partial refund
        }
        return razorpay.refunds.create(refundPayload);
    },

    retrieveRefund: async (refundId) => {
        return razorpay.refunds.fetch(refundId);
    },

    retrieveOrder: async (orderId) => {
        return razorpay.orders.fetch(orderId);
    },
    markOrderExpired: async (orderId) => {
       
        return { status: "expired_locally", orderId };
    },
};

export default razorpayGateway;
