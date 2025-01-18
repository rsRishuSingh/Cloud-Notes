
import mongoose from "mongoose"; // Import mongoose for MongoDB connection
import dotenv from 'dotenv'; // Import dotenv to manage environment variables

dotenv.config(); // Load environment variables from the .env file

// Function to connect to the database
export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL); // Connect to MongoDB using the URL from environment variables
    } catch (err) {
        console.log(err); // Log any connection errors
    }
};

