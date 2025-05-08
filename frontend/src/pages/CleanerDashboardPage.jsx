import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

const CleanerDashboardPage = () => {
    const navigate = useNavigate();

    const buttonStyle = {
        margin: "10px",
        padding: "12px 25px",
        fontSize: "16px",
        borderRadius: "5px",
        backgroundColor: "#4CAF50",
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
                    <button style={buttonStyle} onClick={() => navigate("/cleaner-create-service")}>
                        Create Service
                    </button>
                    <button style={buttonStyle} onClick={() => navigate("/cleaner-view-services")}>
                        View All Services
                    </button>
                    <button style={buttonStyle} onClick={() => navigate("/cleaner/search-service")}>
                        Search Services
                    </button>
                    <button style={buttonStyle} onClick={() => navigate("/cleaner/update-service")}>
                        Update Service
                    </button>
                    <button style={buttonStyle} onClick={() => navigate("/cleaner/suspend-service")}>
                        Suspend Service
                    </button>
                    <button style={buttonStyle} onClick={() => navigate("/cleaner/view-stats")}>
                        View Stats (Views)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CleanerDashboardPage;
