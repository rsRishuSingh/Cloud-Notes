// const connectToDB = require('./db.js');

// connectToDB();


import { connectToDB } from './db.js'
import express from "express"
import login from './routes/login.js'
import notes from './routes/notes.js'

const PORT = 3000;

const app = express();
app.use(express.json())
connectToDB()

app.use('/api/auth', login)
app.use('/api/notes', notes)

app.get('/', (req, res) => {
    console.log(req.body)
    res.send("GET Hello World")

}).post('/', (req, res) => {
    console.log(req.body)
    res.send("POST Hello World ", req.body)

})

app.listen(PORT, () => {
    console.log("Server listening on ", PORT)
})

