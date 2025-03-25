import React, { useState } from "react";
import "./Navbar.css";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { assets } from "../../Assets/Assets";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <img src={assets.dochaki_logo} alt="" />
        </div>
        <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>Home</li>
            <li>Dashboard</li>
            <li>Stock item</li>
            <li>Raw item</li>
            <li>Stock update</li>
            <li>Raw update</li>
          </ul>
        </div>
        <button className="menu_icon" onClick={() => setMenuOpen(!menuOpen)} >Open</button>
      </nav>
    </>
  );
};

export default Navbar;
