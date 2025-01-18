import express from 'express'
import fetchUser from '../middleware/fetchUser.js';
import Notes from '../models/Notes.js';
import { body, validationResult } from 'express-validator';


const router = express.Router()

router.get('/', (req, res) => {
    res.send("inside notes")
})
router.get('/fetchnotes', fetchUser, async (req, res) => {
    let status = true;
    try {
        let notes = await Notes.find({ user: req.user.id })
        res.json({ "status": status, notes })
    }
    catch (err) {
        status = false
        return res.status(400).json({ "status": status, errors: { "msg": "internal server error", "path": "Server error" } });
    }
})

router.post('/addnote', fetchUser, [
    body('title', 'title must be present').isLength({ min: 1 }),
    body('description', 'Enter description').optional(),
    body('tags', 'Enter tags').optional()
], async (req, res) => {
    let status = true;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If errors exist, return a 400 response with the error details
            status = false;
            return res.status(400).json({ "status": status, errors: errors.array() });
        }

        let { title, description, tags } = req.body
        let notes = new Notes({ user: req.user.id, title, description, tags })
        let savedNotes = await notes.save();
        res.json({ "status": status, "notes": savedNotes })
    }
    catch (err) {
        status = false
        // Return a 400 response with a generic error message
        return res.status(400).json({ "status": status, errors: { "msg": "internal server error", "path": "Server error" } });

    }
})

router.put('/updatenote/:id', fetchUser,
    [
        body('title', 'title must be present').isLength({ min: 3 }),
        body('description', 'Enter description').isLength({ min: 1 }),
        // body('tags', 'Enter tags').optional()
    ], async (req, res) => {
        let status = true

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                status = false
                // If errors exist, return a 400 response with the error details
                return res.status(400).json({ "status": status, errors: errors.array() });

            }

            // let { title, description, tags } = req.body
            let note = await Notes.findById(req.params.id)
            if (!note) {
                status = false;
                return res.status(404).json({ "status": status, errors: { "msg": "no note exits", "path": "Invalid note" } });
            }
            if (note.user.toString() !== req.user.id) {
                status = false;
                return res.status(404).json({ "status": status, errors: { "msg": "Not allowed", "path": "Invalid Access" } });
            }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.json({ "status": status, "notes": note })

        }
        catch (err) {
            status = false
            // Return a 400 response with a generic error message
            return res.status(400).json({ "status": status, errors: { "msg": "internal server error", "path": "Server error" } });
        }


    }
)

router.delete('/deletenote/:id', fetchUser,
    async (req, res) => {
        let status = true;
        try {

            let note = await Notes.findById(req.params.id)
            if (!note) {
                status = false
                return res.status(404).json({ "status": status, errors: { "msg": "no note exits", "path": "Invalid note" } });
            }
            if (note.user.toString() !== req.user.id) {
                status = false;
                return res.status(404).json({ "status": status, errors: { "msg": "Not allowed", "path": "Invalid Access" } });
            }
            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({ "status": status, "note": note })

        }
        catch (err) {
            status = false
            // Return a 400 response with a generic error message
            return res.status(400).json({ "status": status, errors: { "msg": "internal server error", "path": "Server error" } });
        }


    }
)
export default router;