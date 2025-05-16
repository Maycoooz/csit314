import React, { useState } from "react";
import Navbar from "../../../components/NavBar";
import ViewDailyReport from "../../../components/PlatformManagement/Report/ViewDailyReport";

const PMViewDailyReportPage = () => {
    const [navbarVisible, setNavbarVisible] = useState(true);

    return (
        <div>
            {navbarVisible && <Navbar />}
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <ViewDailyReport setNavbarVisible={setNavbarVisible} />
            </div>
        </div>
    );
};

export default PMViewDailyReportPage;
