import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: true,
        min: 1000,
        max: 999999
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    access: {
        type: Boolean,
        default: false,
    }
});

const UserModel = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default UserModel;
