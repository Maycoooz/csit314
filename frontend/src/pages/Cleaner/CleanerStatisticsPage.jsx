// src/pages/CleanerServiceManagementPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";

const CleanerStatisticsPage = () => {
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
            <h2>Statistics</h2>
            <div style={{ marginTop: "30px" }}>
                <button onClick={() => navigate(-1)} style={{ ...buttonStyle, backgroundColor: "rgb(65, 129, 172)" }}> 
                    ← Back
                </button>
                <button style={buttonStyle} onClick={() => navigate("/Cleaner/Statistics/NumberOfViews")}>
                    Number of Views
                </button>
                <button style={buttonStyle} onClick={() => navigate("/Cleaner/Statistics/ViewShortlist")}>
                    View Shortlist
                </button>
                <button style={buttonStyle} onClick={() => navigate("/Cleaner/Statistics/SearchPastTransactions")}>
                    Search Services
                </button>
                <button style={buttonStyle} onClick={() => navigate("/Cleaner/Statistics/")}>
                    Update Service
                </button>
            </div>
        </div>
    );
};

export default CleanerStatisticsPage;
