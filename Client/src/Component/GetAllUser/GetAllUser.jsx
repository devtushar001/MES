import React, { useContext, useEffect, useState } from "react";
import { MesContext } from "../../Context/MesContextProvider";
import { toast } from "react-toastify";
import './GetAllUser.css';




const GetAllUser = () => {
    const [allUser, setAllUser] = useState([]);
    const { backend_url, token } = useContext(MesContext)

    const getAllUserData = async () => {
        if (!token) {
            toast.error("Authorization token is missing!");
            return;
        }

        try {
            const res = await fetch(`${backend_url}/api/user/all-users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setAllUser(data.data)
            if (!res.ok) {
                toast.error(data.message || "Failed to fetch user data");
                return;
            }

            toast.success("User data fetched successfully!");
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to fetch user data. Please try again.");
        }
    };

    useEffect(() => {
        getAllUserData();
    }, [])

    return (
        <>
            <div className="all-user">
                {allUser.map((item, i) => {
                    return (
                        <div key={i}>
                            <span>{item.email}</span>
                            {item.isVerified ? "Verified" : "Not Verified"}
                            <button>Delete User</button>
                            {item.access ? <button>Remove Access</button> : <button>Give Access</button>}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default GetAllUser;