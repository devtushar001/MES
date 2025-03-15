import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Dochaki MES</div>
      <ul className="nav-links">
        <Link to="/"> <li>Home</li></Link>
        <Link to="/raw-material"><li>Raw Material</li></Link>
        <Link to="/stock-material"><li>Stock Material</li></Link>
      </ul>
    </nav>
  );
};

export default Navbar;