// src/pages/PlatformManagement/ServiceCategory/CreateServiceCategoryPage.jsx

import React from "react";
import Navbar from "../../../components/NavBar";
import CreateServiceCategory from "../../../components/PlatformManagement/ServiceCategory/CreateServiceCategory";

const PMCreateServiceCategoryPage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <CreateServiceCategory />
            </div>
        </div>
    );
};

export default PMCreateServiceCategoryPage;
