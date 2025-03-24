import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";
import { sendOtpEmail } from "../Config/NodeMailler.js";
import dotenv from 'dotenv';
dotenv.config();

export const UserRegistrationController = async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const otp = generateOTP();
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            otp,
        });

        await newUser.save();
        await sendOtpEmail(email, otp);

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

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
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const UserOTPVerifyController = async (req, res) => {
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
}

export const UserLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please register first." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Account not verified. Please verify your email first." });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, access: user.access },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Send response with token
        return res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                access: user.access
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

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
        console.log(userId);
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
        console.log(user)
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
