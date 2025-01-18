
import { connectToDB } from './db.js'; // Import the database connection function
import express from "express"; // Import Express framework
import auth from './routes/auth.js'; // Import auth routes
import notes from './routes/notes.js'; // Import notes routes
import dotenv from 'dotenv'; // Import dotenv to manage environment variables
import cors from 'cors'; // Import cors to handle cross-origin requests

const PORT = 5000; // Define the port for the server
dotenv.config(); // Load environment variables from the .env file
const app = express(); // Initialize the Express app
app.use(cors()); // Enable CORS for all routes

app.use(express.json()); // Middleware to parse JSON request bodies
connectToDB(); // Connect to the database

// Use auth and notes routes
app.use('/api/auth', auth);
app.use('/api/notes', notes);

// Handle GET and POST requests to the root URL
app.get('/', (req, res) => {
    console.log(req.body); // Log the request body
    console.log(process.env.JWT_SECRET_KEY); // Log the JWT secret key for debugging
    res.send("GET Hello World");
}).post('/', (req, res) => {
    console.log(req.body); // Log the request body
    res.send("POST Hello World ", req.body); // Respond with the received data
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log("Server listening on ", PORT);
});


