// src/pages/PlatformManagement/ServiceCategory/PMSearchServiceCategoryPage.jsx

import React from "react";
import Navbar from "../../../components/NavBar";
import SearchServiceCategory from "../../../components/PlatformManagement/ServiceCategory/SearchServiceCategory";

const PMSearchServiceCategoryPage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>Search Service Category</h2>
                <SearchServiceCategory />
            </div>
        </div>
    );
};

export default PMSearchServiceCategoryPage;
