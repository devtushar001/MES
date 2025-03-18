import express from 'express';
import { CreateUpdateRawController } from '../Controller/UpdateRawController.js';

const UpdateRawRoute = express.Router();

UpdateRawRoute.post("/update", CreateUpdateRawController);
// UpdateRawRoute.get("/get-update", updateInfo);

export default UpdateRawRoute;