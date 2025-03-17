import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDb from './Config/connectDb.js';
import cloudinarySetup from './Config/CloudinarySetupConfig.js';

dotenv.config();
const cloudeName = process.env.CLOUDINARY_CLOUD_NAME, cloudApiKey = process.env.CLOUDINARY_API_KEY, cloudApiSecret = process.env.CLOUDINARY_API_SECRET, mongo_url = process.env.MONGODB_URL, port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

connectDb(mongo_url);
cloudinarySetup(cloudeName, cloudApiKey, cloudApiSecret);

app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: `App running on port ${port}`
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Universal Something went wrong!',
        error: err.message
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
