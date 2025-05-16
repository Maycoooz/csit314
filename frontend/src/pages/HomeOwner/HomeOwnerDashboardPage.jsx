// src/pages/HomeOwnerDashboardPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";

const HomeOwnerDashboardPage = () => {
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
        <div className="dashboard" style={{ paddingTop: "70px", textAlign: "center" }}>
            <Navbar/>
            <h1>🏠 Home Owner Dashboard</h1>

            <div className="dashboard-buttons">
                <button style={buttonStyle} onClick={() => navigate("/HomeOwner/ViewCleaners")}>
                    🔍 View Cleaners
                </button>
                <button style={buttonStyle} onClick={() => navigate("/HomeOwner/Shortlist")}>
                    📌 Shortlist
                </button>
                <button style={buttonStyle} onClick={() => navigate("/HomeOwner/PastTransactions")}>
                    🧾 Past Transactions
                </button>
            </div>
        </div>
    );
};

export default HomeOwnerDashboardPage;
