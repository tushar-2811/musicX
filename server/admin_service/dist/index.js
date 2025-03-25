import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
dotenv.config();
const app = express();
const port = process.env.PORT;
initDB()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is Running on port : ${port}`);
    });
})
    .catch((error) => {
    console.log("Error in connecting to db::", error);
    throw error;
});
