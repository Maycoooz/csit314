import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";

const CleanerDashboardPage = () => {
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
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h1>Welcome to Cleaner Dashboard</h1>
                <div style={{ marginTop: "30px" }}>
                    <button style={buttonStyle} onClick={() => navigate("/Cleaner/ServiceManagement")}>
                        Manage Services
                    </button>
                    <button style={buttonStyle} onClick={() => navigate("/Cleaner/Statistics")}>
                        Statistics 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CleanerDashboardPage;
