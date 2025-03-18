import RawModel from "../Models/RawModel.js";
// ProductId
// changeType
// currentQuantity
// quantity


const CreateUpdateRawController = async (req, res) => {
     try {
        const {ProductId, changeType,  quantity} = req.body;
        // currentQuantity, update this quintity
        if (!ProductId || !changeType || !quantity) {
            return res.status(400).jsone({
                success: false,
                message: `All fields are required`
            })
        }


        const rawProduct = RawModel.findById(ProductId);

        
     } catch (error) {
        return res.status(500).jsone({
            success: false,
            message: `Api got a root error...`
        })
     }
}