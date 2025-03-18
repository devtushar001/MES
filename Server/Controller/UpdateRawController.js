import RawModel from "../Models/RawModel.js";
import UpdateRawModel from "../Models/UpdateRawModel.js";

export const CreateUpdateRawController = async (req, res) => {
    try {
        let { ProductId, changeType, quantity } = req.body;
        console.log(req.body)
        if (!ProductId || !changeType || !quantity) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        changeType = changeType.toLowerCase().trim();
        quantity = Number(quantity);

        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a valid positive number"
            });
        }

        const rawProduct = await RawModel.findById(ProductId);
        if (!rawProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (changeType === "in") {
            rawProduct.quantity += quantity;
        } else if (changeType === "out") {
            if (rawProduct.quantity < quantity) {
                return res.status(400).json({
                    success: false,
                    message: "Not enough stock available"
                });
            }
            rawProduct.quantity -= quantity;
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid changeType. Use 'in' or 'out'."
            });
        }

        await rawProduct.save();

        const updateRaw = await UpdateRawModel.create({
            ProductId,
            changeType,
            currentQuantity: rawProduct.quantity,
            quantity
        });

        if (!updateRaw) {
            return res.status(400).json({
                success: false,
                message: "Update operation failed."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product quantity updated successfully",
            updatedProduct: rawProduct
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "API encountered an internal error",
            error: error.message
        });
    }
};
