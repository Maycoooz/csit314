import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        setShowLogoutModal(true);

        // Auto-redirect after 3 seconds
        setTimeout(() => {
            navigate("/");
        }, 3000);
    };

    const handleConfirmLogout = () => {
        setShowLogoutModal(false);
        navigate("/");
    };

    if (document.body.classList.contains("modal-open")) return null;

    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/">🧹 SCRUMSQUAD Cleaners</Link>
                </div>
                <div className="navbar-links">
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
                            >
                                <i className="fas fa-user"></i>
                                <span>🐣{username}</span>
                            </div>
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            className="login-button"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    )}
                </div>
            </nav>

            {/* Modal */}
            {showLogoutModal && (
                <div className="logout-modal">
                    <div className="logout-modal-content">
                        <h3>✅ Successfully Logged Out</h3>
                        <p>You will be redirected shortly...</p>
                        <button onClick={handleConfirmLogout}>OK</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
