import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

const connectDB = async ()=>{
    try{
        const resp = await mongoose.connect(process.env.MONGODB_URI);
        logger.info(`MongoDB Connected: ${resp.connection.host}`);
    }catch(err){
        logger.error(`MongoDB connection error: ${err.message}`,{stack : err.stack});
        process.exit(1);
    }
}

export default connectDB;