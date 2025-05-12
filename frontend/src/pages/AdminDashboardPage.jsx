import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

const AdminDashboardPage = () => {
    const navigate = useNavigate();

    const buttonStyle = {
        margin: "10px",
        padding: "15px 30px",
        fontSize: "18px",
        cursor: "pointer",
        borderRadius: "8px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none"
    };

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h1>Welcome to Admin Dashboard</h1>
                <p>Select a section to manage:</p>
                <div>
                    <button onClick={() => navigate("/Admin/AccountManagement")} style={buttonStyle}>
                        Account Management
                    </button>
                    <button onClick={() => navigate("/Admin/UserProfileManagement")} style={buttonStyle}>
                        User Profile Management
                    </button>
                    <button onClick={() => navigate("/Admin/RoleManagement")} style={buttonStyle}>
                        Role Management
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
