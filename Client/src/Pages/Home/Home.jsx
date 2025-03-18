import React, { useContext } from "react";
import './Home.css';
import { Link } from "react-router-dom";
import { MesContext } from "../../Context/MesContextProvider";

const Home = () => {
    const { readDate } = useContext(MesContext);
    // {
    //     "_id": {
    //       "$oid": "67d9814e4d14e1197889a068"
    //     },
    //     "ProductId": {
    //       "$oid": "67d97ee40d607ff688eb517b"
    //     },
    //     "changeType": "out",
    //     "currentQuantity": 4,
    //     "quantity": 36,
    //     "createdAt": {
    //       "$date": "2025-03-18T14:21:02.610Z"
    //     },
    //     "updatedAt": {
    //       "$date": "2025-03-18T14:21:02.610Z"
    //     },
    //     "__v": 0
    //   }
    const readAbleDate = readDate("2025-03-18T14:21:02.610Z");


    return (
        <>
            <div className="recent-update">
                <div className="date">{readAbleDate}</div>
                <div className="recent-update-table">
                  
                </div>
            </div>
            <div className="home">
                <div className="home-container">
                    <Link className="no-style" to="raw-material">
                        <div className="raw-material">
                            Raw Material
                        </div>
                    </Link>
                    <Link className="no-style" to="stock-material">
                        <div className="stock-material">
                            Stock Material
                        </div>
                    </Link>
                </div>
            </div>

        </>
    )
}

export default Home;