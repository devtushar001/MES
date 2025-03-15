import RawModel from "../Models/RawModel";

export const AddRawMaterialController = async (req, res) => {
    try {
        const { materialName, imageUrl, description, quantity, color } = req.body;

        if (!materialName) {
            return res.status(400).json({
                success: false,
                message: "Material name is required."
            });
        }

        if (quantity !== undefined && quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity cannot be negative."
            });
        }

        const newRawProduct = await RawModel.create({
            materialName,
            imageUrl,
            description,
            quantity,
            color
        });

        return res.status(201).json({
            success: true,
            message: "Raw material added successfully!",
            data: newRawProduct
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `API encountered an error: ${error.name} - ${error.message}`
        });
    }
};
