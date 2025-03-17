import React, { createContext, useState } from "react";

export const MesContext = createContext(null);

const MesContextProvider = (props) => {
    const backend_url = "http://localhost:10019";
    const [rawMaterials, setRawMaterials] = useState([]);

    const contextValue = {
        backend_url,
        rawMaterials,
        setRawMaterials
    };

    return (
        <MesContext.Provider value={contextValue}>
            {props.children}
        </MesContext.Provider>
    );
};

export default MesContextProvider;
