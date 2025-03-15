import React from "react";
import './Home.css';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
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