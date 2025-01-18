
import express from 'express'
import fetchUser from '../middleware/fetchUser.js';
import Notes from '../models/Notes.js';
import { body, validationResult } from 'express-validator';


const router = express.Router()

// Route to check if notes API is working
router.get('/', (req, res) => {
    res.send("inside notes")
})

// Route to fetch notes of the logged-in user
router.get('/fetchnotes', fetchUser, async (req, res) => {
    let status = true;
    try {
        // Fetch notes for the logged-in user
        let notes = await Notes.find({ user: req.user.id })
        res.json({ "status": status, notes })
    }
    catch (err) {
        status = false
        // Handle server error
        return res.status(400).json({ "status": status, errors: { "msg": "internal server error", "path": "Server error" } });
    }
})

// Route to add a new note
router.post('/addnote', fetchUser, [
    // Validation for note title
    body('title', 'title must be more than 3 character').isLength({ min: 3 }),
    // Validation for optional fields
    body('description', 'Enter description').optional(),
    body('tags', 'Enter tags').optional()
], async (req, res) => {
    let status = true;
    try {
        const errors = validationResult(req);
        // If validation errors exist, return 400 with error message
        if (!errors.isEmpty()) {
            status = false;
            return res.status(400).json({ "status": status, errors: { "msg": errors.array()[0].msg, "path": errors.array()[0].path } });
        }

        // Create a new note object
        let { title, description, tags } = req.body
        let notes = new Notes({ user: req.user.id, title, description, tags })
        let savedNotes = await notes.save();
        // Return the saved note as a response
        res.json({ "status": status, "notes": savedNotes })
    }
    catch (err) {
        status = false
        // Handle server error
        return res.status(400).json({ "status": status, errors: { "msg": "internal server error", "path": "Server error" } });

    }
})

// Route to update an existing note
router.put('/updatenote/:id', fetchUser,
    [
        // Validation for note title
        body('title', 'title must be more than 3 characters').isLength({ min: 3 }),
        // Validation for optional description field
        body('description', 'Enter description').optional(),
    ], async (req, res) => {
        let status = true

        try {
            const errors = validationResult(req);
            // If validation errors exist, return 400 with error message
            if (!errors.isEmpty()) {
                status = false
                return res.status(400).json({ "status": status, errors: { "msg": errors.array()[0].msg, "path": errors.array()[0].path } });

            }

            // Find note by ID and check for its existence
            let note = await Notes.findById(req.params.id)
            if (!note) {
                status = false;
                // Return error if note does not exist
                return res.status(404).json({ "status": status, errors: { "msg": "no note exits", "path": "Invalid note" } });
            }
            // Check if the logged-in user is the owner of the note
            if (note.user.toString() !== req.user.id) {
                status = false;
                // Return error if user is not authorized
                return res.status(404).json({ "status": status, errors: { "msg": "Not allowed", "path": "Invalid Access" } });
            }
            // Update note and return the updated note
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.json({ "status": status, "notes": note })

        }
        catch (err) {
            status = false
            // Handle server error
            return res.status(400).json({ "status": status, errors: { "msg": "internal server error", "path": "Server error" } });
        }

    }
)

// Route to delete an existing note
router.delete('/deletenote/:id', fetchUser,
    async (req, res) => {
        let status = true;
        try {

            // Find note by ID and check for its existence
            let note = await Notes.findById(req.params.id)
            if (!note) {
                status = false
                // Return error if note does not exist
                return res.status(404).json({ "status": status, errors: { "msg": "no note exits", "path": "Invalid note" } });
            }
            // Check if the logged-in user is the owner of the note
            if (note.user.toString() !== req.user.id) {
                status = false;
                // Return error if user is not authorized
                return res.status(404).json({ "status": status, errors: { "msg": "Not allowed", "path": "Invalid Access" } });
            }
            // Delete the note and return the deleted note
            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({ "status": status, "note": note })

        }
        catch (err) {
            status = false
            // Handle server error
            return res.status(400).json({ "status": status, errors: { "msg": "internal server error", "path": "Server error" } });
        }

    }
)
export default router;
