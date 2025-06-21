import stripeGateway from "../gateways/stripe.gateway.js";
import razorpayGateway from "../gateways/razorpay.gateway.js";

const paymentManager = {
    processCreatePayment: async (gateway, amount, currency, orderId, paymentDetails = {})=>{
        switch(gateway){
            case 'stripe': 
                return stripeGateway.createPaymentIntent(
                    amount,
                    currency,
                    orderId,
                    paymentDetails.paymentMethodId,
                    paymentDetails.customerId
                );
            case 'razorpay':
                return razorpayGateway.createOrder(
                    amount,
                    currency,
                    orderId,
                    paymentDetails.notes
                );
            default: 
                throw new Error('Invalid payment gateway specified');
        }
    },

    processRefundPayment: async (gateway, paymentId, amount) => {
        switch(gateway) {
            case 'stripe' :
                return stripeGateway.createRefund(paymentId, amount);
            case 'razorpay':
                return razorpayGateway.createRefund(paymentId, amount);
            default: 
                throw new Error('Invalid payment gateway specified for refund.');
        }
    },

    processCancelPayment: async (gateway, paymentId) => {
        switch(gateway){
            case 'stripe' :
                return stripeGateway.cancelPayment(paymentId);
            case 'razorpay' :
                return razorpayGateway.markOrderExpired(paymentId);
            default: 
                throw new Error('Invalid payment gateway specified for refund.');
        }
    },

    processCapturePayment: async (gateway, paymentId) => {
        switch(gateway){
            case 'stripe' : 
                return stripeGateway.capturePayment(paymentId);
            case 'razorpay' :
                return razorpayGateway.capturePayment(paymentId);
            default: 
                throw new Error('Invalid payment gateway specified for refund.');
        }
    },

    processRetrievePayment : async (gateway, paymentId) => {
        switch(gateway) {
            case 'stripe':
                return stripeGateway.retrievePaymentIntent(paymentId);
            case 'razorpay' : 
                return razorpayGateway.retrievePayment(paymentId);
            default: 
                throw new Error('Invalid payment gateway specified for refund.');
        }
    }


}

export default paymentManager;