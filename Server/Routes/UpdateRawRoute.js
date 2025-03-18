import express from 'express';

const UpdateRawRoute = express.Router();

UpdateRawRoute.post("/update", createUpdate);
UpdateRawRoute.get("/get-update", updateInfo);

export default UpdateRawRoute;