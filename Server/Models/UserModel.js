import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true,
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
