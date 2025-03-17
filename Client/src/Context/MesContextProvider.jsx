import React, { createContext } from "react";

export const MesContext = createContext(null);

const MesContextProvider = (props) => {
    const backend_url = "http://localhost:10019";

    const contextValue = {
        backend_url
    };

    return (
        <MesContext.Provider value={contextValue}>
            {props.children}
        </MesContext.Provider>
    );
};

export default MesContextProvider;
