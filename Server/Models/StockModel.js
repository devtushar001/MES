import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    item: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const StockModel = mongoose.models.Stock || mongoose.model("Stock", StockSchema);

export default StockModel;