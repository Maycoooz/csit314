// src/pages/PlatformManagement/ServiceCategory/PMSearchServiceCategoryPage.jsx

import React from "react";
import Navbar from "../../../components/NavBar";
import SearchServiceCategory from "../../../components/PlatformManagement/ServiceCategory/SearchServiceCategory";

const PMSearchServiceCategoryPage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <SearchServiceCategory />
            </div>
        </div>
    );
};

export default PMSearchServiceCategoryPage;
