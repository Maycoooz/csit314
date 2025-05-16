// src/pages/CleanerSuspendServicePage.jsx
import React from "react";
import Navbar from "../../../components/NavBar";
import SuspendService from "../../../components/Cleaner/ServiceManagement/SuspendService";

const CleanerSuspendServicePage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <SuspendService />
            </div>
        </div>
    );
};

export default CleanerSuspendServicePage;
