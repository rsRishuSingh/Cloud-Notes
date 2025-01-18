
import mongoose from "mongoose"; // Import mongoose for MongoDB object modeling

// Define the schema for notes
const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Link to the user model
        ref: 'user' // Reference to the 'user' collection
    },
    title: {
        type: String, // Title of the note
        required: true, // Title is mandatory
    },
    description: {
        type: String, // Description of the note
    },
    tags: {
        type: String, // Tags for categorizing the note
        default: "General", // Default tag if none is provided
        set: (value) => (value === "" ? "General" : value) // Ensure default value for empty strings
    },
    date: {
        type: Date, // Date when the note was created
        default: Date.now, // Automatically set the current date and time
    }
});

// Create a model for the notes schema
const notes = mongoose.model('notes', notesSchema);

export default notes; // Export the notes model
