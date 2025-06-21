import stripeGateway from "../gateways/stripe.gateway.js";
import razorpayGateway from "../gateways/razorpay.gateway.js";
import order from "../../../models/order.model.js";
import {logger} from "../../../utils/logger.js"

const paymentManager = {
    processCreatePayment: async (gateway, userId, amount, currency, paymentDetails = {})=>{
        switch(gateway){
            
            case 'stripe': 
                const stripeDetails = await stripeGateway.createPaymentIntent(
                    amount,
                    currency,
                    paymentDetails.paymentMethodId,
                    paymentDetails.customerId
                )
                 try {
                    const stripeOrder = await order.create({
                        paymentGateway: gateway,
                        userId,
                        amount,
                        currency,
                        paymentIntent: stripeDetails.id
                    })
                    logger.info(`order created`, stripeOrder);
                } catch (error) {
                    logger.error(`Cannot create order`, error);
                }
               
                return stripeDetails;
            case 'razorpay':
                const razorpayDetail = await razorpayGateway.createOrder(
                    amount,
                    currency,
                )

                try {
                    const stripeOrder = await order.create({
                        paymentGateway: gateway,
                        userId,
                        amount,
                        currency,
                        paymentIntent: razorpayDetail.id
                    })
                    logger.info(`order created`, stripeOrder);
                } catch (error) {
                    logger.error(`Cannot create order`, error);
                }
                return razorpayDetail;
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