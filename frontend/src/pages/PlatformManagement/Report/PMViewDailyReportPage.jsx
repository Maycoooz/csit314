// src/pages/PlatformManagement/Report/PMDailyReportPage.jsx

import React from "react";
import Navbar from "../../../components/NavBar";
import ViewDailyReport from "../../../components/PlatformManagement/Report/ViewDailyReport";

const PMViewDailyReportPage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>View Daily Report</h2>
                <ViewDailyReport />
            </div>
        </div>
    );
};

export default PMViewDailyReportPage;
