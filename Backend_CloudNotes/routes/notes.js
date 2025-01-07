import express from 'express'
import fetchUser from '../middleware/fetchUser.js';
import Notes from '../models/Notes.js';
import { body, validationResult } from 'express-validator';


const router = express.Router()

router.get('/', (req, res) => {
    res.send("inside notes")
})
router.get('/fetchnotes', fetchUser, async (req, res) => {
    let notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})

router.post('/addnote', fetchUser, [
    body('title', 'title must be present').isLength({ min: 1 }),
    body('description', 'Enter description').optional(),
    body('tags', 'Enter tags').optional()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If errors exist, return a 400 response with the error details
        return res.status(400).json({ errors: errors.array() });
    }

    let { title, description, tags } = req.body
    let notes = new Notes({ user: req.user.id, title, description, tags })
    let savedNotes = await notes.save();
    res.json(savedNotes)
})

router.put('/updatenote/:id', fetchUser,
    [
        body('title', 'title must be present').isLength({ min: 3 }),
        body('description', 'Enter description').isLength({ min: 1 }),
        // body('tags', 'Enter tags').optional()
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // If errors exist, return a 400 response with the error details
                return res.status(400).json({ errors: errors.array() });
            }

            // let { title, description, tags } = req.body
            let note = await Notes.findById(req.params.id)
            if (!note) {
                return res.status(404).send("Not Found");
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(404).send("Not allowed");
            }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.json(note)
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({ error: "some error occured" });
        }


    }
)

router.delete('/deletenote/:id', fetchUser,
    async (req, res) => {
        try {

            let note = await Notes.findById(req.params.id)
            if (!note) {
                return res.status(404).send("Not Found");
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(404).send("Not allowed");
            }
            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({ "Sucess": "note deleted", note })
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({ error: "some error occured" });
        }


    }
)
export default router;