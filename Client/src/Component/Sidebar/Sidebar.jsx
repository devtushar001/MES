import React, { useState } from "react";
import './Sidebar.css';
const Sidebar = () => {
    const [sidebar, setSidebar] = useState("dashboard")
    return (
        <>
            <div className="sidebar">
                <ul className="sidebar-menu">
                    <li id={sidebar === "dashboard" ? "isActive" : ""} onClick={() => setSidebar("dashboard")} className="sidebar-menu-list">Dashboard</li>
                    <li id={sidebar === "stock-item" ? "isActive" : ""} onClick={() => setSidebar("stock-item")} className="sidebar-menu-list">Stock Item</li>
                    <li id={sidebar === "raw-item" ? "isActive" : ""} onClick={() => setSidebar("raw-item")} className="sidebar-menu-list">Raw Item</li>
                    <li id={sidebar === "stock-update-list" ? "isActive" : ""} onClick={() => setSidebar("stock-update-list")} className="sidebar-menu-list">Stock Update List</li>
                    <li id={sidebar === "raw-update-list" ? "isActive" : ""} onClick={() => setSidebar("raw-update-list")} className="sidebar-menu-list">Raw Update List</li>
                </ul>
            </div>
        </>
    )
}
export default Sidebar;