import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import { sendOtpEmail } from "../Config/NodeMailler.js";
import dotenv from 'dotenv';
dotenv.config();

export const SendUserOtpController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const otp = generateOTP();

        await sendOtpEmail(email, otp);

        let user = await UserModel.findOne({ email });

        if (!user) {
            user = await UserModel.create({ email, otp, isVerified: false, access: false });
        } else {
            user.otp = otp;
            user.isVerified = false;
            await user.save();
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 3600000
            })
            .status(200)
            .json({
                success: true,
                message: "OTP sent to your email",
                token,
            });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `API error: ${error.name} - ${error.message}`,
        });
    }
};

const generateOTP = () => String(Math.floor(1000 + Math.random() * 9000));

export const VerifyOtpController = async (req, res) => {
    try {
        const { otp } = req.body;
        const userId = req.user;
        console.log(userId, otp)
        const getUser = await UserModel.findById(userId);

        if (!getUser) {
            return res.status(404).json({
                success: false,
                message: `User not found.`,
            });
        }

        if (getUser.otp === String(otp)) {
            await UserModel.findByIdAndUpdate(userId, { isVerified: true });
            return res.status(200).json({
                success: true,
                message: `User verified.`,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: `Invalid OTP.`,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `API error: ${error.name} - ${error.message}`,
        });
    }
};

export const GetUserDetailsController = async (req, res) => {
    try {
        const userId = req.user;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if (!user.access || !user.isVerified) {
            return res.status(400).json({
                success: false,
                message: `Contact to developer to access all routess`
            })
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully.",
            data: user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};
