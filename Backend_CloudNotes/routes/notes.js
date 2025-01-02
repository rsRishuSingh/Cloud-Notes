import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send("inside notes")
})

export default router;