import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    paymentGateway: {
        type: String,
        enum: ['stripe', 'razorpay'],
        retuired : [true, 'payement gateway is required']
    },
    userId : {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency : {
        type: String,
        required: true
    },
    status : {
        type: String,
        enum: ['created', 'paid', 'failed', 'refunded'],
        default: "created",
    }, 
    
}, {
        timestamps: true
    })

const order = mongoose.model('order', orderSchema);

export default order;