// src/pages/PlatformManagement/ServiceCategory/PMUpdateServiceCategoryPage.jsx

import React from "react";
import Navbar from "../../../components/NavBar";
import UpdateServiceCategory from "../../../components/PlatformManagement/ServiceCategory/UpdateServiceCategory";

const PMUpdateServiceCategoryPage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <UpdateServiceCategory />
            </div>
        </div>
    );
};

export default PMUpdateServiceCategoryPage;
