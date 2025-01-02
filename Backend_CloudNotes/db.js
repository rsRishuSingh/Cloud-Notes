// const mongoose = require('mongoose');

// const connectToDB = async () => {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Connected to Database");
//     } catch (err) {
//         console.log(err);
//     }
// };

// module.exports = connectToDB;

import mongoose from "mongoose";


export const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/cloudNotes')
    }
    catch (err) {
        console.log(err)
    }

}
