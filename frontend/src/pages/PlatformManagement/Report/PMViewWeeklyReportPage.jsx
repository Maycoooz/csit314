import React, { useState } from "react";
import Navbar from "../../../components/NavBar";
import ViewWeeklyReport from "../../../components/PlatformManagement/Report/ViewWeeklyReport";

const PMViewWeeklyReportPage = () => {
    const [navbarVisible, setNavbarVisible] = useState(true);

    return (
        <div>
            {navbarVisible && <Navbar />}
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <ViewWeeklyReport setNavbarVisible={setNavbarVisible} />
            </div>
        </div>
    );
};

export default PMViewWeeklyReportPage;
