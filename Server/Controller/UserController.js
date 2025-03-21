import UserModel from "../Models/UserModel.js";
import jwt from 'jsonwebtoken';
const SendUserOtpController = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.ceil(Math.random() * 10000);

        const createUser = await UserModel.create({
            email,
            otp,
            isVerified: false,
            access: false
        });


        if (!createUser) return res.status(500).json({
            success: false,
            message: `User not created.`
        });
        const token = jwt.sign({ userId: createUser._id }, "yourSecretKey", { expiresIn: "1h" });
        return res
            .cookie("token", "yourJWTtokenHere", { httpOnly: true, secure: true, maxAge: 3600000 })
            .status(200)
            .json({
                success: true,
                message: "OTP sent to your email",
            });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Api got error: ${error.name} - ${error.message}`
        })
    }
}

const VerifyOtpController = async (req, res) => {
    try {
        const { userId, otp } = req.body;
        const getUser = UserModel.findById(userId);

        if (getUser.otp === Number(otp)) return res.status({
            success: true,
            message: `User verified.`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Api got problem ${error.name} - ${error.message}`
        })
    }
}