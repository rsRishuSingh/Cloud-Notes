
import mongoose from "mongoose"; // Import mongoose for MongoDB object modeling

// Define the schema for user
const userSchema = new mongoose.Schema({
    name: {
        type: String, // Name of the user
        required: true, // Name is mandatory
    },
    email: {
        type: String, // Email of the user
        required: true, // Email is mandatory
        unique: true // Ensures no duplicate emails
    },
    password: {
        type: String, // Hashed password of the user
        required: true, // Password is mandatory
    },
    date: {
        type: Date, // Date when the user was created
        default: Date.now, // Automatically set the current date and time
    }
});

// Create a model for the user schema
const user = mongoose.model('user', userSchema);
// // user.createIndexes()
// Export the user model
export default user;
