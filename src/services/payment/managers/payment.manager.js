import stripeGateway from "../gateways/stripe.gateway.js";
import razorpayGateway from "../gateways/razorpay.gateway.js";

const paymentManager = {
    processPayment: async (gateway, amount, currency, orderId, paymentDetails = {})=>{
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

    refundPayment: async (gateway, paymentId, amount) => {
        switch(gateway) {
            case 'stripe' :
                return stripeGateway.createRefund(paymentId, amount);
            case 'razorpay':
                return razorpayGateway.createRefund(paymentId, amount);
            default: 
                throw new Error('Invalid payment gateway specified for refund.');
        }
    },
}

export default paymentManager;