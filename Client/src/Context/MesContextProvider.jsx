import React, { createContext, useState } from "react";

export const MesContext = createContext(null);

const MesContextProvider = (props) => {
    const backend_url = "http://localhost:10019";
    const [rawMaterials, setRawMaterials] = useState([]);
    const [loginSignup, setLoginSignup] = useState(true);

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

    const contextValue = {
        backend_url,
        rawMaterials,
        setRawMaterials,
        readDate,
        loginSignup,
        setLoginSignup
    };

    return (
        <MesContext.Provider value={contextValue}>
            {props.children}
        </MesContext.Provider>
    );
};

export default MesContextProvider;
