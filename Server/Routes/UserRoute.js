import express from 'express';
import { SendUserOtpController, VerifyOtpController } from '../Controller/UserController.js';
import isAuth from '../Middlewares/isAuth.js';

const UserRouter = express.Router();

UserRouter.post('/create', SendUserOtpController);
UserRouter.post('/verify', isAuth, VerifyOtpController);

export default UserRouter;