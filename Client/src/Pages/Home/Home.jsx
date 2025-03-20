import React, { useContext, useEffect, useState } from "react";
import './Home.css';
import { Link } from "react-router-dom";
import { MesContext } from "../../Context/MesContextProvider";

const Home = () => {
    const { readDate, backend_url } = useContext(MesContext);
    const [fetchedData, setFetchedData] = useState([]);
    const [inputDate, setInputDate] = useState("");

    useEffect(() => {
        const getCurrentDate = () => {
            const currentDate = new Date();
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const year = currentDate.getFullYear();
            const formatCurrentDate = `${year}-${month}-${day}`;
            setInputDate(formatCurrentDate);
        };

        getCurrentDate();
    }, []);

    const fetchRecentUpdate = async () => {
        if (!inputDate) return; // Prevent fetch if date is empty

        try {
            const res = await fetch(`${backend_url}/api/update-raw/get-update/${inputDate}`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (!res.ok) {
                throw new Error("Failed to fetch recent updates");
            }

            const result = await res.json();
            console.log(result);
            setFetchedData(result.data || []);

        } catch (error) {
            console.error("Error fetching updates:", error.message);
        }
    };

    useEffect(() => {
        fetchRecentUpdate();
    }, [inputDate]); // Fetch updates when inputDate changes

    return (
        <>
            <div className="recent-update">
                <div className="filter-method">
                    <h2>Recent Updates</h2>
                    <div className="date-selecton">
                        <p>Select Date</p>
                        <input 
                            onChange={(e) => setInputDate(e.target.value)} 
                            value={inputDate} 
                            type="date" 
                            name="date" 
                            id="date" 
                        />
                        <button onClick={fetchRecentUpdate}>Search data</button>
                    </div>
                </div>
                {fetchedData.length === 0 ? (
                    <p>No recent updates available.</p>
                ) : (
                    <table className="recent-update-table">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Change Type</th>
                                <th>Quantity</th>
                                <th>Current Quantity</th>
                                <th>Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fetchedData.map((update) => (
                                <tr key={update._id}>
                                    <td>{update.ProductData.name}</td>
                                    <td>{update.changeType.toLowerCase()}</td>
                                    <td>{update.quantity}</td>
                                    <td>{update.currentQuantity}</td>
                                    <td>{readDate(update.updatedAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="home">
                <div className="home-container">
                    <Link className="no-style" to="raw-material">
                        <div className="raw-material">Raw Material</div>
                    </Link>
                    <Link className="no-style" to="stock-material">
                        <div className="stock-material">Stock Material</div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Home;
