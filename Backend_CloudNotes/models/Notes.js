import mongoose from "mongoose";

// import { Schema } from "mongoose
const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        default: "General",
        set: (value) => (value === "" ? "General" : value)
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const notes = mongoose.model('notes', notesSchema);
export default notes;