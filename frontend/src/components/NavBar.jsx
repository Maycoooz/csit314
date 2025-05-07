import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">🧹 C2C Cleaners</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;
