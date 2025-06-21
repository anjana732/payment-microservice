import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
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
        default: create,
    }, 
    
}, {
        timestamps: true
    })

const order = mongoose.model('order', orderSchema);

export default order;