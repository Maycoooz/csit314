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
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>📌 Shortlist</h2>
                <button onClick={() => navigate(-1)} style={{ ...buttonStyle, backgroundColor: "rgb(65, 129, 172)" }}> ← Back</button>
                <button onClick={() => navigate("/HomeOwner/Shortlist/ViewShortlist")} style={buttonStyle}>⭐ View Shortlist</button>
                <button onClick={() => navigate("/HomeOwner/Shortlist/FilterShortlist")} style={buttonStyle}>🔽 Filter Shortlist</button>
            </div>
        </div>
    );
};

export default HomeOwnerDashboardPage;
