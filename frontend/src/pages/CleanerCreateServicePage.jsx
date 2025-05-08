// src/pages/CleanerCreateServicePage.jsx
import React from "react";
import Navbar from "../components/NavBar";
import CreateService from "../components/CreateService";

const CleanerCreateServicePage = () => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px", textAlign: "center" }}>
                <h2>Create New Service</h2>
                <CreateService />
            </div>
        </div>
    );
};

export default CleanerCreateServicePage;
