import express from 'express'
import User from '../models/User.js'
import { body, validationResult } from 'express-validator'

const router = express.Router()

router.get('/', (req, res) => {
    console.log("GET ", req.body)
    res.send("GET inside login")
})

router.post('/', [
    body('name', 'Name must have more than 3 character').isLength({ min: 3 }),
    body('email', 'Invalid Email').isEmail(),
    body('password', 'password length must be more than 5').isLength({ min: 5 })
], (req, res) => {

    console.log("POST ", req.body)
    // let user = new User(req.body)
    // console.log(user)
    // user.save()
    // res.send("POST inside login")

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // res.json(req.body)

    User.create({
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password
    }).then(user => res.json(user)).catch(err => {
        res.json({ message: "Email must be unique : " + err.message })
    })

})

export default router;