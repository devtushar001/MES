import mongoose from "mongoose";

const UpdateRawSchema = new mongoose.Schema(
    {
        ProductId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        changeType: {
            type: String,
            enum: ["IN", "OUT"],
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    { timestamps: true }
);

const UpdateRawModel = mongoose.models.UpdateRaw || mongoose.model("UpdateRaw", UpdateRawSchema);

export default UpdateRawModel;
