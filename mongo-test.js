// mongo-test.js
import mongoose from "mongoose";

const uri = "mongodb+srv://payment-microservices:xLj0wwGR6Z26HatB@anjana.vto8k.mongodb.net/payment_service_db?retryWrites=true&w=majority&appName=Anjana";

const testConnection = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB Atlas");
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    process.exit(1);
  }
};

testConnection();
