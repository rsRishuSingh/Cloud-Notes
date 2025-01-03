import express from 'express'
import fetchUser from '../middleware/fetchUser.js';
import Notes from '../models/Notes.js';
import { body, validationResult } from 'express-validator';


const router = express.Router()

router.get('/', (req, res) => {
    res.send("inside notes")
})
router.get('/fetchNotes', fetchUser, async (req, res) => {
    let notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})
router.post('/addNote', fetchUser, [
    // Validation for 'name': must be at least 3 characters long
    body('title', 'title must be present').isLength({ min: 1 }),
    // Validation for 'email': must be a valid email address
    body('description', 'Enter description'),
    // Validation for 'password': must be at least 5 characters long
    body('tags', 'Enter tags'),
    // body('date', 'Enter data').isDate()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If errors exist, return a 400 response with the error details
        return res.status(400).json({ errors: errors.array() });
    }

    let { title, description, tags, date } = req.body
    let notes = new Notes({ user: req.user.id, title, description, tags })
    let savedNotes = await notes.save();
    res.json(savedNotes)
})

export default router;