// src/pages/CleanerServiceManagementPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";

const CleanerServiceManagementPage = () => {
    const navigate = useNavigate();

    const buttonStyle = {
        margin: "10px",
        padding: "12px 25px",
        fontSize: "16px",
        borderRadius: "5px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        cursor: "pointer"
    };

    return (
        <div style={{ paddingTop: "70px", textAlign: "center" }}>
            <Navbar />
            <h2>Service Management</h2>
            <div style={{ marginTop: "30px" }}>
                <button onClick={() => navigate(-1)} style={{ ...buttonStyle, backgroundColor: "rgb(65, 129, 172)" }}> 
                    ← Back
                </button>
                <button style={buttonStyle} onClick={() => navigate("/Cleaner/ServiceManagement/CreateService")}>
                    Create Service
                </button>
                <button style={buttonStyle} onClick={() => navigate("/Cleaner/ServiceManagement/ViewAllServices")}>
                    View All Services
                </button>
                <button style={buttonStyle} onClick={() => navigate("/Cleaner/ServiceManagement/SearchService")}>
                    Search Services
                </button>
                <button style={buttonStyle} onClick={() => navigate("/Cleaner/ServiceManagement/UpdateService")}>
                    Update Service
                </button>
                <button style={buttonStyle} onClick={() => navigate("/Cleaner/ServiceManagement/SuspendService")}>
                    Suspend Service
                </button>
            </div>
        </div>
    );
};

export default CleanerServiceManagementPage;
