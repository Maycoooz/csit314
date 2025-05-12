// src/pages/CleanerViewServicesPage.jsx
import React from "react";
import Navbar from "../../../components/NavBar";
import ViewServices from "../../../components/Cleaner/ServiceManagement/ViewAllServices";

const CleanerViewAllServicesPage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>Your Services</h2>
                <ViewServices />
            </div>
        </div>
    );
};

export default CleanerViewAllServicesPage;
