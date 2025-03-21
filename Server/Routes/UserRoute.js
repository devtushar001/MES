import express from 'express';
import { GetUserDetailsController, SendUserOtpController, VerifyOtpController } from '../Controller/UserController.js';
import isAuth from '../Middlewares/isAuth.js';

const UserRouter = express.Router();

UserRouter.post('/create', SendUserOtpController);
UserRouter.post('/verify', isAuth, VerifyOtpController);
UserRouter.get('/get-user', isAuth, GetUserDetailsController);

export default UserRouter;