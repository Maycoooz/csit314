// src/pages/PlatformManagement/Report/PMWeeklyReportPage.jsx

import React from "react";
import Navbar from "../../../components/NavBar";
import ViewWeeklyReport from "../../../components/PlatformManagement/Report/ViewWeeklyReport";

const PMViewWeeklyReportPage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>View Weekly Report</h2>
                <ViewWeeklyReport />
            </div>
        </div>
    );
};

export default PMViewWeeklyReportPage;
