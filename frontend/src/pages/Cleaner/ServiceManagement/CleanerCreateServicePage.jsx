// src/pages/CleanerCreateServicePage.jsx
import React from "react";
import Navbar from "../../../components/NavBar";
import CreateService from "../../../components/Cleaner/ServiceManagement/CreateService";

const CleanerCreateServicePage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <CreateService />
            </div>
        </div>
    );
};

export default CleanerCreateServicePage;
