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
          <img style={{maxHeight: "67px"}} src={assets.dochaki_logo} alt="" />
        </div>
        <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Feedback</li>
          </ul>
        </div>
        <div className="nav-icons">
          <FaSearch className="search-icon" />
          {menuOpen ? (
            <FaTimes className="menu-icon" onClick={() => setMenuOpen(false)} />
          ) : (
            <FaBars className="menu-icon" onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
