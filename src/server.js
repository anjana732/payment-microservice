import app from './app.js';
import connectDB from './config/db.js';
import { logger } from './utils/logger.js'; 

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    logger.info("MongoDB connected successfully"); 

    const server = app.listen(PORT, () => {
        logger.info(`App is listening on port: ${PORT}`);
      console.log(`App is listening on port: ${PORT}`); 
    });
  })
  .catch((err) => {
    logger.error("MongoDB connection failed:", err.message);
    console.error("MongoDB connection failed:", err.message); 
    console.error("MongoDB connection failure stack:", err.stack);
    process.exit(1);
  });