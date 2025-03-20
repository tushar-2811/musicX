import express from 'express'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const port = process.env.PORT;

app.listen(port , (error:any) => {
    console.log(`Server is running on port ${port}`);
})