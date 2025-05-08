// src/pages/CleanerSuspendServicePage.jsx
import React from "react";
import Navbar from "../components/NavBar";
import SuspendService from "../components/SuspendService";

const CleanerSuspendServicePage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>Suspend a Service</h2>
                <SuspendService />
            </div>
        </div>
    );
};

export default CleanerSuspendServicePage;
