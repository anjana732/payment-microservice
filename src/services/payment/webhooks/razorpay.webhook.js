import config from "../../../config/payment.config.js"
import crypto from "crypto";

const webhookSecret = config.razorpay.webhookSecret;

const razorpayWebhook = (req, res) => {
    const shasum = crypto.createHmac('sha256', webhookSecret);
    shasum.update(req.body);
    const digest = shasum.digest('hex');

    const razorpaySignature = req.headers['x-razorpay-signature'];

   if (digest === razorpaySignature) {
        const eventPayload = JSON.parse(req.body.toString());

        switch (eventPayload.event) {
            case 'payment.captured':
                const paymentCaptured = eventPayload.payload.payment.entity;
                console.log('Razorpay Payment Captured:', paymentCaptured.id);
              
                break;
            case 'order.paid':
                const orderPaid = eventPayload.payload.order.entity;
                console.log('Razorpay Order Paid:', orderPaid.id);
          
                break;
            case 'payment.failed':
                const paymentFailed = eventPayload.payload.payment.entity;
                console.log('Razorpay Payment Failed:', paymentFailed.id, paymentFailed.error_description);
               
                break;
            default:
                console.log(`Unhandled Razorpay event type ${eventPayload.event}`);
        }
        res.status(200).json({ status: 'success' });
    } else {
        console.error('Razorpay Webhook: Signature mismatch!');
        res.status(400).send('Invalid signature');
    }
}

export default razorpayWebhook;