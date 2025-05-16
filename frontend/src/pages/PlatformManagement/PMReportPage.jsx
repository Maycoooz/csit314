import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";

const ReportDashboardPage = () => {
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
                <h1>Platform Reports</h1>
                <p>Select report type:</p>
                <div>
                    <button onClick={() => navigate(-1)} style={{ ...buttonStyle, backgroundColor: "rgb(65, 129, 172)" }}> 
                        ← Back
                    </button>
                    <button onClick={() => navigate("/PlatformManagement/Report/ViewDailyReport")} style={buttonStyle}>
                        🗓️ Daily Report
                    </button>
                    <button onClick={() => navigate("/PlatformManagement/Report/ViewWeeklyReport")} style={buttonStyle}>
                        🗓️ Weekly Report
                    </button>
                    <button onClick={() => navigate("/PlatformManagement/Report/ViewMonthlyReport")} style={buttonStyle}>
                        🪣 Monthly Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportDashboardPage;
