import React, { createContext, useState, useMemo } from "react";

export const MesContext = createContext(null);

const MesContextProvider = ({ children }) => {
    const backend_url = "https://dochaki-mes-backend.onrender.com";
    const [rawMaterials, setRawMaterials] = useState([]);
    const [loginSignup, setLoginSignup] = useState(false);
    const storedToken = useMemo(() => localStorage.getItem("token"), []);
    const [userData, setUserData] = useState({
    
    });

    const token = JSON.parse(localStorage.getItem("token"));

    const readDate = (date) =>
        new Date(date).toLocaleString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });

    const contextValue = useMemo(() => ({
        backend_url,
        rawMaterials,
        setRawMaterials,
        readDate,
        loginSignup,
        setLoginSignup,
        storedToken,
        userData,
        setUserData
    }), [rawMaterials, loginSignup]);

    return (
        <MesContext.Provider value={contextValue}>
            {children}
        </MesContext.Provider>
    );
};

export default MesContextProvider;
