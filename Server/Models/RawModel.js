import mongoose from "mongoose";

const RawSchema = new mongoose.Schema(
    {
        materialName: {
            type: String,
            required: true,
            trim: true
        },
        imageUrl: {
            type: String,
            default: "<a href='https://www.flaticon.com/free-icons/picture' title='picture icons'>Picture icons created by Freepik - Flaticon</a>"
        },
        description: {
            type: String,
            default: "Description not available for this product."
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        color: {
            type: String,
            default: "Black",
            trim: true
        }
    },
    { timestamps: true }
);

const RawModel = mongoose.models.RawMaterial || mongoose.model("RawMaterial", RawSchema);

export default RawModel;
