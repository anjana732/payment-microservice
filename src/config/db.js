import mongoose from 'mongoose';
import { logger } from '../utils/logger';

const connectDB = async ()=>{
    try{
        const resp = await mongoose.connect(process.env.MONGODB_URI);
        if(resp.OK)  logger.info(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        logger.error(`MongoDB connection error: ${err.message}`,{stack : err.stack});
        process.exit(1);
    }
}

export default connectDB;