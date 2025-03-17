import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';



dotenv.config();

const app = express();

//Middleware setup
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: `App running on port ${port}`
    })
})