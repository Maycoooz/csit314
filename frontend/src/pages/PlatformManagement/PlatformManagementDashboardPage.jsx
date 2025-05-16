import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";

const PlatformManagementDashboardPage = () => {
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
                <h1>Platform Management</h1>
                <p>Select a section to manage:</p>
                <div>
                    <button onClick={() => navigate("/PlatformManagement/ServiceCategory")} style={buttonStyle}>
                        🗂️ Service Category Management
                    </button>
                    <button onClick={() => navigate("/PlatformManagement/Report")} style={buttonStyle}>
                        📊 Reports
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlatformManagementDashboardPage;
