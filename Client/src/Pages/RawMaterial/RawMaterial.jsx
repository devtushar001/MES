import React, { useState } from "react";
import './RawMaterial.css';
import ImageUploader from "../../Component/ImageUploader/ImageUploader";

const UpdatedRawMaterial = () => {
    const [addNew, setAddNew] = useState(false);
    const [productImage, setProductImage] = useState({ type: "single", selection: false, image: null });
    const [rawData, setRawData] = useState({
        materialName: "",
        imageUrl: productImage.image,
        description: "",
        quantity: "",
        color: ""
    })
    return (
        <>
            <div className="updated-raw-material">
                <div className="updated-controll-form-btn">
                    <button onClick={() => setAddNew(!addNew)}>
                        {!addNew ? "Add New Product" : "Close"}
                    </button>
                </div>

                {addNew ? (
                    <div className="updated-add-new-raw-material">
                        <div className="updated-material-name">
                            <input value={rawData.materialName} onChange={(e) => setRawData((prev) => ({ ...prev, materialName: e.target.value }))} type="text" placeholder="Material name" />
                            <button onClick={() => setProductImage((prev) => ({ ...prev, selection: true }))}>Choose Image</button>
                        </div>
                        {productImage.selection ? <ImageUploader object={productImage} imageSelector={setProductImage} /> : <></>}
                        <textarea value={rawData.description} onChange={(e) => setRawData((prev) => ({ ...prev, description: e.target.value }))} name="description" id="updated-description"></textarea>
                        <div className="updated-material-info">
                            <input value={rawData.quantity} onChange={(e) => setRawData((prev) => ({ ...prev, quantity: e.target.value }))} type="number" name="quantity" id="updated-quantity" placeholder="Quantity" />
                            <input value={rawData.color} onChange={(e) => setRawData((prev) => ({ ...prev, color: e.target.value }))} type="text" name="color" id="updated-color" placeholder="Color" />
                        </div>
                        <button className="updated-submit">Submit</button>
                    </div>
                ) : (
                    <></>
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
                            <tr>
                                <td>01</td>
                                <td>Steel Pipe</td>
                                <td>
                                    <img src="https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=" alt="Material" className="updated-img-thumbnail" />
                                </td>
                                <td>High-quality steel pipe for industrial use.</td>
                                <td>100</td>
                                <td>Silver</td>
                                <td>
                                    <button className="updated-btn updated-btn-primary">Update</button>
                                    <button className="updated-btn updated-btn-danger">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>02</td>
                                <td>Plastic Sheet</td>
                                <td>
                                    <img src="https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=" alt="Material" className="updated-img-thumbnail" />
                                </td>
                                <td>Durable plastic sheet for construction.</td>
                                <td>250</td>
                                <td>Blue</td>
                                <td>
                                    <button className="updated-btn updated-btn-primary">Update</button>
                                    <button className="updated-btn updated-btn-danger">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default UpdatedRawMaterial;
