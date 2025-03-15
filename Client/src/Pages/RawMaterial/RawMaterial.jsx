import React, { useEffect, useState } from "react";
import './RawMaterial.css';
import ImageUploader from "../../Component/ImageUploader/ImageUploader";

const UpdatedRawMaterial = () => {
    const [addNew, setAddNew] = useState(false);
    const [productImage, setProductImage] = useState({ type: "single", selection: false, image: null });
    const [rawData, setRawData] = useState({
        materialName: "",
        imageUrl: "",
        description: "",
        quantity: 0,
        color: ""
    });

    useEffect(() => {
        console.log(rawData);
    }, [rawData])

    const rawMaterials = [
        {
            id: 1,
            materialName: "Steel Pipe",
            imageUrl: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg",
            description: "High-quality steel pipe for industrial use.",
            quantity: 100,
            color: "Silver"
        },
        {
            id: 2,
            materialName: "Plastic Sheet",
            imageUrl: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg",
            description: "Durable plastic sheet for construction.",
            quantity: 250,
            color: "Blue"
        }
    ];

    React.useEffect(() => {
        if (productImage.image) {
            setRawData((prev) => ({ ...prev, imageUrl: productImage.image }));
        }
    }, [productImage.image]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRawData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="updated-raw-material">
            <div className="updated-controll-form-btn">
                <button onClick={() => setAddNew(!addNew)}>
                    {!addNew ? "Add New Product" : "Close"}
                </button>
            </div>

            {addNew && (
                <div className="updated-add-new-raw-material">
                    <div className="updated-material-name">
                        <input
                            value={rawData.materialName}
                            onChange={handleChange}
                            name="materialName"
                            type="text"
                            placeholder="Material name"
                        />
                        <button onClick={() => setProductImage((prev) => ({ ...prev, selection: true }))}>
                            Choose Image
                        </button>
                    </div>

                    {productImage.selection && (
                        <ImageUploader object={productImage} imageSelector={setProductImage} />
                    )}

                    <textarea
                        value={rawData.description}
                        onChange={handleChange}
                        name="description"
                        id="updated-description"
                        placeholder="Description"
                    />

                    <div className="updated-material-info">
                        <input
                            value={rawData.quantity}
                            onChange={handleChange}
                            type="number"
                            name="quantity"
                            id="updated-quantity"
                            placeholder="Quantity"
                        />
                        <input
                            value={rawData.color}
                            onChange={handleChange}
                            type="text"
                            name="color"
                            id="updated-color"
                            placeholder="Color"
                        />
                    </div>

                    <button className="updated-submit">Submit</button>
                </div>
            )}

            {!addNew && (
                <table className="updated-table updated-table-bordered updated-table-striped">
                    <thead className="updated-table-dark">
                        <tr>
                            <th>S.No.</th>
                            <th>Material Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Color</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rawMaterials.map((material, index) => (
                            <tr key={material.id}>
                                <td>{index + 1}</td>
                                <td>{material.materialName}</td>
                                <td>
                                    <img
                                        src={material.imageUrl}
                                        alt="Material"
                                        className="updated-img-thumbnail"
                                    />
                                </td>
                                <td>{material.description}</td>
                                <td>{material.quantity}</td>
                                <td>{material.color}</td>
                                <td>
                                    <button className="updated-btn updated-btn-primary">Update</button>
                                    <button className="updated-btn updated-btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UpdatedRawMaterial;
