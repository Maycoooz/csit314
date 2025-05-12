// src/pages/PlatformManagement/ServiceCategory/PMViewServiceCategoryPage.jsx

import React from "react";
import Navbar from "../../../components/NavBar";
import ViewAllServiceCategories from "../../../components/PlatformManagement/ServiceCategory/ViewAllServiceCategories";

const PMViewAllServiceCategoriesPage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>View All Service Categories</h2>
                <ViewAllServiceCategories />
            </div>
        </div>
    );
};

export default PMViewAllServiceCategoriesPage;
