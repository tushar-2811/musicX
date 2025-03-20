import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/db.js';
import indexRouter from './routes/routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;


app.use('/' , indexRouter);



connectDB()
.then(() => {
    app.listen(port , () => {
        console.log(`Server is Running on port : ${port}`);
    })
})
.catch((error) => {
    console.log("Error in connecting to db::" , error);
    throw error;
})