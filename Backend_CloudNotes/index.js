// const connectToDB = require('./db.js');

// connectToDB();


import { connectToDB } from './db.js'
import express from "express"
import auth from './routes/auth.js'
import notes from './routes/notes.js'
import dotenv from 'dotenv';
import cors from 'cors'

const PORT = 5000;
dotenv.config();
const app = express();
app.use(cors())

app.use(express.json())
connectToDB()

app.use('/api/auth', auth)
app.use('/api/notes', notes)

app.get('/', (req, res) => {
    console.log(req.body)
    console.log(process.env.JWT_SECRET_KEY)
    res.send("GET Hello World")

}).post('/', (req, res) => {
    console.log(req.body)
    res.send("POST Hello World ", req.body)

})

app.listen(PORT, () => {
    console.log("Server listening on ", PORT)
})

