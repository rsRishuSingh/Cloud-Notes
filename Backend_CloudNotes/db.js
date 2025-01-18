// const mongoose = require('mongoose');

// const connectToDB = async () => {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Connected to Database");
//     } catch (err) {
//         console.log(err);
//     }
// };

// module.exports = connectToDB;

// import mongoose from "mongoose";
// import dotenv from 'dotenv';

// dotenv.config()
// export const connectToDB = async () => {
//     try {

//         await mongoose.connect(process.env.DATABASE_URL)
//     }
//     catch (err) {
//         console.log(err)
//     }

// }

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

