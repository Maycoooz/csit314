// src/pages/CleanerUpdateServicePage.jsx
import React from "react";
import Navbar from "../../../components/NavBar";
import UpdateService from "../../../components/Cleaner/ServiceManagement/UpdateService";

const CleanerUpdateServicePage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <UpdateService />
            </div>
        </div>
    );
};

export default CleanerUpdateServicePage;
