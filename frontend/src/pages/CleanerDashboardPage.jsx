import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

const CleanerDashboardPage = () => {
    const navigate = useNavigate();

    const handleViewJobs = () => {
        navigate("/assigned-jobs"); // You can change this route based on your app
    };

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h1>Welcome to Cleaner Dashboard</h1>
                <button
                    onClick={handleViewJobs}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                        borderRadius: "5px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none"
                    }}
                >
                    View Assigned Jobs
                </button>
            </div>
        </div>
    );
};

export default CleanerDashboardPage;
