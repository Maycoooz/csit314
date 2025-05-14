import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";//

const Navbar = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.clear()
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">🧹 SCRUMSQUAD Cleaners</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>

                {username ? (
                    <>
                        <div
                            className="user-info"
                            onClick={() => {
                                const userRole = localStorage.getItem("role");
                                if (userRole.toLowerCase() === "admin") navigate("/Admin/Admin-Dashboard");
                                else if (userRole.toLowerCase() === "cleaner") navigate("/Cleaner/Cleaner-Dashboard");
                                else if (userRole.toLowerCase() === "home owner") navigate("/Home-Owner-Dashboard");
                                else if (userRole.toLowerCase() === "platform management") navigate("/PlatformManagement/Platform-Management-Dashboard");
                            }}
                            style={{ cursor: "pointer" }}
                        >
                        <i className="fas fa-user"></i>
                        <span>{username}</span>
                        </div>
                        <button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
