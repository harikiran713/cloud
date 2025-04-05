import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://harikiran:hari996633@iiitapp.wn142.mongodb.net/?retryWrites=true&w=majority&appName=iiitapp/");
        
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;








