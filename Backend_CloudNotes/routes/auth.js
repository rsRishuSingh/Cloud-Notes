import express from 'express';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import fetchUser from '../middleware/fetchUser.js';

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// Create a router instance
const router = express.Router();

// Handle GET request for the root of this route
router.get('/', (req, res) => {
    console.log(JWT_SECRET_KEY)
    console.log("GET ", req.body); // Log the incoming request body
    res.send("GET inside login"); // Send a response to the client
});

// Handle POST request for user registration
router.post('/createaccount', [
    // Validation for 'name': must be at least 3 characters long
    body('name', 'Name must have more than 3 character').isLength({ min: 3 }),
    // Validation for 'email': must be a valid email address
    body('email', 'Invalid Email').isEmail(),
    // Validation for 'password': must be at least 5 characters long
    body('password', 'password length must be more than 5').isLength({ min: 5 })
], async (req, res) => {
    console.log("POST ", req.body); // Log the incoming request body

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If errors exist, return a 400 response with the error details
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if a user with the given email already exists in the database
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            // If user exists, return a 400 response with an error message
            return res.status(400).json({ error: "email already exist" });
        }
        let salt = await bcrypt.genSalt(10)
        let secPassword = await bcrypt.hash(req.body.password, salt)
        // Create a new user with the provided data
        user = await User.create({
            "name": req.body.name,
            "email": req.body.email,
            "password": secPassword
        });

        // Send the created user object as a JSON response
        let data = {
            user:
                { id: user.id }
        }
        const authToken = jwt.sign(data, JWT_SECRET_KEY)
        res.json({ authToken });
    } catch (err) {
        // Log any server-side errors for debugging
        console.log(err);

        // Return a 400 response with a generic error message
        return res.status(400).json({ error: "some error occured" });
    }
});

router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        // Check if a user with the given email already exists in the database
        let { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "No user exist" })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({ error: "incorrect password" });
        }
        let data = {
            user:
                { id: user.id }
        }
        const authToken = jwt.sign(data, JWT_SECRET_KEY)
        res.json({ authToken });
    }
    catch (err) {
        // Log any server-side errors for debugging
        console.log(err);

        // Return a 400 response with a generic error message
        return res.status(400).json({ error: "some error occured" });
    }
})

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        let userId = req.user.id
        let user = await User.findById(userId).select("-password")
        res.json(user)

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: "some error occured" });
    }
})

// Export the router so it can be used in other files
export default router;
