import React, { useContext, useEffect, useState } from "react";
import './RawMaterial.css';
import ImageUploader from "../../Component/ImageUploader/ImageUploader";
import { MesContext } from "../../Context/MesContextProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UpdatedRawMaterial = () => {
    const [addNew, setAddNew] = useState(false);
    const [inOUt, setInOut] = useState(false);
    const [productId, setProductId] = useState("");
    const { backend_url, rawMaterials, setRawMaterials } = useContext(MesContext);
    const [productImage, setProductImage] = useState({ type: "single", selection: false, image: null });
    const [rawData, setRawData] = useState({
        materialName: "",
        imageUrl: "",
        description: "",
        quantity: 0,
        color: ""
    });

    // Fetch Raw Materials

    const fetchProduct = async () => {
        try {
            const res = await fetch(`${backend_url}/api/raw-material/get`, {
                method: 'GET',
                headers: { 'Content-Type': "application/json" }
            });

            if (!res.ok) throw new Error("Failed to fetch raw materials");

            const data = await res.json();
            if (!data.success) {
                toast.error(data.message);
                return;
            }

            setRawMaterials(data.data);
            console.log(data.data)
            toast.success("Raw materials loaded successfully");
        } catch (error) {
            toast.error(`${error.name}: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [backend_url]);

    // Create New Raw Material
    const createRawProduct = async () => {
        try {
            const res = await fetch(`${backend_url}/api/raw-material/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rawData)
            });

            if (!res.ok) throw new Error("Failed to create product");

            const data = await res.json();

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            toast.success("Raw material added successfully");
            setRawMaterials((prev) => [...prev, data.data]);

            // Reset form
            setRawData({ materialName: "", imageUrl: "", description: "", quantity: 0, color: "" });
            setProductImage({ type: "single", selection: false, image: null });
        } catch (error) {
            toast.error(`${error.name}: ${error.message}`);
        }
    };

    // Delete Raw Material
    const deleteRawProduct = async (id) => {
        try {
            const res = await fetch(`${backend_url}/api/raw-material/delete/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error("Failed to delete product");

            const data = await res.json();
            if (!data.success) {
                toast.error(data.message);
                return;
            }

            toast.success("Raw material deleted successfully");
            fetchProduct();
        } catch (error) {
            toast.error(`${error.name}: ${error.message}`);
        }
    };

    // Handle Image Selection
    useEffect(() => {
        if (productImage.image) {
            setRawData((prev) => ({ ...prev, imageUrl: productImage.image }));
        }
    }, [productImage.image]);

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRawData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <div className="updated-raw-material">
                <div className="updated-controll-form-btn">
                    <button onClick={() => setAddNew(!addNew)}>
                        {!addNew ? "Add New Product" : "Close"}
                    </button>
                    <input type="text" placeholder="Search item"/>
                </div>

                {addNew && (
                    <div className="updated-add-new-raw-material">
                        <div className="image">
                            {productImage.image ? (
                                <img style={{ width: "210px" }} src={productImage.image} alt="Product" />
                            ) : (
                                <p>No image selected</p>
                            )}
                        </div>

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
                            placeholder="Description"
                        />

                        <div className="updated-material-info">
                            <input
                                value={rawData.quantity}
                                onChange={handleChange}
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                            />
                            <input
                                value={rawData.color}
                                onChange={handleChange}
                                type="text"
                                name="color"
                                placeholder="Color"
                            />
                        </div>

                        <button onClick={createRawProduct} className="updated-submit">
                            Submit
                        </button>
                    </div>
                )}

                {!addNew && (
                    rawMaterials.length === 0 ? (
                        <p>No raw materials available. Please add one.</p>
                    ) : (
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
                                    <tr key={material._id}>
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
                                            <button onClick={() => { setInOut(true); setProductId(material._id) }} className="updated-btn updated-btn-primary">
                                                Update
                                            </button>
                                            <button
                                                onClick={() => deleteRawProduct(material._id)}
                                                className="updated-btn updated-btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>
            {inOUt ? <div className="edit-in-out">
                <div className="container">
                    <h2>Update Raw Material</h2>
                    <div className="close" onClick={() => setInOut(false)}>X</div>
                    {rawMaterials.map((item, i) => {
                        if (item._id === productId) {
                            return (
                                <div style={{ padding: "10px",gap: "12px", display: "flex", alignItems: "center" }} key={i} className="product-details">
                                    <img style={{ maxWidth: "110px" }} src={item.imageUrl} alt="" />
                                    <p>{item.materialName}&#44;</p>
                                    <p>Current-Qty: {item.quantity}</p>
                                </div>
                            );
                        }
                    })}
                    <select name="update-type" id="update-type">
                        <option value="IN">IN</option>
                        <option value="OUT">OUT</option>
                    </select>
                    <input type="number" name="quantity" id="quantity" placeholder="Quantity" />
                    <button>Submit</button>
                </div>
            </div> : <></>}
            {/* <div className="in-out">
                <div onClick={() => setInOut(true)} className="raw-in">IN</div>
                <div className="raw-out">OUT</div>
            </div> */}

            <div className="controller">
                <div className="previous">Prev.</div>
                <div className="page">1/3</div>
                <div className="next">Next</div>
            </div>
        </>
    );
};

export default UpdatedRawMaterial;
