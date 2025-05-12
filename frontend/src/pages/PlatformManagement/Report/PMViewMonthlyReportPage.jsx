// src/pages/PlatformManagement/Report/PMMonthlyReportPage.jsx

import React from "react";
import Navbar from "../../../components/NavBar";
import ViewMonthlyReport from "../../../components/PlatformManagement/Report/ViewMonthlyReport";

const PMViewMonthlyReportPage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>View Monthly Report</h2>
                <ViewMonthlyReport />
            </div>
        </div>
    );
};

export default PMViewMonthlyReportPage;
