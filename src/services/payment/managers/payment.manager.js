import stripeGateway from "../gateways/stripe.gateway.js";

const paymentManager = {
    processPayment: async (gateway, amount, currency, OrderId, paymentDetails = {})=>{
        switch(gateway){
            case 'stripe': 
                return stripeGateway.createPaymentIntent(
                    amount,
                    currency,
                    OrderId,
                    paymentDetails.paymentMethodId,
                    paymentDetails.customerId
                );
            case 'razorpay':
                return '';
            default: 
                throw new Error('Invalid payment gateway specified');
        }
    },

    refundPayment: async (gateway, paymentId, amount) => {
        switch(gateway) {
            case 'stripe' :
                return stripeGateway.createRefund(paymentId, amount);
            case 'razorpay':
                return '';
            default: 
                throw new Error('Invalid payment gateway specified for refund.');
        }
    },
}

export default paymentManager;