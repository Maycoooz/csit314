// src/pages/PlatformManagement/ServiceCategory/PMSuspendServiceCategoryPage.jsx

import React from "react";
import Navbar from "../../../components/NavBar";
import SuspendServiceCategory from "../../../components/PlatformManagement/ServiceCategory/SuspendServiceCategory";

const PMSuspendServiceCategoryPage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>Suspend Service Category</h2>
                <SuspendServiceCategory />
            </div>
        </div>
    );
};

export default PMSuspendServiceCategoryPage;
