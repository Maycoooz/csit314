import React, { useState } from "react";
import Navbar from "../../../components/NavBar";
import ViewMonthlyReport from "../../../components/PlatformManagement/Report/ViewMonthlyReport";

const PMViewMonthlyReportPage = () => {
    const [navbarVisible, setNavbarVisible] = useState(true);

    return (
        <div>
            {navbarVisible && <Navbar />}
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <ViewMonthlyReport setNavbarVisible={setNavbarVisible} />
            </div>
        </div>
    );
};

export default PMViewMonthlyReportPage;
